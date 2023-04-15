import {
    LOAD_COUNTRY_ERROR,
    LOAD_COUNTRY_PENDING,
    LOAD_COUNTRY_SUCCESS,

    GET_CITY,
    GET_ADDRESS,
    GET_COUNTRY,
    GET_FIRST_NAME,
    GET_LAST_NAME,
    GET_PHONE,
    GET_EMAIL,

    LOAD_CITY_ERROR,
    LOAD_CITY_PENDING,
    LOAD_CITY_SUCCESS,

    LOAD_CUSTOMER_ERROR,
    LOAD_CUSTOMER_PENDING,
    LOAD_CUSTOMER_SUCCESS,

    CREATE_CUSTOMER_PENDING,
    CREATE_CUSTOMER_SUCCESS,
    CREATE_CUSTOMER_ERROR,

    UPDATE_CUSTOMER_PENDING,
    UPDATE_CUSTOMER_SUCCESS,
    UPDATE_CUSTOMER_ERROR,

    DELETE_CUSTOMER_PENDING,
    DELETE_CUSTOMER_SUCCESS,
    DELETE_CUSTOMER_ERROR,

    GET_CUSTOMER_BY_ID_PENDING,
    GET_CUSTOMER_BY_ID_SUCCESS,
    GET_CUSTOMER_BY_ID_ERROR,

    UPDATE_NEW_CUSTOMER,
    UPDATE_CUSTOMER_SEARCH_QUERY,
    SET_SORT_BY,
    SET_SORT_ORDER
} from "../constants/customer.constants";

const gCUSTOMER_API_URL = '//localhost:8000/customers';
const gCOUNTRY_API_URL = "https://api.countrystatecity.in/v1/countries/"
const gMY_COUNTRY_KEY = "NjFRSUdoSm5EY2RIaE9TSTlMdHcxOExGN2QwWnJJTFVNelFQQVExVQ=="

//Get All Customer
export const getAllCustomer = ({rowsPerPage, page, searchQuery,sortBy,sortOrder}) => {
    // build the request string
    const request = `limit=${rowsPerPage}&page=${page}&searchQuery=${searchQuery}&sortBy=${sortBy}&sortOrder=${sortOrder}`

    // options for the fetch request
    const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        credentials: 'include'
    };

    return async (dispatch) => {
        try {
            // dispatch pending state to update the UI
            await dispatch({
                type: LOAD_CUSTOMER_PENDING
            });

            //fetch Customer
            const res = await fetch(`${gCUSTOMER_API_URL}?${request}`, requestOptions);

            // throw an error if the response is not successful
            if (!res.ok) {
                throw new Error(`Could not load customers, status: ${res.status}`);
            }
            // parse the response as JSON
            const resObj = await res.json();

            //Dispatch state
            return dispatch({
                type: LOAD_CUSTOMER_SUCCESS,
                totalCustomer: resObj.totalCount,
                customers: resObj.data
            })

        } catch (err) {
            //if error
            console.log(err)
            return dispatch({
                type: LOAD_CUSTOMER_ERROR,
                error: err
            })
        }
    }
}

//Update Value Of New Customer To Reducer
// input: updateData={[name]:value}
export const updateNewCustomer = (updatedData) => {
    return {
        type: UPDATE_NEW_CUSTOMER,
        payload: updatedData
    }
}

//Load cities list with REST_API
export const loadCities = (paramIsoCountry) => {
    return async (dispatch) => {
        var headers = new Headers();
        headers.append("X-CSCAPI-KEY", gMY_COUNTRY_KEY);

        var requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        await dispatch({
            type: LOAD_CITY_PENDING
        });

        try {
            const allCitiesRes = await fetch(gCOUNTRY_API_URL + paramIsoCountry + "/cities", requestOptions);
            const allCitiesObj = await allCitiesRes.json();
            return dispatch({
                type: LOAD_CITY_SUCCESS,
                cityOptions: allCitiesObj
            })
        } catch (err) {
            return dispatch({
                type: LOAD_CITY_ERROR,
                error: err
            })
        }
    }
}

//Load country list
export const loadCountries = () => {
    return async (dispatch) => {
        var headers = new Headers();
        headers.append("X-CSCAPI-KEY", gMY_COUNTRY_KEY);

        var requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow',
        };

        await dispatch({
            type: LOAD_COUNTRY_PENDING
        });

        try {
            const allCountriesRes = await fetch(gCOUNTRY_API_URL, requestOptions);
            const allCountriesObj = await allCountriesRes.json();
            return dispatch({
                type: LOAD_COUNTRY_SUCCESS,
                countryOptions: allCountriesObj
            })
        } catch (err) {

            return dispatch({
                type: LOAD_COUNTRY_ERROR,
                error: err
            })
        }
    }
}

//get country name
export const getCountry = (paramCountry) => {
    return {
        type: GET_COUNTRY,
        country: paramCountry,
    }
}

//get city name
export const getCity = (paramCity) => {
    return {
        type: GET_CITY,
        city: paramCity
    }
}

//get address 
export const getAddress = (paramAddress) => {
    return {
        type: GET_ADDRESS,
        address: paramAddress,
    }
}

//get firstName 
export const getFirstName = (paramFirstName) => {
    return {
        type: GET_FIRST_NAME,
        firstName: paramFirstName,
    }
}

//get lastName 
export const getLastName = (paramLastName) => {
    return {
        type: GET_LAST_NAME,
        lastName: paramLastName,
    }
}

