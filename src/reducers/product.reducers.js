import {
    LOAD_PRODUCTS_PENDING,
    LOAD_PRODUCTS_ERROR,
    LOAD_PRODUCTS_SUCCESS,

    GET_PRODUCT_BY_ID_ERROR,
    GET_PRODUCT_BY_ID_PENDING,
    GET_PRODUCT_BY_ID_SUCCESS,

    UPDATE_PRODUCT_PENDING,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_ERROR,

    DELETE_PRODUCT_ERROR,
    DELETE_PRODUCT_PENDING,
    DELETE_PRODUCT_SUCCESS,

    //Set Filter Condition
    SET_PAGE,
    SET_SORT_BY,
    SET_SORT_ORDER,
    SET_GENDER,
    SET_BRAND,
    SET_CATEGORY,
    SET_MIN_PRICE,
    SET_MAX_PRICE,
    RESET_CONDITION,

} from "../constants/product.constants";

const initialState = {
    totalProduct: 0,
    products: [],
    pending: false,
    error: null,

    //Product detail
    productById: {},
    getProductByIdPending: false,

    //Update Product
    updateProductPending: false,
    updateStatus: null,
    updateError: null,

    //Filter and sort
    productPerPage: 5,
    page: 0,
    sortBy: "",
    sortOrder: "",
    gender: [],
    brand: [],
    category: [],
    minPrice: 0,
    maxPrice: 2000,
}

export default function productReducers(state = initialState, action) {
    switch (action.type) {
        case LOAD_PRODUCTS_PENDING:
            state.pending = true;
            break;
        case LOAD_PRODUCTS_SUCCESS:
            state.pending = false;
            state.totalProduct = action.totalProduct;
            state.products = action.products;
            state.error = null;
            break;
        case LOAD_PRODUCTS_ERROR:
            state.error = action.error
            break;

        //Get product By Id
        case GET_PRODUCT_BY_ID_PENDING:
            state.getProductByIdPending = true
            break;
        case GET_PRODUCT_BY_ID_SUCCESS:
            state.getProductByIdPending = false;
            state.productById = action.productById
            state.error = null
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

        case UPDATE_PRODUCT_PENDING:
            state.updateProductPending = true
            state.updateStatus = null
            break;
        case UPDATE_PRODUCT_SUCCESS:
            state.updateProductPending = false
            state.updateStatus = "success"
            break;
        case UPDATE_PRODUCT_ERROR:
            state.updateProductPending = false
            state.updateStatus = "error"
            break;
        case SET_PAGE:
            console.log(action.payload)
            return {
                ...state,
                page: action.payload
            };
        case SET_SORT_BY:
            return {
                ...state,
                sortBy: action.payload
            }
        case SET_SORT_ORDER:
            return {
                ...state,
                sortOrder: action.payload
            }
        case SET_GENDER:
            return {
                ...state,
                gender: action.payload
            }
        case SET_BRAND:
            return {
                ...state,
                brand: action.payload
            }
        case SET_CATEGORY:
            return {
                ...state,
                category: action.payload
            }
        case SET_MIN_PRICE:
            return {
                ...state,
                minPrice: action.payload
            }
        case SET_MAX_PRICE:
            return {
                ...state,
                maxPrice: action.payload
            }
        case RESET_CONDITION:
            return {
                ...state,
                gender: [],
                brand: [],
                category: [],
                minPrice: 0,
                maxPrice: 2000,
            }
        default:
            break;
    }

    return { ...state };
}