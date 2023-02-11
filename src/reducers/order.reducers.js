import {
    FETCH_ORDERS_PENDING,
    FETCH_ORDERS_ERROR,
    FETCH_ORDERS_SUCCESS,

    FETCH_COUNTRY_PENDING,
    FETCH_COUNTRY_SUCCESS,
    FETCH_COUNTRY_ERROR,

    FETCH_CITY_PENDING,
    FETCH_CITY_SUCCESS,
    FETCH_CITY_ERROR,

    CREATE_ORDER_PENDING,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_ERROR,

    UPDATE_ORDER_PENDING,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_ERROR,

    DELETE_ORDER_PENDING,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_ERROR,

    GET_COUNTRY,
    GET_CITY,
    GET_ADDRESS,

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

    //generation
    countryOptions: null,
    cityOptions: null,

    //Modal create new order
    createOrderPending: false,
    loadCountriesPending: false,
    loadCitiesPending: false,
    country: null,
    city: null,
    address: null,
    createRes: null,

    //Modal update order
    updateOrderPending: false,

    //Modal Delete Order
    deleteOrderPending: false,

    //Add To Cart
    cart: [],//{product:...,quantity:...}
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
            break;
        case FETCH_ORDERS_ERROR:
            break;

        //Create Order
        case CREATE_ORDER_PENDING:
            state.createOrderPending = true
            break;
        case CREATE_ORDER_SUCCESS:
            state.createOrderPending = false
            break;
        case CREATE_ORDER_ERROR:
            break;

        //Update Order
        case UPDATE_ORDER_PENDING:
            state.updateOrderPending = true
            break;
        case UPDATE_ORDER_SUCCESS:
            state.updateOrderPending = false
            break;
        case UPDATE_ORDER_ERROR:
            break;

        //Delete Order
        case DELETE_ORDER_PENDING:
            state.deleteOrderPending = true
            break;
        case DELETE_ORDER_SUCCESS:
            state.deleteOrderPending = false
            break;
        case DELETE_ORDER_ERROR:
            break;

        //Modal Create New Order
        case FETCH_COUNTRY_PENDING:
            state.loadCountriesPending = true
            break;
        case FETCH_COUNTRY_SUCCESS:
            state.loadCountriesPending = false
            state.countryOptions = action.countryOptions
            console.log(action.countryOptions)
            break;
        case FETCH_COUNTRY_ERROR:
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

        //Get address select
        case GET_COUNTRY:
            state.country = action.country
            break;
        case GET_CITY:
            state.city = action.city
            break;
        case GET_ADDRESS:
            state.address = action.address
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
            if(state.cart[action.index].quantity<=1)
            {
                state.cart.splice(action.index,1)
            }else{
                state.cart[action.index].quantity--
            }
            break;
        default:
            break;
    }
    return { ...state };
}

