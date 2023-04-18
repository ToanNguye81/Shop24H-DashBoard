import {
    LOAD_PRODUCTS_ERROR,
    LOAD_PRODUCTS_PENDING,
    LOAD_PRODUCTS_SUCCESS,

    GET_PRODUCT_BY_ID_ERROR,
    GET_PRODUCT_BY_ID_PENDING,
    GET_PRODUCT_BY_ID_SUCCESS,

    CREATE_PRODUCT_PENDING,
    CREATE_PRODUCT_ERROR,
    CREATE_PRODUCT_SUCCESS,

    DELETE_PRODUCT_ERROR,
    DELETE_PRODUCT_PENDING,
    DELETE_PRODUCT_SUCCESS,

    UPDATE_PRODUCT_PENDING,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_ERROR,

    //Set filter Condition
    SET_PAGE,
    SET_SORT_BY,
    SET_SORT_ORDER,
    SET_GENDER,
    SET_BRAND,
    SET_CATEGORY,
    SET_MIN_PRICE,
    SET_MAX_PRICE,
    RESET_CONDITION
} from "../constants/product.constants";

const gPRODUCT_API_URL = "//localhost:8000/products"

//Get all product
export const getAllProduct = ({ productPerPage, page, sortBy, sortOrder, gender, brand, minPrice, maxPrice, category }) => {

    // build the request string
    const request = `limit=${productPerPage}&page=${page}&sortBy=${sortBy}&sortOrder=${sortOrder}&gender=${gender.join('&gender=')}&brand=${brand.join('&brand=')}&minPrice=${minPrice}&maxPrice=${maxPrice}&category=${category.join('&category=')}`

    // options for the fetch request
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    return async (dispatch) => {
        try {
            // dispatch pending state to update the UI
            await dispatch({
                type: LOAD_PRODUCTS_PENDING
            });

            //fetch Product
            const res = await fetch(`${gPRODUCT_API_URL}?${request}`, requestOptions);

            // throw an error if the response is not successful
            if (!res.ok) {
                throw new Error(`Could not fetch products, status: ${res.status}`);
            }
            // parse the response as JSON
            const resObj = await res.json();
            console.log(resObj)
            //Dispatch state
            return dispatch({
                type: LOAD_PRODUCTS_SUCCESS,
                totalProduct: resObj.totalCount,
                products: resObj.data
            })

        } catch (err) {
            //if error
            return dispatch({
                type: LOAD_PRODUCTS_ERROR,
                error: err
            })
        }
    }
}

//Get Product By Id
export const getProductById = (productId) => {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return async (dispatch) => {
        try {
            // dispatch pending state to update the UI
            await dispatch({
                type: GET_PRODUCT_BY_ID_PENDING
            });

            //fetch Product
            const res = await fetch(`${gPRODUCT_API_URL}/${productId}`, requestOptions);

            // parse the response as JSON
            const resObj = await res.json();

            // throw an error if the response is not successful
            if (!res.ok) {
                throw new Error(`${resObj.message}, status: ${res.status}`);
            }
            //Dispatch state
            return dispatch({
                type: GET_PRODUCT_BY_ID_SUCCESS,
                productById: resObj.data
            })

        } catch (err) {
            //if error
            return dispatch({
                type: GET_PRODUCT_BY_ID_ERROR,
                error: err
            })
        }
    }
}

//Delete product
export const deleteProduct = (paramProductId) => {
    return async (dispatch) => {
        const requestOptions = {
            method: 'DELETE',
        };
        await dispatch({
            type: DELETE_PRODUCT_PENDING
        });

        try {
            const res = await fetch(`${gPRODUCT_API_URL}/${paramProductId}`, requestOptions);
            const resObj = await res.json();

            if (!res.ok) {
                return dispatch({
                    type: DELETE_PRODUCT_ERROR,
                })
            }

            return dispatch({
                type: DELETE_PRODUCT_SUCCESS,
            })
        } catch (err) {
            console.log(err)
        }
    }
}

