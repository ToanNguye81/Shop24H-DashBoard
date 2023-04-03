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
    GET_ADDRESS,
    GET_FIRST_NAME,
    GET_LAST_NAME,
    GET_PHONE,
    GET_EMAIL,

    GET_CUSTOMER_BY_ID
} from "../constants/customer.constants";

const initialState = {
    //Load customer
    totalCustomer: 0,
    customers: [],
    pending: false,
    error: null,
    currentPage: 1,
    orders: [],

    //generation
    countryOptions: [],
    cityOptions: [],

    //Modal create new customer
    createCustomerPending: false,
    country: "",
    city: "",
    address: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    customerId: null,

    //Modal update customer
    updateCustomerPending: false,

    //Modal Delete Customer
    deleteCustomerPending: false,

    //Load country-city
    loadCountriesPending: false,
    loadCitiesPending: false,

    //Get customer by id
    customerById: "",
}

export default function customerReducers(state = initialState, action) {
    switch (action.type) {
        //Load Customer
        case FETCH_CUSTOMER_PENDING:
            return {
                ...state,
                pending: true,
            };
        case FETCH_CUSTOMER_SUCCESS:
            return {
                ...state,
                pending: false,
                totalCustomer: action.totalCustomer,
                customers: action.customers,
            };
        case FETCH_CUSTOMER_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error,
            };

        //Create Customer
        case CREATE_CUSTOMER_PENDING:
            return {
                ...state,
                createCustomerPending: true,
            };
        case CREATE_CUSTOMER_SUCCESS:
            return {
                ...state,
                createCustomerPending: false,
                customerId: action.data._id,
            };
        case CREATE_CUSTOMER_ERROR:
            return {
                ...state,
                error: action.error,
            };

        //Update Customer
        case UPDATE_CUSTOMER_PENDING:
            return {
                ...state,
                updateCustomerPending: true,
            };
        case UPDATE_CUSTOMER_SUCCESS:
            return {
                ...state,
                updateCustomerPending: false,
            };
        case UPDATE_CUSTOMER_ERROR:
            return {
                ...state,
                error: action.error,
            };

        //Delete Customer
        case DELETE_CUSTOMER_PENDING:
            return {
                ...state,
                deleteCustomerPending: true,
            };
        case DELETE_CUSTOMER_SUCCESS:
            return {
                ...state,
                deleteCustomerPending: false,
            };
        case DELETE_CUSTOMER_ERROR:
            return {
                ...state,
                error: action.error,
            };

        //Modal component select
        case FETCH_COUNTRY_PENDING:
            return {
                ...state,
                loadCountriesPending: true,
            };
        case FETCH_COUNTRY_SUCCESS:
            return {
                ...state,
                loadCountriesPending: false,
                countryOptions: action.countryOptions,
            };
        case FETCH_COUNTRY_ERROR:
            return {
                ...state,
                error: action.error,
            };

        //Load Cities List
        case FETCH_CITY_PENDING:
            return {
                ...state,
                loadCitiesPending: true,
            };
        case FETCH_CITY_SUCCESS:
            return {
                ...state,
                loadCitiesPending: false,
                cityOptions: action.cityOptions,
            };
        case FETCH_CITY_ERROR:
            return {
                ...state,
                error: action.error,
            };

        //Get customer data
        case GET_COUNTRY:
            return {
                ...state,
                country: action.country,
            };
        case GET_CITY:
            return {
                ...state,
                city: action.city,
            };
        case GET_ADDRESS:
            return {
                ...state,
                address: action.address,
            };
        case GET_FIRST_NAME:
            return {
                ...state,
                firstName: action.firstName,
            };
        case GET_LAST_NAME:
            return {
                ...state,
                lastName: action.lastName,
            };
        case GET_PHONE:
            return {
                ...state,
                phone: action.phone,
            };
        case GET_EMAIL:
            return {
                ...state,
                email: action.email,
            };

        case GET_CUSTOMER_BY_ID:
            return {
                ...state,
                customerById: action.payload,
            };

        default:
            return state;
    }
}
