import {
    FETCH_CUSTOMERS_PENDING,
    FETCH_CUSTOMERS_ERROR,
    FETCH_CUSTOMERS_SUCCESS,
} from "../constants/customer.constants";

const initialState = {
    totalCustomer: 0,
    customers: [],
    pending: false,
    error: null,
    currentPage: 1
}

export default function customerReducers(state = initialState, action) {
    switch (action.type) {
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
        default:
            break;
    }

    return {...state};
}