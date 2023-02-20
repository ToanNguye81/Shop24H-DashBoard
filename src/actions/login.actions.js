import jwtDecode from 'jwt-decode';
import { AUTHENTICATED, LOGOUT } from '../constants/login.constants';

export const authenticate = (email, password) => {
    return async dispatch => {
        try {
            // Make an API call to your server to get the token
            //   const response = await fetch('//api/auth/login', {
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
    return dispatch => {
        dispatch({ type: LOGOUT });
    };
};