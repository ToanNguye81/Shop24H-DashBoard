import {
    FETCH_ORDERS_ERROR,
    FETCH_ORDERS_PENDING,
    FETCH_ORDERS_SUCCESS,
    
    GET_ORDER_BY_ID_ERROR,
    GET_ORDER_BY_ID_PENDING,
    GET_ORDER_BY_ID_SUCCESS,

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

const gORDER_API_URL = '//localhost:8000/orders';
const gCUSTOMER_API_URL = '//localhost:8000/customers';

export const getAllOrder = (paramLimit, paramPage, paramCondition) => {
    // build the request string
    let condition = encodeURIComponent(JSON.stringify(paramCondition ? paramCondition : {}));
    const request = `limit=${paramLimit}&page=${paramPage}&condition=${condition}`
    // options for the fetch request
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    console.log("Get All Order")

    return async (dispatch) => {
        try {
            // dispatch pending state to update the UI
            await dispatch({
                type: FETCH_ORDERS_PENDING
            });

            //fetch Order
            const res = await fetch(`${gORDER_API_URL}?${request}`, requestOptions);

            // throw an error if the response is not successful
            if (!res.ok) {
                throw new Error(`Could not fetch orders, status: ${res.status}`);
            }
            // parse the response as JSON
            const resObj = await res.json();
            console.log(resObj)
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

export const getAllOrderOfCustomer = (paramLimit, paramPage,  paramCondition, customerId) => {
    // build the request string
    let condition = encodeURIComponent(JSON.stringify(paramCondition ? paramCondition : {}));
    const request = `limit=${paramLimit}&page=${paramPage}&condition=${condition}`
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
            const res = await fetch(`${gCUSTOMER_API_URL}/${customerId}/orders?${request}`, requestOptions);
            // throw an error if the response is not successful
            if (!res.ok) {
                throw new Error(`Could not fetch orders, status: ${res.status}`);
            }
            // parse the response as JSON
            const resObj = await res.json();
            console.log(resObj.data)
            console.log(resObj)
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
                
                if (!res.ok) {
                    return dispatch({
                        type: CREATE_ORDER_ERROR,
                    })
                }
                
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

//Get Order By Id
export const getOrderById = (orderId) => {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return async (dispatch) => {
        try {
            // dispatch pending state to update the UI
            await dispatch({
                type: GET_ORDER_BY_ID_PENDING
            });

            //fetch Order
            const res = await fetch(`${gORDER_API_URL}/${orderId}`, requestOptions);

            // throw an error if the response is not successful
            if (!res.ok) {
                throw new Error(`Could get order By Id, status: ${res.status}`);
            }
            // parse the response as JSON
            const resObj = await res.json();
            console.log(resObj)
            //Dispatch state
            return dispatch({
                type: GET_ORDER_BY_ID_SUCCESS,
                orderById: resObj.data
            })

        } catch (err) {
            //if error
            return dispatch({
                type: GET_ORDER_BY_ID_ERROR,
                error: err
            })
        }
    }
}



// Update order
export const updateOrder = async (paramOrder) => {
    const isValid=validateOrder(paramOrder)
    //call PUT API 
    if (isValid) {
        return async (dispatch) => {
            const requestOptions = {
                method: 'PUT',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(paramOrder),
            };

            await dispatch({
                type: UPDATE_ORDER_PENDING,
            });

            try {
                const res = await fetch(gORDER_API_URL, requestOptions);
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
            const res = await fetch(gORDER_API_URL + `/${paramOrderId}`, requestOptions);
            const resObj = await res.json();
            
            if (!res.ok) {
                return dispatch({
                    type: DELETE_ORDER_ERROR,
                })
            }
            
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
    //Hàm xử lý thêm sản phẩm lần đầu
    if (cart.length === 0) {
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

//Valid Order parram
export const validateOrder=(paramOrder)=>{
    const {}=paramOrder
    if (paramOrderDetail.firstName.trim() === "") {
        alert("You have entered an invalid First Name")
        return false
    }
    if (paramOrderDetail.lastName.trim() === "") {
        alert("You have entered an invalid Fast Name")
        return false
    }
    if (!validatePhone(paramOrderDetail.phone)) {
        alert("You have entered an invalid Phone!")
        return false
    }
    if (!validateEmail(paramOrderDetail.email)) {
        alert("You have entered an invalid Email!")
        return false
    }
    if (paramOrderDetail.country.trim() === "") {
        alert("You have entered an invalid Country")
        return false
    }
    if (paramOrderDetail.city.trim() === "") {
        alert("You have entered an invalid City")
        return false
    }
    if (paramOrderDetail.address.trim() === "") {
        alert("You have entered an invalid Address")
        return false
    }
    return true
}