//get email 
export const getEmail = (paramEmail) => {
    return {
        type: GET_EMAIL,
        email: paramEmail,
    }
}

//get phone 
export const getPhone = (paramPhone) => {
    return {
        type: GET_PHONE,
        phone: paramPhone,
    }
}


//Create new customer
export const createNewCustomer = (newCustomer) => {
    return async (dispatch) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(newCustomer)
        };

        await dispatch({
            type: CREATE_CUSTOMER_PENDING
        });

        try {
            const res = await fetch(gCUSTOMER_API_URL, requestOptions);
            const resObj = await res.json();
            if (!res.ok) {
                throw new Error(`Could not create customer, status: ${res.status}`);
            }
            return dispatch({
                type: CREATE_CUSTOMER_SUCCESS,
                data: resObj.data
            })
        } catch (err) {
            return dispatch({
                type: CREATE_CUSTOMER_ERROR,
                error: err
            })
        }
    }
}

// Update customer
export const updateCustomer = async (customer) => {
    // get customer info
    const customerInfo = await getCustomerInfo(customer);
    // validate data
    const isValid = await validateCustomer(customerInfo);
    //call PUT API 
    if (isValid) {
        return async (dispatch) => {
            const requestOptions = {
                method: 'PUT',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(customerInfo),
            };

            await dispatch({
                type: UPDATE_CUSTOMER_PENDING,
            });

            try {
                const res = await fetch(gCUSTOMER_API_URL, requestOptions);
                const resObj = await res.json();

                if (!res.ok) {
                    return dispatch({
                        type: UPDATE_CUSTOMER_ERROR,
                    });
                }

                return dispatch({
                    type: UPDATE_CUSTOMER_SUCCESS,
                    data: resObj,
                });
            } catch (err) {
                return dispatch({
                    type: UPDATE_CUSTOMER_ERROR,
                    error: err,
                });
            }
        };
    }
    return isValid;
};

//Delete customer
export const deleteCustomerById = (customerId) => {
    return async (dispatch) => {
        const requestOptions = {
            method: 'DELETE',
        };

        await dispatch({
            type: DELETE_CUSTOMER_PENDING
        });

        try {
            const res = await fetch(gCUSTOMER_API_URL + `/${customerId}`, requestOptions);
            const resObj = await res.json();
            if (!res.ok) {
                return dispatch({
                    type: DELETE_CUSTOMER_ERROR,
                })
            }
            return dispatch({
                type: DELETE_CUSTOMER_SUCCESS,
            })
        } catch (err) {
            console.log(err)
        }
    }
}

//Get Customer Information 
export const getCustomerInfo = (customer) => {
    return {
        email: customer.get('email'),
        phone: customer.get('phone'),
        firstName: customer.get('firstName'),
        lastName: customer.get('lastName'),
        country: customer.get('country'),
        city: customer.get('city'),
        address: customer.get('address'),
    }
}

//Valid date Customer Input
export const validateCustomer = (customer) => {
    if (customer.firstName.trim() === "") {
        alert("You have entered an invalid First Name")
        return false
    }
    if (customer.lastName.trim() === "") {
        alert("You have entered an invalid Fast Name")
        return false
    }
    if (!validatePhone(customer.phone)) {
        alert("You have entered an invalid Phone!")
        return false
    }
    if (!validateEmail(customer.email)) {
        alert("You have entered an invalid Email!")
        return false
    }
    if (customer.country.trim() === "") {
        alert("You have entered an invalid Country")
        return false
    }
    if (customer.city.trim() === "") {
        alert("You have entered an invalid City")
        return false
    }
    if (customer.address.trim() === "") {
        alert("You have entered an invalid Address")
        return false
    }
    return true
}

//Valid Email
export const validateEmail = (paramEmail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(paramEmail)) {
        return (true)
    }
    return (false)
}

// Validate Phone Number
export const validatePhone = (paramPhone) => {
    var phone = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    if ((paramPhone.match(phone))) {
        return true;
    }
    else {
        return false;
    }
}

//Get Customer By Id
export const getCustomerById = (customerId) => {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return async (dispatch) => {
        try {
            // dispatch pending state to update the UI
            await dispatch({
                type: GET_CUSTOMER_BY_ID_PENDING
            });

            //fetch Customer
            const res = await fetch(`${gCUSTOMER_API_URL}/${customerId}`, requestOptions);

            // throw an error if the response is not successful
            if (!res.ok) {
                throw new Error(`Could get customer By Id, status: ${res.status}`);
            }
            // parse the response as JSON
            const resObj = await res.json();

            //Dispatch state
            return dispatch({
                type: GET_CUSTOMER_BY_ID_SUCCESS,
                payload: resObj.data
            })

        } catch (err) {
            //if error
            return dispatch({
                type: GET_CUSTOMER_BY_ID_ERROR,
                payload: err
            })
        }
    }
}

//update searchQuey to load Customer
//input: searchQuey ="string"
export const updateCustomerSearchQuery = (searchQuey) => {
    return {
        type: UPDATE_CUSTOMER_SEARCH_QUERY,
        payload: searchQuey
    }
}

//Set sort By
export const setSortBy = (sortBy) => {
    return {
        type: SET_SORT_BY,
        payload: sortBy
    }
}

//Set sort By
export const setSortOrder = (sortOrder) => {
    return {
        type: SET_SORT_ORDER,
        payload: sortOrder
    }
}