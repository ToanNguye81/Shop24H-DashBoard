import {
    FETCH_CUSTOMERS_PENDING,
    FETCH_CUSTOMERS_ERROR,
    FETCH_CUSTOMERS_SUCCESS,

    FETCH_COUNTRIES_PENDING,
    FETCH_COUNTRIES_SUCCESS,
    FETCH_COUNTRIES_ERROR,

    FETCH_CITIES_PENDING,
    FETCH_CITIES_SUCCESS,
    FETCH_CITIES_ERROR,

    CREATE_CUSTOMER_PENDING,
    CREATE_CUSTOMER_SUCCESS,
    CREATE_CUSTOMER_ERROR,

    GET_COUNTRY,
    GET_CITY,
    GET_ADDRESS
} from "../constants/customer.constants";

const initialState = {
    //Table customer
    totalCustomer: 0,
    customers: [],
    pending: false,
    error: null,
    currentPage: 1,
    //Modal create new customer
    createNewUserPending: false,
    loadCountriesPending: false,
    loadCitiesPending: false,
    countryOptions: null,
    cityOptions: null,
    country: null,
    city: null,
    address: null,
    createRes: null,
}

export default function customerReducers(state = initialState, action) {
    switch (action.type) {
        //Table Customer
        case FETCH_CUSTOMERS_PENDING:
            state.pending = true;
            break;
        case FETCH_CUSTOMERS_SUCCESS:
            console.log(action.customers)
            state.pending = false;
            state.totalCustomer = action.totalCustomer;
            state.customers = action.customers;
            break;
        case FETCH_CUSTOMERS_ERROR:
            break;

        //Modal Create New Customer
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

        //Create Customer
        case CREATE_CUSTOMER_PENDING:
            state.createNewUserPending = true
            break;
        case CREATE_CUSTOMER_SUCCESS:
            state.createNewUserPending = false
            break;
        case CREATE_CUSTOMER_ERROR:
            break;

        default:
            break;
    }
    return { ...state };
}

