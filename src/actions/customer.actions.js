import {
    FETCH_CUSTOMERS_ERROR,
    FETCH_CUSTOMERS_PENDING,
    FETCH_CUSTOMERS_SUCCESS,
} from "../constants/customer.constants";
const gCUSTOMERS_API_URL = '//localhost:8000/customers';


export const fetchCustomer = (paramLimit, paramPage, paramCondition) => {
    // build the request string
    let condition = encodeURIComponent(JSON.stringify(paramCondition?paramCondition:{}));
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
                type: FETCH_CUSTOMERS_PENDING
            }); 

            //fetch Customer
            const res = await fetch(`${gCUSTOMERS_API_URL}?${request}`, requestOptions);

            // throw an error if the response is not successful
            if (!res.ok) {
                throw new Error(`Could not fetch customers, status: ${res.status}`);
            }
            // parse the response as JSON
            const resObj = await res.json();

            //Dispatch state
            return dispatch({
                type: FETCH_CUSTOMERS_SUCCESS,
                totalCustomer: resObj.totalCount,
                customers: resObj.data
            })

        } catch (err) {
            //if error
            return dispatch({
                type: FETCH_CUSTOMERS_ERROR,
                error: err
            })
        }
    }
}