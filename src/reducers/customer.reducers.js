import {
    FETCH_CUSTOMER_PENDING,
    FETCH_CUSTOMER_ERROR,
    FETCH_CUSTOMER_SUCCESS,

    FETCH_COUNTRY_PENDING,
    FETCH_COUNTRY_SUCCESS,
    FETCH_COUNTRY_ERROR,

    FETCH_CITY_PENDING,
    FETCH_CITY_SUCCESS,
    FETCH_CITY_ERROR,

    CREATE_CUSTOMER_PENDING,
    CREATE_CUSTOMER_SUCCESS,
    CREATE_CUSTOMER_ERROR,

    UPDATE_CUSTOMER_PENDING,
    UPDATE_CUSTOMER_SUCCESS,
    UPDATE_CUSTOMER_ERROR,

    DELETE_CUSTOMER_PENDING,
    DELETE_CUSTOMER_SUCCESS,
    DELETE_CUSTOMER_ERROR,

    GET_COUNTRY,
    GET_CITY,
    GET_ADDRESS
} from "../constants/customer.constants";

const initialState = {
    //Load customer
    totalCustomer: 0,
    customers: [],
    pending: false,
    error: null,
    currentPage: 1,
    
    //generation
    countryOptions: null,
    cityOptions: null,
    
    //Modal create new customer
    createCustomerPending: false,
    loadCountriesPending: false,
    loadCitiesPending: false,
    country: null,
    city: null,
    address: null,
    createRes: null,

    //Modal update customer
    updateCustomerPending: false,

    //Modal Delete Customer
    deleteCustomerPending: false,
}

export default function customerReducers(state = initialState, action) {
    switch (action.type) {
        //Load Customer
        case FETCH_CUSTOMER_PENDING:
            state.pending = true;
            break;
        case FETCH_CUSTOMER_SUCCESS:
            console.log(action.customers)
            state.pending = false;
            state.totalCustomer = action.totalCustomer;
            state.customers = action.customers;
            break;
        case FETCH_CUSTOMER_ERROR:
            break;

        //Create Customer
        case CREATE_CUSTOMER_PENDING:
            state.createCustomerPending = true
            break;
        case CREATE_CUSTOMER_SUCCESS:
            state.createCustomerPending = false
            break;
        case CREATE_CUSTOMER_ERROR:
            break;

        //Update Customer
        case UPDATE_CUSTOMER_PENDING:
            state.updateCustomerPending = true
            break;
        case UPDATE_CUSTOMER_SUCCESS:
            state.updateCustomerPending = false
            break;
        case UPDATE_CUSTOMER_ERROR:
            break;

        //Delete Customer
        case DELETE_CUSTOMER_PENDING:
            state.deleteCustomerPending = true
            break;
        case DELETE_CUSTOMER_SUCCESS:
            state.deleteCustomerPending = false
            break;
        case DELETE_CUSTOMER_ERROR:
            break;

        //Modal Create New Customer
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
        default:
            break;
    }
    return { ...state };
}

