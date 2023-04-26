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
    SET_PRODUCT_SORT_BY,
    SET_PRODUCT_SORT_ORDER,
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
            return {
                ...state,
                pending: true
            }
        case LOAD_PRODUCTS_SUCCESS:
            return {
                ...state,
                pending: false,
                totalProduct: action.totalProduct,
                products: action.products,
                error: null,
            }
        case LOAD_PRODUCTS_ERROR:
            return {
                ...state,
                error: action.error
            }
        //Get product By Id
        case GET_PRODUCT_BY_ID_PENDING:
            return {
                ...state,
                getProductByIdPending: true
            }
        case GET_PRODUCT_BY_ID_SUCCESS:
            return {
                ...state,
                getProductByIdPending: false,
                productById: action.productById,
                error: null
            }
        case GET_PRODUCT_BY_ID_ERROR:
            return {
                ...state,
                error: action.error
            }
        //Delete OrderDetail
        case DELETE_PRODUCT_PENDING:
            return {
                ...state,
                deleteProductPending: true
            }
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                deleteProductPending: false
            }
        case DELETE_PRODUCT_ERROR:
            return {
                ...state,
                error: action.error
            }
        case UPDATE_PRODUCT_PENDING:
            return {
                ...state,
                updateProductPending: true,
                updateStatus: null,
            }
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                updateStatus: "success",
                updateProductPending: false
            }
        case UPDATE_PRODUCT_ERROR:
            return {
                ...state,
                updateStatus: "error",
                updateProductPending: false
            }
        case SET_PAGE:
            return {
                ...state,
                page: action.payload
            };
        case SET_PRODUCT_SORT_BY:
            return {
                ...state,
                sortBy: action.payload
            }
        case SET_PRODUCT_SORT_ORDER:
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
            return { ...state };
    }

}