import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { AUTHENTICATED, LOGOUT } from '../constants/login.constants';

export const authenticate = (email, password) => {
    return async dispatch => {
        try {
            // Make an API call to your server to get the token
            const response = await fetch('//localhost:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            const token = data.token;

            // Decode the token to get the user data
            const user = jwtDecode(token);
            // set Cookie
            Cookies.set("token", token)
            Cookies.set("isAuth", true)
            Cookies.set("userName", user.userName)
            Cookies.set("email", user.email)
            Cookies.set("role", user.role)
            // Set the token and user data in the store
            dispatch({
                type: AUTHENTICATED,
                token,
                user
            });
        } catch (error) {
            console.error(error.message);
            alert(error.message)
        }
    };
};

export const logout = () => {
    Cookies.remove("token")
    Cookies.remove("isAuth")
    Cookies.remove("userName")
    Cookies.remove("email")
    Cookies.remove("role")
    return dispatch => {
        dispatch({ type: LOGOUT });
    };

    // return async dispatch => {
    //     try {   
    //         // Make an API call to your server to get the token
    //         //   const response = await fetch('//api/auth/login', {
    //         const res = await fetch('//localhost:8000/users', {
    //             method: 'GET',
    //             credentials: 'include'
    //         });
    //         const resObj = await res.json();
    //         // const token = data.token;
    //         console.log(resObj)
    //         if (!res.ok) {
    //           return dispatch({
    //             //Crasdaf
    //           });
    //         }
    //     } catch (error) {
    //         console.error(error.message);
    //         alert(error.message)
    //     }
    // };
};