import {
    FETCH_CUSTOMERS_ERROR,
    FETCH_CUSTOMERS_PENDING,
    FETCH_CUSTOMERS_SUCCESS,
} from "../constants/customer.constants";

export const fetchCustomer = (paramLimit, paramPage) => {
    return async (dispatch) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        await dispatch({
            type: FETCH_CUSTOMERS_PENDING
        });

        try {
            //get customer total count 
            const allRes = await fetch("//localhost:8000/customers", requestOptions);
            const allObj = await allRes.json();

            //get customer with pagination 
            const limitRes = await fetch("//localhost:8000/customers?limit=" + paramLimit + "&page=" + paramPage, requestOptions);
            const limitObj = await limitRes.json();

            //Dispatch state
            return dispatch({
                type: FETCH_CUSTOMERS_SUCCESS,
                totalCustomer: allObj.data.length,
                customers: limitObj.data
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