// Update customer
export const updateProductById = (productId, productData) => {
    return async (dispatch) => {
        //call PUT API 

        await dispatch({
            type: UPDATE_PRODUCT_PENDING,
        });

        try {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData),
            };

            const res = await fetch(`${gPRODUCT_API_URL}/${productId}`, requestOptions);
            const resObj = await res.json();

            if (!res.ok) {
                throw new Error(`${resObj.message}, status: ${res.status}`);
            }

            return dispatch({
                type: UPDATE_PRODUCT_SUCCESS,
                data: resObj.data,
                status: resObj.status,
            });
        } catch (err) {
            return dispatch({
                type: UPDATE_PRODUCT_ERROR,
                error: err,
            });
        }
    };
}

//Valid Product
export const validateProduct = (product) => {
    const { name, brand, description, type, imageUrl, buyPrice, promotionPrice, amount } = product;
    const result = { error: null, isValid: true };

    if (name.trim() === '') {
        result.errors = 'Name must not be empty';
        result.isValid = false;
        return result;
    }
    if (brand.trim() === '') {
        result.errors = 'Brand must not be empty';
        result.isValid = false;
        return result
    }
    if (description.trim() === '') {
        result.errors = 'Description must not be empty';
        result.isValid = false;
        return result
    }
    if (type.trim() === '') {
        errors = 'Type must not be empty';
        result.isValid = false;
        return result
    }
    if (imageUrl.trim() === '') {
        result.errors = 'Image URL must not be empty';
        result.isValid = false;
        return result
    }
    if (isNaN(parseFloat(buyPrice)) || parseFloat(buyPrice) <= 0) {
        result.errors = 'Buy price must be a number greater than 0';
        result.isValid = false;
        return result
    }
    if (isNaN(parseFloat(promotionPrice)) || parseFloat(promotionPrice) <= 0) {
        result.errors = 'Promotion price must be a number greater than 0';
        result.isValid = false;
        return result
    }
    if (isNaN(parseInt(amount)) || parseInt(amount) < 0) {
        result.errors = 'Amount must be an integer greater than or equal to 0';
        result.isValid = false;
        return result
    }
    return result
}

//Create new product
export const createNewProduct = (productData) => {
    return async (dispatch) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(productData)
        };

        await dispatch({
            type: CREATE_PRODUCT_PENDING
        });

        try {
            const res = await fetch(gPRODUCT_API_URL, requestOptions);
            const resObj = await res.json();
            if (!res.ok) {
                return dispatch({
                    type: CREATE_PRODUCT_ERROR,
                })
            }
            return dispatch({
                type: CREATE_PRODUCT_SUCCESS,
                data: resObj.data
            })
        } catch (err) {
            return dispatch({
                type: CREATE_PRODUCT_ERROR,
                error: err
            })
        }
    }
}


//set Page
export const setPage = (page) => {
    return {
        type: SET_PAGE,
        payload: page
    }
}

//set SortBy
export const setSortBy = (SortBy) => {
    return {
        type: SET_SORT_BY,
        payload: SortBy
    }
}
//set sortOrder
export const setSortOrder = (sortOrder) => {
    return {
        type: SET_SORT_ORDER,
        payload: sortOrder
    }
}
//set Gender
export const setGender = (gender) => {
    return {
        type: SET_GENDER,
        payload: gender
    }
}
//set Brand
export const setBrand = (brand) => {
    return {
        type: SET_BRAND,
        payload: brand
    }
}
//set Category
export const setCategory = (category) => {
    return {
        type: SET_CATEGORY,
        payload: category
    }
}
//set MinPrice
export const setMinPrice = (minPrice) => {
    return {
        type: SET_MIN_PRICE,
        payload: minPrice
    }
}
//set MaxPrice
export const setMaxPrice = (maxPrice) => {
    return {
        type: SET_MAX_PRICE,
        payload: maxPrice
    }
}

//Reset Condition
export const resetCondition = () => {
    return {
        type: RESET_CONDITION,
    }
}
