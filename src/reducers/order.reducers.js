import {
    LOAD_ORDERS_PENDING,
    LOAD_ORDERS_ERROR,
    LOAD_ORDERS_SUCCESS,

    GET_ORDER_BY_ID_PENDING,
    GET_ORDER_BY_ID_ERROR,
    GET_ORDER_BY_ID_SUCCESS,

    LOAD_CITY_PENDING,
    LOAD_CITY_SUCCESS,
    LOAD_CITY_ERROR,

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
    INCREASE_QUANTITY,

    UPDATE_ORDER_SEARCH_QUERY,
    SET_SORT_BY,
    SET_SORT_ORDER_OF_ORDER,
} from "../constants/order.constants";

const initialState = {
    //Load order
    totalOrder: 0,
    orders: [],
    pending: false,
    error: null,
    searchQuery: "",
    sortBy: "orderDate",
    sortOrder: "desc",

    // Delete Order
    deleteOrderPending: false,

    //Add To Cart
    cart: [],//{product:...,quantity:...}
    note: "",

    //Create Order
    orderId: null,

    //Order detail
    orderById: {
        orderCode: "",
        orderDate: "",
        cost:"",
        shippedDate: "",
        status: "",
        customer: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            city: "",
            country: "",
            address: "",
        },
    },
    getOrderByIdPending: false,

    //Update Order
    updateOrderPending: false,
    updateStatus: null,//Demo
    updateError: null
}

export default function orderReducers(state = initialState, action) {
    switch (action.type) {
        //Load Order
        case LOAD_ORDERS_PENDING:
            return {
                ...state,
                pending: true
            };
        case LOAD_ORDERS_SUCCESS:
            return {
                ...state,
                pending: false,
                totalOrder: action.totalOrder,
                orders: action.orders,
                error: null
            };
        case LOAD_ORDERS_ERROR:
            return {
                ...state,
                error: action.error
            };

        //Get product By Id
        case GET_ORDER_BY_ID_PENDING:
            return {
                ...state,
                getOrderByIdPending: true
            };
        case GET_ORDER_BY_ID_SUCCESS:
            return {
                ...state,
                getOrderByIdPending: false,
                orderById: action.orderById,
                error: null
            };
        case GET_ORDER_BY_ID_ERROR:
            return {
                ...state,
                error: action.error
            };
        case GET_ORDER_NOTE:
            return {
                ...state,
                note: action.note
            };
        //Create Order
        case CREATE_ORDER_PENDING:
            return {
                ...state,
                createOrderPending: true
            };
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                createOrderPending: false,
                orderId: action.data._id
            };
        case CREATE_ORDER_ERROR:
            return {
                ...state,
                error: action.error
            };

        case UPDATE_ORDER_BY_ID_PENDING:
            return {
                ...state,
                updateOrderPending: true
            };
        case UPDATE_ORDER_BY_ID_SUCCESS:
            return {
                ...state,
                updateOrderPending: false,
                updateStatus: "success"
            };
        case UPDATE_ORDER_BY_ID_ERROR:
            return {
                ...state,
                updateOrderPending: false,
                updateStatus: "error"
            };

        //Delete Order
        case DELETE_ORDER_PENDING:
            return {
                ...state,
                deleteOrderPending: true
            };
        case DELETE_ORDER_SUCCESS:
            return {
                ...state,
                deleteOrderPending: false
            };
        case DELETE_ORDER_ERROR:
            return {
                ...state,
                error: action.error
            };
        //Load Cities List
        case LOAD_CITY_PENDING:
            return {
                ...state,
                loadCitiesPending: true
            };
        case LOAD_CITY_SUCCESS:
            return {
                ...state,
                loadCitiesPending: false,
                cityOptions: action.cityOptions
            };
        case LOAD_CITY_ERROR:
            return state;

        case SET_SORT_ORDER_OF_ORDER:
            return {
                ...state,
                sortOrder: action.payload
            };

        case SET_SORT_BY:
            return {
                ...state,
                sortBy: action.payload
            }

        //Add To Cart
        case ADD_FIRST_PRODUCT:
            state.cart = [{ product: action.product, quantity: action.quantity }];
            break;
        case ADD_NEW_PRODUCT:
            state.cart.push({ product: action.product, quantity: action.quantity });
            break;
        case INCREASE_QUANTITY:
            state.cart[action.index].quantity++;
            break;
        case DECREASE_QUANTITY:
            if (state.cart[action.index].quantity <= 1) {
                state.cart.splice(action.index, 1);
            } else {
                state.cart[action.index].quantity--;
            }
            break;

        case UPDATE_ORDER_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: action.payload
            };

        default:
            break;
    }
    return { ...state };
}

