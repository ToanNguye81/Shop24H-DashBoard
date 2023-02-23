import Cookies from "js-cookie";
import { AUTHENTICATED, LOGOUT } from "../constants/login.constants";

const initialState = {
  isAuthenticated:Cookies.get("isAuth"),
  token: Cookies.get("token"),
  userName:Cookies.get("userName"),
  email:Cookies.get("email"),
  role:Cookies.get("role")
};

export default function loginReducers(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATED:
      state.isAuthenticated = true
      state.token = action.token
      state.userName = action.user.userName
      state.email = action.user.email
      state.role = action.user.role
      break;
    case LOGOUT:
      state.isAuthenticated = false
      state.token =null
      state.userName = null
      state.email = null
      state.role = null
      break;
    default:
      break;
  }
  return { ...state };
};
