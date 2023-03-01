import {
    FETCH_PRODUCTS_ERROR,
    FETCH_PRODUCTS_PENDING,
    FETCH_PRODUCTS_SUCCESS,

    GET_PRODUCT_BY_ID_ERROR,
    GET_PRODUCT_BY_ID_PENDING,
    GET_PRODUCT_BY_ID_SUCCESS,

    DELETE_PRODUCT_ERROR,
    DELETE_PRODUCT_PENDING,
    DELETE_PRODUCT_SUCCESS,

    UPDATE_PRODUCT_PENDING,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_ERROR,
} from "../constants/product.constants";

const gPRODUCT_API_URL = "//localhost:8000/products"

//Get all product
export const getAllProduct = (paramLimit, paramPage, paramCondition) => {

    // build the request string
    let condition = encodeURIComponent(JSON.stringify(paramCondition ? paramCondition : {}));
    const request = `limit=${paramLimit}&page=${paramPage}&condition=${condition}`

    // options for the fetch request
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return async (dispatch) => {
        try {
            // dispatch pending state to update the UI
            await dispatch({
                type: FETCH_PRODUCTS_PENDING
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
                type: FETCH_PRODUCTS_SUCCESS,
                totalProduct: resObj.totalCount,
                products: resObj.data
            })

        } catch (err) {
            //if error
            return dispatch({
                type: FETCH_PRODUCTS_ERROR,
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
    // validate data
    const errors = validateProduct(productData);
    if (errors) {
        return {
            type: UPDATE_PRODUCT_ERROR,
            error: errors,
        }
    }
    return async (dispatch) => {
        //call PUT API 
        try {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData),
            };

            await dispatch({
                type: UPDATE_PRODUCT_PENDING,
            });

            const res = await fetch(`${gPRODUCT_API_URL}/${productId}`, requestOptions);
            const resObj = await res.json();

            if (!res.ok) {
                throw new Error(`${resObj.message}, status: ${res.status}`);
            }

            return dispatch({
                type: UPDATE_PRODUCT_SUCCESS,
                data: resObj,
            });
        } catch (err) {
            return dispatch({
                type: UPDATE_PRODUCT_ERROR,
                error: err,
            });
        }
    };
}

export const validateProduct = (product) => {
    const { name, brand, description, type, imageUrl, buyPrice, promotionPrice, amount } = product;
    const errors = [];

    if (name.trim() === '') {
        errors.push({ field: 'name', message: 'Name must not be empty' });
    }
    if (brand.trim() === '') {
        errors.push({ field: 'brand', message: 'Brand must not be empty' });
    }
    if (description.trim() === '') {
        errors.push({ field: 'description', message: 'Description must not be empty' });
    }
    if (type.trim() === '') {
        errors.push({ field: 'type', message: 'Type must not be empty' });
    }
    if (imageUrl.trim() === '') {
        errors.push({ field: 'imageUrl', message: 'Image URL must not be empty' });
    }
    if (isNaN(parseFloat(buyPrice)) || parseFloat(buyPrice) <= 0) {
        errors.push({ field: 'buyPrice', message: 'Buy price must be a number greater than 0' });
    }
    if (isNaN(parseFloat(promotionPrice)) || parseFloat(promotionPrice) <= 0) {
        errors.push({ field: 'promotionPrice', message: 'Promotion price must be a number greater than 0' });
    }
    if (isNaN(parseInt(amount)) || parseInt(amount) < 0) {
        errors.push({ field: 'amount', message: 'Amount must be an integer greater than or equal to 0' });
    }
    return errors.length ? errors : null;
}