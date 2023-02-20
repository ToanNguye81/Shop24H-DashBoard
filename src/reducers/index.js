import { combineReducers } from "redux";

import customerReducers from "./customer.reducers";
import orderReducers from "./order.reducers";
import orderDetailReducers from "./orderDetail.reducers";
import productReducers from "./product.reducers";
import loginReducers from "./login.reducers";
const rootReducer = combineReducers({
    customerReducers,
    orderReducers,
    orderDetailReducers,
    productReducers,
    loginReducers
});

export default rootReducer;