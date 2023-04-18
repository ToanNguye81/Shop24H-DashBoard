import {
    LOAD_ORDER_DETAILS_ERROR,
    LOAD_ORDER_DETAILS_PENDING,
    LOAD_ORDER_DETAILS_SUCCESS,

    CREATE_ORDER_DETAIL_PENDING,
    CREATE_ORDER_DETAIL_SUCCESS,
    CREATE_ORDER_DETAIL_ERROR,

    UPDATE_ORDER_DETAIL_PENDING,
    UPDATE_ORDER_DETAIL_SUCCESS,
    UPDATE_ORDER_DETAIL_ERROR,

    DELETE_ORDER_DETAIL_PENDING,
    DELETE_ORDER_DETAIL_SUCCESS,
    DELETE_ORDER_DETAIL_ERROR,

    SET_SORT_BY,
    SET_SORT_ORDER,
    UPDATE_ORDER_DETAIL_SEARCH_QUERY

} from "../constants/orderDetail.constants";

const gORDER_DETAILS_API_URL = '//localhost:8000/orderDetails';
const gORDERS_API_URL = '//localhost:8000/orders';

//Get All Order Detail
export const getAllOrderDetail = ({ limit, page, searchQuery, sortBy, sortOrder }) => {
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
                type: LOAD_ORDER_DETAILS_PENDING
            });

            //fetch OrderDetail
            const res = await fetch(`${gORDER_DETAILS_API_URL}?${request}`, requestOptions);

            // throw an error if the response is not successful
            if (!res.ok) {
                throw new Error(`Could not fetch orderDetails, status: ${res.status}`);
            }
            // parse the response as JSON
            const resObj = await res.json();


            //Dispatch state
            return dispatch({
                type: LOAD_ORDER_DETAILS_SUCCESS,
                totalOrderDetail: resObj.totalCount,
                orderDetails: resObj.data
            })

        } catch (err) {
            //if error
            return dispatch({
                type: LOAD_ORDER_DETAILS_ERROR,
                error: err
            })
        }
    }
}

//Create new orderDetail
export const createNewOrderDetail = (orderId, orderDetail) => {
    const dataReq = {
        productId: orderDetail.product._id,
        quantity: orderDetail.quantity
    }

    return async (dispatch) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(dataReq)
        };

        await dispatch({
            type: CREATE_ORDER_DETAIL_PENDING
        });

        try {
            const res = await fetch(`${gORDERS_API_URL}/${orderId}/orderDetails`, requestOptions);
            const resObj = await res.json();

            if (!res.ok) {
                return dispatch({
                    type: CREATE_ORDER_DETAIL_ERROR,
                })
            }

            return dispatch({
                type: CREATE_ORDER_DETAIL_SUCCESS,
                data: resObj.data
            })
        } catch (err) {
            return dispatch({
                type: CREATE_ORDER_DETAIL_ERROR,
                error: err
            })
        }
    }
}

// Update orderDetail
export const updateOrderDetail = async (paramOrderDetail) => {
    
    return async (dispatch) => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(paramOrderDetail),
        };

        await dispatch({
            type: UPDATE_ORDER_DETAIL_PENDING,
        });

        try {
            const res = await fetch(gORDER_DETAILS_API_URL, requestOptions);
            const resObj = await res.json();

            if (!res.ok) {
                throw new Error(`Could not update orderDetails, status: ${res.status}`);
            }

            return dispatch({
                type: UPDATE_ORDER_DETAIL_SUCCESS,
                data: resObj,
            });
        } catch (err) {
            return dispatch({
                type: UPDATE_ORDER_DETAIL_ERROR,
                error: err,
            });
        }
    };
};

//Delete orderDetail
export const deleteOrderDetail = (paramOrderDetailId) => {
    return async (dispatch) => {
        const requestOptions = {
            method: 'DELETE',
        };

        await dispatch({
            type: DELETE_ORDER_DETAIL_PENDING
        });

        try {
            const res = await fetch(gORDER_DETAILS_API_URL + `/${paramOrderDetailId}`, requestOptions);
            const resObj = await res.json();

            if (!res.ok) {
                throw new Error(`Could not delete orderDetails, status: ${res.status}`);
            }

            return dispatch({
                type: DELETE_ORDER_DETAIL_SUCCESS,
                payload: resObj.status
            })

        } catch (err) {
            return dispatch({
                type: DELETE_ORDER_DETAIL_ERROR,
                payload: err
            })
        }
    }
}

//Get All Order detail of Order
export const getAllOrderDetailOfOrder = ({ limit, page, searchQuery, sortBy, sortOrder, orderId }) => {
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
                type: LOAD_ORDER_DETAILS_PENDING
            });

            //fetch OrderDetail
            const res = await fetch(`${gORDERS_API_URL}/${orderId}/orderDetails?${request}`, requestOptions);
            console.log(res.ok)

            // throw an error if the response is not successful
            if (!res.ok) {
                throw new Error(`Could not fetch orderDetails, status: ${res.status}`);
            }

            // parse the response as JSON
            const resObj = await res.json();

            console.log(resObj)

            //Dispatch state
            return dispatch({
                type: LOAD_ORDER_DETAILS_SUCCESS,
                totalOrderDetail: resObj.totalCount,
                orderDetails: resObj.data
            })

        } catch (err) {
            //if error
            return dispatch({
                type: LOAD_ORDER_DETAILS_ERROR,
                error: err
            })
        }
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
        type: SET_SORT_ORDER,
        payload: sortOrder
    }
}

//Update changed value in the search box of detail
export const updateOrderDetailSearchQuery = (searchQuey) => {
    return {
        type: UPDATE_ORDER_DETAIL_SEARCH_QUERY,
        payload: searchQuey
    }
}
