import {
    FETCH_PRODUCTS_ERROR,
    FETCH_PRODUCTS_PENDING,
    FETCH_PRODUCTS_SUCCESS,
} from "../constants/product.constants";

export const fetchProduct = (paramLimit, paramPage) => {
    return async (dispatch) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        await dispatch({
            type: FETCH_PRODUCTS_PENDING
        });

        try {
            //get product total count 
            const allRes = await fetch("//localhost:8000/products", requestOptions);
            const allObj = await allRes.json();
            console.log(allObj.products.length)

            //get product with pagination 
            const limitRes = await fetch("//localhost:8000/products?limit=" + paramLimit + "&page=" + paramPage, requestOptions);
            const limitObj = await limitRes.json();
            console.log(limitObj.products)

            //Dispatch state
            return dispatch({
                type: FETCH_PRODUCTS_SUCCESS,
                totalProduct: allObj.products.length,
                products: limitObj.products
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