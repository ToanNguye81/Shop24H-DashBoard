import {
    FETCH_PRODUCTS_PENDING,
    FETCH_PRODUCTS_ERROR,
    FETCH_PRODUCTS_SUCCESS,
} from "../constants/product.constants";

const initialState = {
    totalProduct: 0,
    products: [],
    pending: false,
    error: null,
    currentPage: 1
}

export default function productReducers(state = initialState, action) {
    switch (action.type) {
        case FETCH_PRODUCTS_PENDING:
            state.pending = true;
            break;
        case FETCH_PRODUCTS_SUCCESS:
            state.pending = false;
            state.totalProduct = action.totalProduct;
            state.products = action.products;
            break;
        case FETCH_PRODUCTS_ERROR:
            break;
        default:
            break;
    }

    return {...state};
}