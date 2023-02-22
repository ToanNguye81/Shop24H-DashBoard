import Cookies from "js-cookie";
import { AUTHENTICATED, LOGOUT } from "../constants/login.constants";

const initialState = {
  isAuthenticated:Cookies.get("isAuth"),
  token: Cookie.get(),
  user:null,
};

export default function loginReducers(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATED:
      state.isAuthenticated = true
      state.token = action.token
      state.user = action.user
      break;
    case LOGOUT:
      state.isAuthenticated = false
      state.token = null
      state.user=null
      break;
    default:
      break;
  }
  return { ...state };
};
