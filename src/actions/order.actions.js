import {
    FETCH_ORDERS_ERROR,
    FETCH_ORDERS_PENDING,
    FETCH_ORDERS_SUCCESS,

    CREATE_ORDER_PENDING,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_ERROR,

    UPDATE_ORDER_PENDING,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_ERROR,

    DELETE_ORDER_PENDING,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_ERROR,

    DECREASE_QUANTITY,
    INCREASE_QUANTITY,
    ADD_NEW_PRODUCT,
    ADD_FIRST_PRODUCT
} from "../constants/order.constants";

const gORDERS_API_URL = '//localhost:8000/orders';
const gCUSTOMER_API_URL = '//localhost:8000/customers';

export const fetchOrder = (paramLimit, paramPage, paramCondition) => {
    // build the request string
    let condition = encodeURIComponent(JSON.stringify(paramCondition ? paramCondition : {}));
    const request = `limit=${paramLimit}&page=${paramPage}&condition=${condition}`
    console.log(paramLimit, paramPage, paramCondition)
    // options for the fetch request
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return async (dispatch) => {
        try {
            // dispatch pending state to update the UI
            await dispatch({
                type: FETCH_ORDERS_PENDING
            });

            //fetch Order
            const res = await fetch(`${gORDERS_API_URL}?${request}`, requestOptions);

            // throw an error if the response is not successful
            if (!res.ok) {
                throw new Error(`Could not fetch orders, status: ${res.status}`);
            }
            // parse the response as JSON
            const resObj = await res.json();

            //Dispatch state
            return dispatch({
                type: FETCH_ORDERS_SUCCESS,
                totalOrder: resObj.totalCount,
                orders: resObj.data
            })

        } catch (err) {
            //if error
            return dispatch({
                type: FETCH_ORDERS_ERROR,
                error: err
            })
        }
    }
}

//Create new order
export const createNewOrder = (customerId) => {
    // if (isValid) {
        return async (dispatch) => {
            const requestOptions = {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
            };

            await dispatch({
                type: CREATE_ORDER_PENDING
            });

            try {
                const res = await fetch(`${gCUSTOMER_API_URL}/${customerId}/orders`, requestOptions);
                const resObj = await res.json();
                console.log(res.ok)
                if (!res.ok) {
                    return dispatch({
                        type: CREATE_ORDER_ERROR,
                    })
                }
                console.log(resObj)
                return dispatch({
                    type: CREATE_ORDER_SUCCESS,
                    data: resObj.data
                })
            } catch (err) {
                return dispatch({
                    type: CREATE_ORDER_ERROR,
                    error: err
                })
            }
        }
}

// Update order
export const updateOrder = async (paramOrder) => {
    // get order info
    const orderInfo = await getOrderInfo(paramOrder);
    // validate data
    const isValid = await validateOrder(orderInfo);
    //call PUT API 
    if (isValid) {
        return async (dispatch) => {
            const requestOptions = {
                method: 'PUT',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(orderInfo),
            };

            await dispatch({
                type: UPDATE_ORDER_PENDING,
            });

            try {
                const res = await fetch(gORDERS_API_URL, requestOptions);
                const resObj = await res.json();

                if (!res.ok) {
                    return dispatch({
                        type: UPDATE_ORDER_ERROR,
                    });
                }

                return dispatch({
                    type: UPDATE_ORDER_SUCCESS,
                    data: resObj,
                });
            } catch (err) {
                return dispatch({
                    type: UPDATE_ORDER_ERROR,
                    error: err,
                });
            }
        };
    }
    return isValid;
};

//Delete order
export const deleteOrder = (paramOrderId) => {
    return async (dispatch) => {
        const requestOptions = {
            method: 'DELETE',
        };

        await dispatch({
            type: DELETE_ORDER_PENDING
        });

        try {
            const res = await fetch(gORDERS_API_URL + `/${paramOrderId}`, requestOptions);
            const resObj = await res.json();
            console.log(res.ok)
            if (!res.ok) {
                return dispatch({
                    type: DELETE_ORDER_ERROR,
                })
            }
            console.log(resObj)
            return dispatch({
                type: DELETE_ORDER_SUCCESS,
            })
        } catch (err) {
            console.log(err)
        }
    }
}


//Xử lý nút giảm quantity
export const decreaseQuantity = (paramIndex) => {
    return {
        type: DECREASE_QUANTITY,
        index: paramIndex
    }
}

//Xử lý nút tăng quantity
export const increaseQuantity = (paramIndex) => {
    return {
        type: INCREASE_QUANTITY,
        index: paramIndex
    }
}


//Xử lý sự kiện nút AddToCart
export const addToCart = (cart, product) => {
    console.log(product)
    //Hàm xử lý thêm sản phẩm lần đầu
    if (cart.length === 0) {
        console.log(product)
        return {
            type: ADD_FIRST_PRODUCT,
            product: product,
            quantity: 1
        }
    }

    // Hàm tăng số lượng nếu sản phẩm đã có trong cart
    else {
        for (let index = 0; index < cart.length; index++) {
            if (product._id === cart[index].product._id) {
                return {
                    type: INCREASE_QUANTITY,
                    index: index,
                }
            }
        }
    }

    //Thêm một sản phẩm mới nếu cart có trên 1 sp
    return {
        type: ADD_NEW_PRODUCT,
        product: product,
        quantity: 1,
    }
}
