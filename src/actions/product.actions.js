import {
    FETCH_PRODUCTS_ERROR,
    FETCH_PRODUCTS_PENDING,
    FETCH_PRODUCTS_SUCCESS,
} from "../constants/product.constants";

const gPRODUCT_API_URL = "//localhost:8000/products"

// export const fetchProduct = (paramLimit, paramPage) => {
//     return async (dispatch) => {
//         var requestOptions = {
//             method: 'GET',
//             redirect: 'follow'
//         };

//         await dispatch({
//             type: FETCH_PRODUCTS_PENDING
//         });

//         try {
//             //get product total count 
//             const allRes = await fetch("//localhost:8000/products", requestOptions);
//             const allObj = await allRes.json();
//             console.log(allObj.products.length)

//             //get product with pagination 
//             const limitRes = await fetch("//localhost:8000/products?limit=" + paramLimit + "&page=" + paramPage, requestOptions);
//             const limitObj = await limitRes.json();
//             console.log(limitObj.products)

//             //Dispatch state
//             return dispatch({
//                 type: FETCH_PRODUCTS_SUCCESS,
//                 totalProduct: allObj.products.length,
//                 products: limitObj.products
//             })

//         } catch (err) {
//             //if error
//             return dispatch({
//                 type: FETCH_PRODUCTS_ERROR,
//                 error: err
//             })
//         }
//     }
// }

export const fetchProduct = (paramLimit, paramPage, paramCondition,paramSortBy,paramSortOrder) => {
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

            //fetch PfetchProduct
            const res = await fetch(`${gPRODUCT_API_URL}?${request}`, requestOptions);

            // throw an error if the response is not successful
            if (!res.ok) {
                throw new Error(`Could not find products, status: ${res.status}`);
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
