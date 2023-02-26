import {
    FETCH_ORDER_DETAILS_PENDING,
    FETCH_ORDER_DETAILS_ERROR,
    FETCH_ORDER_DETAILS_SUCCESS,

    CREATE_ORDER_DETAIL_PENDING,
    CREATE_ORDER_DETAIL_SUCCESS,
    CREATE_ORDER_DETAIL_ERROR,

    UPDATE_ORDER_DETAIL_PENDING,
    UPDATE_ORDER_DETAIL_SUCCESS,
    UPDATE_ORDER_DETAIL_ERROR,

    DELETE_ORDER_DETAIL_PENDING,
    DELETE_ORDER_DETAIL_SUCCESS,
    DELETE_ORDER_DETAIL_ERROR,

} from "../constants/orderDetail.constants";

const initialState = {
    //Load orderDetail
    totalOrderDetail: 0,
    orderDetails: [],
    pending: false,
    error: null,
    currentPage: 1,

    //Modal update orderDetail
    updateOrderDetailPending: false,

    //Modal Delete OrderDetail
    deleteOrderDetailPending: false,
     
    //Create OrderDetail
    orderDetailId:null

}

export default function orderDetailReducers(state = initialState, action) {
    switch (action.type) {
        //Load OrderDetail
        case FETCH_ORDER_DETAILS_PENDING:
            state.pending = true;
            break;
        case FETCH_ORDER_DETAILS_SUCCESS:
            state.pending = false;
            state.totalOrderDetail = action.totalOrderDetail;
            state.orderDetails = action.orderDetails;
            state.error=null;
            break;
        case FETCH_ORDER_DETAILS_ERROR:
            break;

        //Create OrderDetail
        case CREATE_ORDER_DETAIL_PENDING:
            state.createOrderDetailPending = true
            break;
        case CREATE_ORDER_DETAIL_SUCCESS:
            state.createOrderDetailPending = false
            break;
        case CREATE_ORDER_DETAIL_ERROR:
            state.error = action.error
            break;

        //Update OrderDetail
        case UPDATE_ORDER_DETAIL_PENDING:
            state.updateOrderDetailPending = true
            break;
        case UPDATE_ORDER_DETAIL_SUCCESS:
            state.updateOrderDetailPending = false
            state.orderDetailId=action.data._id
            break;
        case UPDATE_ORDER_DETAIL_ERROR:
            break;

        //Delete OrderDetail
        case DELETE_ORDER_DETAIL_PENDING:
            state.deleteOrderDetailPending = true
            break;
        case DELETE_ORDER_DETAIL_SUCCESS:
            state.deleteOrderDetailPending = false
            break;
        case DELETE_ORDER_DETAIL_ERROR:
            state.error = action.error
            break;

        default:
            break;
    }
    return { ...state };
}

