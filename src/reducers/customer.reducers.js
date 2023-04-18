import {
    LOAD_CUSTOMER_PENDING,
    LOAD_CUSTOMER_ERROR,
    LOAD_CUSTOMER_SUCCESS,

    LOAD_COUNTRY_PENDING,
    LOAD_COUNTRY_SUCCESS,
    LOAD_COUNTRY_ERROR,

    LOAD_CITY_PENDING,
    LOAD_CITY_SUCCESS,
    LOAD_CITY_ERROR,

    CREATE_CUSTOMER_PENDING,
    CREATE_CUSTOMER_SUCCESS,
    CREATE_CUSTOMER_ERROR,

    UPDATE_CUSTOMER_PENDING,
    UPDATE_CUSTOMER_SUCCESS,
    UPDATE_CUSTOMER_ERROR,

    DELETE_CUSTOMER_PENDING,
    DELETE_CUSTOMER_SUCCESS,
    DELETE_CUSTOMER_ERROR,

    GET_CUSTOMER_BY_ID_PENDING,
    GET_CUSTOMER_BY_ID_SUCCESS,
    GET_CUSTOMER_BY_ID_ERROR,

    UPDATE_NEW_CUSTOMER,
    UPDATE_CUSTOMER_SEARCH_QUERY,
    SET_CUSTOMER_SORT_ORDER,
    SET_CUSTOMER_SORT_BY
} from "../constants/customer.constants";

const initialState = {
    //Load customer
    totalCustomer: 0,
    customers: [],
    pending: false,
    error: null,
    
    orders: [],
    searchQuery: "",
    sortBy: "createdAt",
    sortOrder: "desc",
    brand:"",
    gender:"",
    category:"",
    
    //generation
    countryOptions: [],
    loadCountryOptionsPending: false,
    cityOptions: [],
    loadCityOptionsPending: false,

    // create customer for order
    createCustomerPending: false,
    country: "",
    city: "",
    address: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    customerId: null,

    //Create New Customer
    newCustomer: {
        country: "",
        city: "",
        address: "",
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
    },


    // update customer
    updateCustomerPending: false,

    // Delete Customer
    deleteCustomerPending: false,

    //Customer detail
    customerById: {},
    getCustomerByIdPending: false,
}

export default function customerReducers(state = initialState, action) {
    switch (action.type) {
        //Load Customer
        case LOAD_CUSTOMER_PENDING:
            return {
                ...state,
                pending: true,
            };
        case LOAD_CUSTOMER_SUCCESS:
            return {
                ...state,
                pending: false,
                totalCustomer: action.totalCustomer,
                customers: action.customers,
            };
        case LOAD_CUSTOMER_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error,
            };

        //Create Customer
        case CREATE_CUSTOMER_PENDING:
            console.log("CREATE_CUSTOMER_PENDING")
            return {
                ...state,
                createCustomerPending: true,
            };
        case CREATE_CUSTOMER_SUCCESS:
            console.log("CREATE_CUSTOMER_SUCCESS")
            return {
                ...state,
                createCustomerPending: false,
                customerId: action.data._id,
            };
        case CREATE_CUSTOMER_ERROR:
            console.log("CREATE_CUSTOMER_ERROR")
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

        // component select
        case LOAD_COUNTRY_PENDING:
            return {
                ...state,
                loadCountryOptionsPending: true,
            };
        case LOAD_COUNTRY_SUCCESS:
            return {
                ...state,
                loadCountryOptionsPending: false,
                countryOptions: action.countryOptions,
            };
        case LOAD_COUNTRY_ERROR:
            return {
                ...state,
                loadCountryOptionsPending: false,
                error: action.error,
            };

        //Load Cities List
        case LOAD_CITY_PENDING:
            return {
                ...state,
                loadCityOptionsPending: true,
            };
        case LOAD_CITY_SUCCESS:
            return {
                ...state,
                loadCityOptionsPending: false,
                cityOptions: action.cityOptions,
            };
        case LOAD_CITY_ERROR:
            return {
                ...state,
                loadCityOptionsPending: false,
                error: action.error,
            };

        case GET_CUSTOMER_BY_ID_PENDING:
            return {
                ...state,
                getCustomerByIdPending: true
            }

        case GET_CUSTOMER_BY_ID_SUCCESS:
            return {
                ...state,
                customerById: action.payload,
                getCustomerByIdPending: false
            }

        case GET_CUSTOMER_BY_ID_ERROR:
            return {
                ...state,
                error: action.payload,
                getCustomerByIdPending: false
            }

        case UPDATE_NEW_CUSTOMER:
            return {
                ...state,
                newCustomer: {
                    ...state.newCustomer,
                    ...action.payload
                }
            }
        case UPDATE_CUSTOMER_SEARCH_QUERY:
            console.log(action.payload)
            return {
                ...state,
                searchQuery: action.payload
            }

        case SET_CUSTOMER_SORT_ORDER:
            return {
                ...state,
                sortOrder: action.payload
            };

        case SET_CUSTOMER_SORT_BY:
            return {
                ...state,
                sortBy: action.payload
            }
        default:
            return { ...state };
    }
}
