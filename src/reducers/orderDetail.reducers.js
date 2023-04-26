import {
    LOAD_ORDER_DETAILS_PENDING,
    LOAD_ORDER_DETAILS_ERROR,
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
    UPDATE_ORDER_DETAIL_SEARCH_QUERY,
} from "../constants/orderDetail.constants"

const initialState = {
    //Load orderDetail
    totalOrderDetail: 0,
    orderDetails: [],
    pending: false,
    error: null,
    sortBy: "",
    sortOrder: "",
    searchQuery: "",

    // update orderDetail
    updateOrderDetailPending: false,

    // Delete OrderDetail
    deleteOrderDetailPending: false,

    //Create OrderDetail
    orderDetailId: null

}

export default function orderDetailReducers(state = initialState, action) {
    switch (action.type) {
        //Load OrderDetail
        case LOAD_ORDER_DETAILS_PENDING:
            return {
                ...state,
                pending: true,

            }
        case LOAD_ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                pending: false,
                totalOrderDetail: action.totalOrderDetail,
                orderDetails: action.orderDetails,
                error: null,

            }
        case LOAD_ORDER_DETAILS_ERROR:
            return {
                ...state,


                //Create OrderDetail
            }
        case CREATE_ORDER_DETAIL_PENDING:
            return {
                ...state,
                createOrderDetailPending: true

            }
        case CREATE_ORDER_DETAIL_SUCCESS:
            return {
                ...state,
                createOrderDetailPending: false

            }
        case CREATE_ORDER_DETAIL_ERROR:
            return {
                ...state,
                error: action.error


                //Update OrderDetail
            }
        case UPDATE_ORDER_DETAIL_PENDING:
            return {
                ...state,
                updateOrderDetailPending: true

            }
        case UPDATE_ORDER_DETAIL_SUCCESS:
            return {
                ...state,
                updateOrderDetailPending: false,
                orderDetailId: action.data._id
            }
        case UPDATE_ORDER_DETAIL_ERROR:
            return {
                ...state,
            }
        //Delete OrderDetail
        case DELETE_ORDER_DETAIL_PENDING:
            return {
                ...state,
                deleteOrderDetailPending: true
            }
        case DELETE_ORDER_DETAIL_SUCCESS:
            return {
                ...state,
                deleteOrderDetailPending: false
            }
        case DELETE_ORDER_DETAIL_ERROR:
            return {
                ...state,
                error: action.error
            }
        case SET_SORT_BY:
            return {
                ...state,
                sortBy: action.payload
            }
        case SET_SORT_ORDER:
            return {
                ...state,
                sortOrder: action.payload
            }
        case UPDATE_ORDER_DETAIL_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: action.payload
            }
        default:
            return {...state}
    }
}

