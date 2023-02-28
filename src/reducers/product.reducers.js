import {
    FETCH_PRODUCTS_PENDING,
    FETCH_PRODUCTS_ERROR,
    FETCH_PRODUCTS_SUCCESS,

    GET_PRODUCT_BY_ID_ERROR,
    GET_PRODUCT_BY_ID_PENDING,
    GET_PRODUCT_BY_ID_SUCCESS,

    DELETE_PRODUCT_ERROR,
    DELETE_PRODUCT_PENDING,
    DELETE_PRODUCT_SUCCESS,
} from "../constants/product.constants";

const initialState = {
    totalProduct: 0,
    products: [],
    pending: false,
    error: null,
    currentPage: 1,

    //Product detail
    productById: null
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
            state.error = null;
            break;
        case FETCH_PRODUCTS_ERROR:
            state.error = action.error
            break;

        //Get product By Id
        case GET_PRODUCT_BY_ID_PENDING:
            state.pending = true
            break;
        case GET_PRODUCT_BY_ID_SUCCESS:
            state.productById = action.productById
            state.error=null
            break;
        case GET_PRODUCT_BY_ID_ERROR:
            state.error = action.error
            break;

        //Delete OrderDetail
        case DELETE_PRODUCT_PENDING:
            state.deleteProductPending = true
            break;
        case DELETE_PRODUCT_SUCCESS:
            state.deleteProductPending = false
            break;
        case DELETE_PRODUCT_ERROR:
            state.error = action.error
            break;

        default:
            break;
    }

    return { ...state };
}