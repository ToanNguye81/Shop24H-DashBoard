import {
    FETCH_ORDER_DETAILS_PENDING,
    FETCH_ORDER_DETAILS_ERROR,
    FETCH_ORDER_DETAILS_SUCCESS,

    FETCH_COUNTRIES_PENDING,
    FETCH_COUNTRIES_SUCCESS,
    FETCH_COUNTRIES_ERROR,

    FETCH_CITIES_PENDING,
    FETCH_CITIES_SUCCESS,
    FETCH_CITIES_ERROR,

    CREATE_ORDER_DETAIL_PENDING,
    CREATE_ORDER_DETAIL_SUCCESS,
    CREATE_ORDER_DETAIL_ERROR,

    UPDATE_ORDER_DETAIL_PENDING,
    UPDATE_ORDER_DETAIL_SUCCESS,
    UPDATE_ORDER_DETAIL_ERROR,

    DELETE_ORDER_DETAIL_PENDING,
    DELETE_ORDER_DETAIL_SUCCESS,
    DELETE_ORDER_DETAIL_ERROR,

    GET_COUNTRY,
    GET_CITY,
    GET_ADDRESS
} from "../constants/orderDetail.constants";

const initialState = {
    //Load orderDetail
    totalOrderDetail: 0,
    orderDetails: [],
    pending: false,
    error: null,
    currentPage: 1,
    
    //generation
    countryOptions: null,
    cityOptions: null,
    
    //Modal create new orderDetail
    createOrderDetailPending: false,
    loadCountriesPending: false,
    loadCitiesPending: false,
    country: null,
    city: null,
    address: null,
    createRes: null,

    //Modal update orderDetail
    updateOrderDetailPending: false,

    //Modal Delete OrderDetail
    deleteOrderDetailPending: false,

}

export default function orderDetailReducers(state = initialState, action) {
    switch (action.type) {
        //Load OrderDetail
        case FETCH_ORDER_DETAILS_PENDING:
            state.pending = true;
            break;
        case FETCH_ORDER_DETAILS_SUCCESS:
            console.log(action.orderDetails)
            state.pending = false;
            state.totalOrderDetail = action.totalOrderDetail;
            state.orderDetails = action.orderDetails;
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
            break;

        //Update OrderDetail
        case UPDATE_ORDER_DETAIL_PENDING:
            state.updateOrderDetailPending = true
            break;
        case UPDATE_ORDER_DETAIL_SUCCESS:
            state.updateOrderDetailPending = false
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
            break;

        //Modal Create New OrderDetail
        case FETCH_COUNTRIES_PENDING:
            state.loadCountriesPending = true
            break;
        case FETCH_COUNTRIES_SUCCESS:
            state.loadCountriesPending = false
            state.countryOptions = action.countryOptions
            console.log(action.countryOptions)
            break;
        case FETCH_COUNTRIES_ERROR:
            break;

        //Load Cities List
        case FETCH_CITIES_PENDING:
            state.loadCitiesPending = true
            break;
        case FETCH_CITIES_SUCCESS:
            state.loadCitiesPending = false
            state.cityOptions = action.cityOptions
            break;
        case FETCH_CITIES_ERROR:
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

        default:
            break;
    }
    return { ...state };
}

