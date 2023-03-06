import {
    FETCH_ORDERS_PENDING,
    FETCH_ORDERS_ERROR,
    FETCH_ORDERS_SUCCESS,

    GET_ORDER_BY_ID_PENDING,
    GET_ORDER_BY_ID_ERROR,
    GET_ORDER_BY_ID_SUCCESS,

    FETCH_CITY_PENDING,
    FETCH_CITY_SUCCESS,
    FETCH_CITY_ERROR,

    CREATE_ORDER_PENDING,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_ERROR,

    UPDATE_ORDER_BY_ID_PENDING,
    UPDATE_ORDER_BY_ID_SUCCESS,
    UPDATE_ORDER_BY_ID_ERROR,

    DELETE_ORDER_PENDING,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_ERROR,

    GET_ORDER_NOTE,

    ADD_FIRST_PRODUCT,
    ADD_NEW_PRODUCT,
    DECREASE_QUANTITY,
    INCREASE_QUANTITY
} from "../constants/order.constants";

const initialState = {
    //Load order
    totalOrder: 0,
    orders: [],
    pending: false,
    error: null,
    currentPage: 1,
    orderCondition: "",

    //Modal update order
    updateOrderPending: false,

    //Modal Delete Order
    deleteOrderPending: false,

    //Add To Cart
    cart: [],//{product:...,quantity:...}
    note: "",
    //Create Order
    orderId: null,


    //Order detail
    orderById: {},
    getOrderByIdPending: false,

    //Update Order
    updateOrderPending: false,
    updateStatus: null,//Demo
    updateError: null
}

export default function orderReducers(state = initialState, action) {
    switch (action.type) {
        //Load Order
        case FETCH_ORDERS_PENDING:
            state.pending = true;
            break;
        case FETCH_ORDERS_SUCCESS:
            state.pending = false;
            state.totalOrder = action.totalOrder;
            state.orders = action.orders;
            state.error = null;
            break;
        case FETCH_ORDERS_ERROR:
            state.error = action.error
            break;

        //Get product By Id
        case GET_ORDER_BY_ID_PENDING:
            state.getOrderByIdPending = true
            break;
        case GET_ORDER_BY_ID_SUCCESS:
            state.getOrderByIdPending = false;
            state.orderById = action.orderById
            state.error = null
            break;
        case GET_ORDER_BY_ID_ERROR:
            state.error = action.error
            break;
        case GET_ORDER_NOTE: 
            state.note=action.note
        //Create Order
        case CREATE_ORDER_PENDING:
            state.createOrderPending = true
            break;
        case CREATE_ORDER_SUCCESS:
            state.createOrderPending = false
            state.orderId = action.data._id
            break;
        case CREATE_ORDER_ERROR:
            state.error = action.error
            break;

        // //Update Order
        // case UPDATE_ORDER_PENDING:
        //     state.updateOrderPending = true
        //     break;
        // case UPDATE_ORDER_SUCCESS:
        //     state.updateOrderPending = false
            
        //     break;
        // case UPDATE_ORDER_ERROR:
        //     state.error = action.error
        //     break;

        case UPDATE_ORDER_BY_ID_PENDING:
            state.updateOrderPending = true
            break;
        case UPDATE_ORDER_BY_ID_SUCCESS:
            state.updateOrderPending = false
            state.updateStatus = "success"
            break;
        case UPDATE_ORDER_BY_ID_ERROR:
            state.updateOrderPending = false
            state.updateStatus = "error"
            break;

        //Delete Order
        case DELETE_ORDER_PENDING:
            state.deleteOrderPending = true
            break;
        case DELETE_ORDER_SUCCESS:
            state.deleteOrderPending = false
            break;
        case DELETE_ORDER_ERROR:
            state.error = action.error
            break;

        //Load Cities List
        case FETCH_CITY_PENDING:
            state.loadCitiesPending = true
            break;
        case FETCH_CITY_SUCCESS:
            state.loadCitiesPending = false
            state.cityOptions = action.cityOptions
            break;
        case FETCH_CITY_ERROR:
            break;

        //Add To Cart
        case ADD_FIRST_PRODUCT:
            state.cart = [{ product: action.product, quantity: action.quantity }]
            break;
        case ADD_NEW_PRODUCT:
            state.cart.push({ product: action.product, quantity: action.quantity })
            break;
        case INCREASE_QUANTITY:
            state.cart[action.index].quantity++
            break;
        case DECREASE_QUANTITY:
            if (state.cart[action.index].quantity <= 1) {
                state.cart.splice(action.index, 1)
            } else {
                state.cart[action.index].quantity--
            }
            break;
        default:
            break;
    }
    return { ...state };
}

