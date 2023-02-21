import {
    FETCH_COUNTRY_ERROR,
    FETCH_COUNTRY_PENDING,
    FETCH_COUNTRY_SUCCESS,

    GET_CITY,
    GET_ADDRESS,
    GET_COUNTRY,
    GET_FIRST_NAME,
    GET_LAST_NAME,
    GET_PHONE,
    GET_EMAIL,

    FETCH_CITY_ERROR,
    FETCH_CITY_PENDING,
    FETCH_CITY_SUCCESS,

    FETCH_CUSTOMER_ERROR,
    FETCH_CUSTOMER_PENDING,
    FETCH_CUSTOMER_SUCCESS,

    CREATE_CUSTOMER_PENDING,
    CREATE_CUSTOMER_SUCCESS,
    CREATE_CUSTOMER_ERROR,

    UPDATE_CUSTOMER_PENDING,
    UPDATE_CUSTOMER_SUCCESS,
    UPDATE_CUSTOMER_ERROR,

    DELETE_CUSTOMER_PENDING,
    DELETE_CUSTOMER_SUCCESS,
    DELETE_CUSTOMER_ERROR,
} from "../constants/customer.constants";

const gCUSTOMER_API_URL = '//localhost:8000/customers';
const gCOUNTRY_API_URL = "https://api.countrystatecity.in/v1/countries/"
// const gCOUNTRY_API_URL="https://restcountries.com/v3.1/all" 
// const gCOUNTRY_API_URL="https://countriesnow.space/api/v0.1/countries/states" 
const gMY_COUNTRY_KEY = "NjFRSUdoSm5EY2RIaE9TSTlMdHcxOExGN2QwWnJJTFVNelFQQVExVQ=="

export const fetchCustomer = (paramLimit, paramPage, paramCondition) => {
    // build the request string
    let condition = encodeURIComponent(JSON.stringify(paramCondition ? paramCondition : {}));
    const request = `limit=${paramLimit}&page=${paramPage}&condition=${condition}`

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
                type: FETCH_CUSTOMER_PENDING
            });

            //fetch Customer
            const res = await fetch(`${gCUSTOMER_API_URL}?${request}`, requestOptions);

            // throw an error if the response is not successful
            if (!res.ok) {
                throw new Error(`Could not fetch customers, status: ${res.status}`);
            }
            // parse the response as JSON
            const resObj = await res.json();

            //Dispatch state
            return dispatch({
                type: FETCH_CUSTOMER_SUCCESS,
                totalCustomer: resObj.totalCount,
                customers: resObj.data
            })

        } catch (err) {
            //if error
            return dispatch({
                type: FETCH_CUSTOMER_ERROR,
                error: err
            })
        }
    }
}

//Load cities list with REST_API
export const fetchCity = (paramIsoCountry) => {
    return async (dispatch) => {
        var headers = new Headers();
        headers.append("X-CSCAPI-KEY", gMY_COUNTRY_KEY);

        var requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        await dispatch({
            type: FETCH_CITY_PENDING
        });

        try {
            const allCitiesRes = await fetch(gCOUNTRY_API_URL + paramIsoCountry + "/cities", requestOptions);
            const allCitiesObj = await allCitiesRes.json();
            return dispatch({
                type: FETCH_CITY_SUCCESS,
                cityOptions: allCitiesObj
            })
        } catch (err) {
            return dispatch({
                type: FETCH_CITY_ERROR,
                error: err
            })
        }
    }
}

//Load country list
export const fetchCountry = () => {
    return async (dispatch) => {
        var headers = new Headers();
        headers.append("X-CSCAPI-KEY", gMY_COUNTRY_KEY);

        var requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow',
        };

        await dispatch({
            type: FETCH_COUNTRY_PENDING
        });

        try {
            const allCountriesRes = await fetch(gCOUNTRY_API_URL, requestOptions);
            const allCountriesObj = await allCountriesRes.json();
            return dispatch({
                type: FETCH_COUNTRY_SUCCESS,
                countryOptions: allCountriesObj
            })
        } catch (err) {
            return dispatch({
                type: FETCH_COUNTRY_ERROR,
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
        type:  GET_FIRST_NAME,
        firstName: paramFirstName,
    }
}

//get lastName 
export const getLastName = (paramLastName) => {
    return {
        type:   GET_LAST_NAME,
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
        type:  GET_PHONE,
        phone: paramPhone,
    }
}


//Create new customer
export const createNewCustomer = (customerData) => {

    const isValid = validateCustomer(customerData)

    if (isValid) {
        return async (dispatch) => {
            const requestOptions = {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(customerData)
            };

            await dispatch({
                type: CREATE_CUSTOMER_PENDING
            });

            try {
                const res = await fetch(gCUSTOMER_API_URL, requestOptions);
                const resObj = await res.json();
                if (!res.ok) {
                    return dispatch({
                        type: CREATE_CUSTOMER_ERROR,
                    })
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
}

// Update customer
export const updateCustomer = async (paramCustomer) => {
    // get customer info
    const customerInfo = await getCustomerInfo(paramCustomer);
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
export const deleteCustomer = (paramCustomerId) => {
    return async (dispatch) => {
        const requestOptions = {
            method: 'DELETE',
        };

        await dispatch({
            type: DELETE_CUSTOMER_PENDING
        });

        try {
            const res = await fetch(gCUSTOMER_API_URL+`/${paramCustomerId}`, requestOptions);
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
export const getCustomerInfo = (paramCustomer) => {
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
