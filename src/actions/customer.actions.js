import {
    FETCH_CUSTOMERS_ERROR,
    FETCH_CUSTOMERS_PENDING,
    FETCH_CUSTOMERS_SUCCESS,

    FETCH_COUNTRIES_ERROR,
    FETCH_COUNTRIES_PENDING,
    FETCH_COUNTRIES_SUCCESS,
    
    GET_CITY,
    GET_ADDRESS,
    GET_COUNTRY,
    
    FETCH_CITIES_ERROR,
    FETCH_CITIES_PENDING,
    FETCH_CITIES_SUCCESS,
    
    CREATE_CUSTOMER_PENDING,
    CREATE_CUSTOMER_SUCCESS,
    CREATE_CUSTOMER_ERROR,
} from "../constants/customer.constants";

const gCUSTOMERS_API_URL = '//localhost:8000/customers';
const gCOUNTRY_API_URL = "https://api.countrystatecity.in/v1/countries/"
// const gCOUNTRY_API_URL="https://restcountries.com/v3.1/all" 
// const gCOUNTRY_API_URL="https://countriesnow.space/api/v0.1/countries/states" 
const gMY_COUNTRY_KEY = "NjFRSUdoSm5EY2RIaE9TSTlMdHcxOExGN2QwWnJJTFVNelFQQVExVQ=="

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



//Load cities list with REST_API
export const fetchCities = (paramIsoCountry) => {
    return async (dispatch) => {
        var headers = new Headers();
        headers.append("X-CSCAPI-KEY", gMY_COUNTRY_KEY);

        var requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        await dispatch({
            type: FETCH_CITIES_PENDING
        });

        try {
            const allCitiesRes = await fetch(gCOUNTRY_API_URL + paramIsoCountry + "/cities", requestOptions);
            const allCitiesObj = await allCitiesRes.json();
            console.log(allCitiesObj)
            return dispatch({
                type: FETCH_CITIES_SUCCESS,
                cityOptions: allCitiesObj
            })
        } catch (err) {
            return dispatch({
                type: FETCH_CITIES_ERROR,
                error: err
            })
        }
    }
}

//Load country list
export const fetchCountries = () => {
    return async (dispatch) => {
        var headers = new Headers();
        headers.append("X-CSCAPI-KEY", gMY_COUNTRY_KEY);

        var requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        await dispatch({
            type: FETCH_COUNTRIES_PENDING
        });

        try {
            const allCountriesRes = await fetch(gCOUNTRY_API_URL, requestOptions);
            const allCountriesObj = await allCountriesRes.json();
            return dispatch({
                type: FETCH_COUNTRIES_SUCCESS,
                countryOptions: allCountriesObj
            })
        } catch (err) {
            return dispatch({
                type: FETCH_COUNTRIES_ERROR,
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

//Create new customer
export const createNewCustomer = (paramCustomer) => {

    const customerInfo = getCustomerInfo(paramCustomer)

    const isValid = validateCustomer(customerInfo)

    if (isValid) {
        return async (dispatch) => {
            const requestOptions = {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(customerInfo)
            };

            await dispatch({
                type: CREATE_CUSTOMER_PENDING
            });

            try {
                const res = await fetch(gCUSTOMERS_API_URL, requestOptions);
                const resObj = await res.json();
                console.log(res.ok)
                if (!res.ok) {
                    return dispatch({
                        type: CREATE_CUSTOMER_ERROR,
                    })
                }
                console.log(resObj)
                return dispatch({
                    type: CREATE_CUSTOMER_SUCCESS,
                    data: resObj
                })
            } catch (err) {
                return dispatch({
                    type: CREATE_CUSTOMER_ERROR,
                    error: err
                })
            }
        }
    }
}

//Get Customer Information 
const getCustomerInfo = (paramCustomer) => {
    return {
        email: paramCustomer.get('email'),
        phone: paramCustomer.get('phone'),
        firstName: paramCustomer.get('firstName'),
        lastName: paramCustomer.get('lastName'),
        country: paramCustomer.get('country'),
        city: paramCustomer.get('city'),
        address: paramCustomer.get('address'),
    }
}

//Valid date Customer Input
export const validateCustomer = (paramCustomer) => {
    if (paramCustomer.firstName.trim() === "") {
        alert("You have entered an invalid First Name")
        return false
    }
    if (paramCustomer.lastName.trim() === "") {
        alert("You have entered an invalid Fast Name")
        return false
    }
    if (!validatePhone(paramCustomer.phone)) {
        alert("You have entered an invalid Phone!")
        return false
    }
    if (!validateEmail(paramCustomer.email)) {
        alert("You have entered an invalid Email!")
        return false
    }
    if (paramCustomer.country.trim() === "") {
        alert("You have entered an invalid Country")
        return false
    }
    if (paramCustomer.city.trim() === "") {
        alert("You have entered an invalid City")
        return false
    }
    if (paramCustomer.address.trim() === "") {
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
