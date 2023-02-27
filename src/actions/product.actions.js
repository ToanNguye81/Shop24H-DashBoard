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
} from "../constants/product.constants";

const gPRODUCT_API_URL = "//localhost:8000/products"

export const getAllProduct = (paramLimit, paramPage, paramCondition,paramSortBy,paramSortOrder) => {
    // build the request string
    let condition = encodeURIComponent(JSON.stringify(paramCondition ? paramCondition : {}));
    const request = `limit=${paramLimit}&page=${paramPage}&condition=${condition}&sortBy=${paramSortBy}&sortOrder=${paramSortOrder}`

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

            //fetch PgetAllProduct
            const res = await fetch(`${gPRODUCT_API_URL}?${request}`, requestOptions);

            // throw an error if the response is not successful
            if (!res.ok) {
                throw new Error(`Could not find products, status: ${res.status}`);
            }
            // parse the response as JSON
            const resObj = await res.json();
            

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

            //fetch Order
            const res = await fetch(`${gPRODUCT_API_URL}/${productId}`, requestOptions);

            // throw an error if the response is not successful
            if (!res.ok) {
                throw new Error(`Could get product By Id, status: ${res.status}`);
            }
            // parse the response as JSON
            const resObj = await res.json();
            console.log(resObj)
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
