import {
    FETCH_COUNTRIES_ERROR,
    FETCH_COUNTRIES_PENDING,
    FETCH_COUNTRIES_SUCCESS,

    GET_CITY,
    GET_ADDRESS,
    GET_COUNTRY,

    FETCH_CITIES_ERROR,
    FETCH_CITIES_PENDING,
    FETCH_CITIES_SUCCESS,

    FETCH_ORDERS_ERROR,
    FETCH_ORDERS_PENDING,
    FETCH_ORDERS_SUCCESS,

    CREATE_ORDER_PENDING,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_ERROR,

    UPDATE_ORDER_PENDING,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_ERROR,

    DELETE_ORDER_PENDING,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_ERROR,
} from "../constants/order.constants";

const gORDERS_API_URL = '//localhost:8000/orders';
const gCOUNTRY_API_URL = "https://api.countrystatecity.in/v1/countries/"
// const gCOUNTRY_API_URL="https://restcountries.com/v3.1/all" 
// const gCOUNTRY_API_URL="https://countriesnow.space/api/v0.1/countries/states" 
const gMY_COUNTRY_KEY = "NjFRSUdoSm5EY2RIaE9TSTlMdHcxOExGN2QwWnJJTFVNelFQQVExVQ=="

export const fetchOrder = (paramLimit, paramPage, paramCondition) => {
    // build the request string
    let condition = encodeURIComponent(JSON.stringify(paramCondition ? paramCondition : {}));
    const request = `limit=${paramLimit}&page=${paramPage}&condition=${condition}`
    console.log(paramLimit, paramPage, paramCondition)
    // options for the fetch request
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return async (dispatch) => {
        try {
            // dispatch pending state to update the UI
            await dispatch({
                type: FETCH_ORDERS_PENDING
            });

            //fetch Order
            const res = await fetch(`${gORDERS_API_URL}?${request}`, requestOptions);

            // throw an error if the response is not successful
            if (!res.ok) {
                throw new Error(`Could not fetch orders, status: ${res.status}`);
            }
            // parse the response as JSON
            const resObj = await res.json();

            //Dispatch state
            return dispatch({
                type: FETCH_ORDERS_SUCCESS,
                totalOrder: resObj.totalCount,
                orders: resObj.data
            })

        } catch (err) {
            //if error
            return dispatch({
                type: FETCH_ORDERS_ERROR,
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

//Create new order
export const createNewOrder = (paramOrder) => {

    const orderInfo = getOrderInfo(paramOrder)

    const isValid = validateOrder(orderInfo)

    if (isValid) {
        return async (dispatch) => {
            const requestOptions = {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(orderInfo)
            };

            await dispatch({
                type: CREATE_ORDER_PENDING
            });

            try {
                const res = await fetch(gORDERS_API_URL, requestOptions);
                const resObj = await res.json();
                console.log(res.ok)
                if (!res.ok) {
                    return dispatch({
                        type: CREATE_ORDER_ERROR,
                    })
                }
                console.log(resObj)
                return dispatch({
                    type: CREATE_ORDER_SUCCESS,
                    data: resObj
                })
            } catch (err) {
                return dispatch({
                    type: CREATE_ORDER_ERROR,
                    error: err
                })
            }
        }
    }
}

// Update order
export const updateOrder = async (paramOrder) => {
    // get order info
    const orderInfo = await getOrderInfo(paramOrder);
    // validate data
    const isValid = await validateOrder(orderInfo);
    //call PUT API 
    if (isValid) {
      return async (dispatch) => {
        const requestOptions = {
          method: 'PUT',
          headers: {
            "Content-Type": 'application/json',
          },
          body: JSON.stringify(orderInfo),
        };
  
        await dispatch({
          type: UPDATE_ORDER_PENDING,
        });
  
        try {
          const res = await fetch(gORDERS_API_URL, requestOptions);
          const resObj = await res.json();
  
          if (!res.ok) {
            return dispatch({
              type: UPDATE_ORDER_ERROR,
            });
          }
  
          return dispatch({
            type: UPDATE_ORDER_SUCCESS,
            data: resObj,
          });
        } catch (err) {
          return dispatch({
            type: UPDATE_ORDER_ERROR,
            error: err,
          });
        }
      };
    }
    return isValid;
  };

//Delete order
export const deleteOrder = (paramOrderId) => {
    return async (dispatch) => {
        const requestOptions = {
            method: 'DELETE',
        };

        await dispatch({
            type: DELETE_ORDER_PENDING
        });

        try {
            const res = await fetch(gORDERS_API_URL+`/${paramOrderId}`, requestOptions);
            const resObj = await res.json();
            console.log(res.ok)
            if (!res.ok) {
                return dispatch({
                    type: DELETE_ORDER_ERROR,
                })
            }
            console.log(resObj)
            return dispatch({
                type: DELETE_ORDER_SUCCESS,
            })
        } catch (err) {
            console.log(err)
        }
    }
}

//Get Order Information 
export const getOrderInfo = (paramOrder) => {
    return {
        email: paramOrder.get('email'),
        phone: paramOrder.get('phone'),
        firstName: paramOrder.get('firstName'),
        lastName: paramOrder.get('lastName'),
        country: paramOrder.get('country'),
        city: paramOrder.get('city'),
        address: paramOrder.get('address'),
    }
}

//Valid date Order Input
export const validateOrder = (paramOrder) => {
    if (paramOrder.firstName.trim() === "") {
        alert("You have entered an invalid First Name")
        return false
    }
    if (paramOrder.lastName.trim() === "") {
        alert("You have entered an invalid Fast Name")
        return false
    }
    if (!validatePhone(paramOrder.phone)) {
        alert("You have entered an invalid Phone!")
        return false
    }
    if (!validateEmail(paramOrder.email)) {
        alert("You have entered an invalid Email!")
        return false
    }
    if (paramOrder.country.trim() === "") {
        alert("You have entered an invalid Country")
        return false
    }
    if (paramOrder.city.trim() === "") {
        alert("You have entered an invalid City")
        return false
    }
    if (paramOrder.address.trim() === "") {
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
