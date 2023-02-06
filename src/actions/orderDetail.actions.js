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

    FETCH_ORDER_DETAILS_ERROR,
    FETCH_ORDER_DETAILS_PENDING,
    FETCH_ORDER_DETAILS_SUCCESS,

    CREATE_ORDER_DETAIL_PENDING,
    CREATE_ORDER_DETAIL_SUCCESS,
    CREATE_ORDER_DETAIL_ERROR,

    UPDATE_ORDER_DETAIL_PENDING,
    UPDATE_ORDER_DETAIL_SUCCESS,
    UPDATE_ORDER_DETAIL_ERROR,

    DELETE_ORDER_DETAIL_PENDING,
    DELETE_ORDER_DETAIL_SUCCESS,
    DELETE_ORDER_DETAIL_ERROR,
} from "../constants/orderDetail.constants";

const gORDER_DETAILS_API_URL = '//localhost:8000/orderDetails';
const gCOUNTRY_API_URL = "https://api.countrystatecity.in/v1/countries/"
// const gCOUNTRY_API_URL="https://restcountries.com/v3.1/all" 
// const gCOUNTRY_API_URL="https://countriesnow.space/api/v0.1/countries/states" 
const gMY_COUNTRY_KEY = "NjFRSUdoSm5EY2RIaE9TSTlMdHcxOExGN2QwWnJJTFVNelFQQVExVQ=="

export const fetchOrderDetail = (paramLimit, paramPage, paramCondition) => {
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
                type: FETCH_ORDER_DETAILS_PENDING
            });

            //fetch OrderDetail
            const res = await fetch(`${gORDER_DETAILS_API_URL}?${request}`, requestOptions);

            // throw an error if the response is not successful
            if (!res.ok) {
                throw new Error(`Could not fetch orderDetails, status: ${res.status}`);
            }
            // parse the response as JSON
            const resObj = await res.json();
            console.log(resObj)

            //Dispatch state
            return dispatch({
                type: FETCH_ORDER_DETAILS_SUCCESS,
                totalOrderDetail: resObj.totalCount,
                orderDetails: resObj.data
            })

        } catch (err) {
            //if error
            return dispatch({
                type: FETCH_ORDER_DETAILS_ERROR,
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

//Create new orderDetail
export const createNewOrderDetail = (paramOrderDetail) => {

    const orderDetailInfo = getOrderDetailInfo(paramOrderDetail)

    const isValid = validateOrderDetail(orderDetailInfo)

    if (isValid) {
        return async (dispatch) => {
            const requestOptions = {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(orderDetailInfo)
            };

            await dispatch({
                type: CREATE_ORDER_DETAIL_PENDING
            });

            try {
                const res = await fetch(gORDER_DETAILS_API_URL, requestOptions);
                const resObj = await res.json();
                console.log(res.ok)
                if (!res.ok) {
                    return dispatch({
                        type: CREATE_ORDER_DETAIL_ERROR,
                    })
                }
                console.log(resObj)
                return dispatch({
                    type: CREATE_ORDER_DETAIL_SUCCESS,
                    data: resObj
                })
            } catch (err) {
                return dispatch({
                    type: CREATE_ORDER_DETAIL_ERROR,
                    error: err
                })
            }
        }
    }
}

// Update orderDetail
export const updateOrderDetail = async (paramOrderDetail) => {
    // get orderDetail info
    const orderDetailInfo = await getOrderDetailInfo(paramOrderDetail);
    // validate data
    const isValid = await validateOrderDetail(orderDetailInfo);
    //call PUT API 
    if (isValid) {
      return async (dispatch) => {
        const requestOptions = {
          method: 'PUT',
          headers: {
            "Content-Type": 'application/json',
          },
          body: JSON.stringify(orderDetailInfo),
        };
  
        await dispatch({
          type: UPDATE_ORDER_DETAIL_PENDING,
        });
  
        try {
          const res = await fetch(gORDER_DETAILS_API_URL, requestOptions);
          const resObj = await res.json();
  
          if (!res.ok) {
            return dispatch({
              type: UPDATE_ORDER_DETAIL_ERROR,
            });
          }
  
          return dispatch({
            type: UPDATE_ORDER_DETAIL_SUCCESS,
            data: resObj,
          });
        } catch (err) {
          return dispatch({
            type: UPDATE_ORDER_DETAIL_ERROR,
            error: err,
          });
        }
      };
    }
    return isValid;
  };

//Delete orderDetail
export const deleteOrderDetail = (paramOrderDetailId) => {
    return async (dispatch) => {
        const requestOptions = {
            method: 'DELETE',
        };

        await dispatch({
            type: DELETE_ORDER_DETAIL_PENDING
        });

        try {
            const res = await fetch(gORDER_DETAILS_API_URL+`/${paramOrderDetailId}`, requestOptions);
            const resObj = await res.json();
            console.log(res.ok)
            if (!res.ok) {
                return dispatch({
                    type: DELETE_ORDER_DETAIL_ERROR,
                })
            }
            console.log(resObj)
            return dispatch({
                type: DELETE_ORDER_DETAIL_SUCCESS,
            })
        } catch (err) {
            console.log(err)
        }
    }
}

//Get OrderDetail Information 
export const getOrderDetailInfo = (paramOrderDetail) => {
    return {
        email: paramOrderDetail.get('email'),
        phone: paramOrderDetail.get('phone'),
        firstName: paramOrderDetail.get('firstName'),
        lastName: paramOrderDetail.get('lastName'),
        country: paramOrderDetail.get('country'),
        city: paramOrderDetail.get('city'),
        address: paramOrderDetail.get('address'),
    }
}

//Valid date OrderDetail Input
export const validateOrderDetail = (paramOrderDetail) => {
    if (paramOrderDetail.firstName.trim() === "") {
        alert("You have entered an invalid First Name")
        return false
    }
    if (paramOrderDetail.lastName.trim() === "") {
        alert("You have entered an invalid Fast Name")
        return false
    }
    if (!validatePhone(paramOrderDetail.phone)) {
        alert("You have entered an invalid Phone!")
        return false
    }
    if (!validateEmail(paramOrderDetail.email)) {
        alert("You have entered an invalid Email!")
        return false
    }
    if (paramOrderDetail.country.trim() === "") {
        alert("You have entered an invalid Country")
        return false
    }
    if (paramOrderDetail.city.trim() === "") {
        alert("You have entered an invalid City")
        return false
    }
    if (paramOrderDetail.address.trim() === "") {
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
