import Cookies from "js-cookie";
import { AUTHENTICATED, LOGOUT } from "../constants/login.constants";

const initialState = {
  isAuthenticated: Cookies.get("isAuth"),
  token: Cookies.get("token"),
  userName: Cookies.get("userName"),
  email: Cookies.get("email"),
  role: Cookies.get("role")
};

export default function loginReducers(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true,
        token: action.token,
        userName: action.user.userName,
        email: action.user.email,
        role: action.user.role,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        userName: null,
        email: null,
        role: null,
      }
    default:
      return { ...state };
  }
};
