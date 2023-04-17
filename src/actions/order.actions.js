import {
    LOAD_ORDERS_ERROR,
    LOAD_ORDERS_PENDING,
    LOAD_ORDERS_SUCCESS,

    GET_ORDER_BY_ID_ERROR,
    GET_ORDER_BY_ID_PENDING,
    GET_ORDER_BY_ID_SUCCESS,

    CREATE_ORDER_PENDING,   
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_ERROR,

    UPDATE_ORDER_BY_ID_PENDING,
    UPDATE_ORDER_BY_ID_SUCCESS,
    UPDATE_ORDER_BY_ID_ERROR,

    DELETE_ORDER_PENDING,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_ERROR,

    DECREASE_QUANTITY,
    INCREASE_QUANTITY,
    ADD_NEW_PRODUCT,
    ADD_FIRST_PRODUCT,

    GET_ORDER_NOTE,
    UPDATE_ORDER_SEARCH_QUERY,
    SET_SORT_BY,
    SET_SORT_ORDER_OF_ORDER,
} from "../constants/order.constants";

const gORDER_API_URL = '//localhost:8000/orders';
const gCUSTOMER_API_URL = '//localhost:8000/customers';

export const getAllOrder = ({ limit, page, searchQuery, sortBy, sortOrder }) => {
    console.log({ limit, page, searchQuery })
    // build the request string
    const request = `limit=${limit}&page=${page}&searchQuery=${searchQuery}&sortBy=${sortBy}&sortOrder=${sortOrder}`
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
                type: LOAD_ORDERS_PENDING
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
                type: LOAD_ORDERS_SUCCESS,
                totalOrder: resObj.totalCount,
                orders: resObj.data
            })

        } catch (err) {
            //if error
            return dispatch({
                type: LOAD_ORDERS_ERROR,
                error: err
            })
        }
    }
}

export const getAllOrderOfCustomer = ({ limit, page, searchQuery, sortBy, sortOrder, customerId }) => {
    console.log({ limit, page, searchQuery, sortBy, sortOrder })
    // build the request string
    const request = `limit=${limit}&page=${page}&searchQuery=${searchQuery}&sortBy=${sortBy}&sortOrder=${sortOrder}`
    // options for the fetch request
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return async (dispatch) => {
        try {
            // dispatch pending state to update the UI
            await dispatch({
                type: LOAD_ORDERS_PENDING
            });

            //fetch Order
            const res = await fetch(`${gCUSTOMER_API_URL}/${customerId}/orders?${request}`, requestOptions);
            // throw an error if the response is not successful
            if (!res.ok) {
                throw new Error(`Could not fetch orders, status: ${res.status}`);
            }
            // parse the response as JSON
            const resObj = await res.json();
            //Dispatch state
            return dispatch({
                type: LOAD_ORDERS_SUCCESS,
                totalOrder: resObj.totalCount,
                orders: resObj.data
            })

        } catch (err) {
            //if error
            return dispatch({
                type: LOAD_ORDERS_ERROR,
                error: err
            })
        }
    }
}


//Get order Note
export const getOrderNote = (note) => {
    return ({
        type: GET_ORDER_NOTE,
        note: note
    })
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
            console.log(`${gORDER_API_URL}/${orderId}`)

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

// Update customer
export const updateOrderById = (orderId, orderData) => {
    return async (dispatch) => {
        //call PUT API 

        await dispatch({
            type: UPDATE_ORDER_BY_ID_PENDING,
        });

        try {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            };

            const res = await fetch(`${gORDER_API_URL}/${orderId}`, requestOptions);
            const resObj = await res.json();

            if (!res.ok) {
                throw new Error(`${resObj.message}, status: ${res.status}`);
            }

            return dispatch({
                type: UPDATE_ORDER_BY_ID_SUCCESS,
                data: resObj.data,
                status: resObj.status,
            });
        } catch (err) {
            return dispatch({
                type: UPDATE_ORDER_BY_ID_ERROR,
                error: err,
            });
        }
    };
}

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

//update searchQuery to load Order
//input: searchQuery ="string"
export const updateOrderSearchQuery = (searchQuery) => {
    return {
        type: UPDATE_ORDER_SEARCH_QUERY,
        payload: searchQuery
    }
}

//Set sort By
export const setSortBy = (sortBy) => {
    return {
        type: SET_SORT_BY,
        payload: sortBy
    }
}
//Set sort By
export const setSortOrder = (sortOrder) => {
    return {
        type: SET_SORT_ORDER_OF_ORDER,
        payload: sortOrder
    }
}


//Create new order
export const createNewOrder = (customerId, note) => {
    // if (isValid) {
    return async (dispatch) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({ note: note }),
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