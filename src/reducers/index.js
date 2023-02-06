import { combineReducers } from "redux";

import customerReducers from "./customer.reducers";
import orderReducers from "./order.reducers";
import orderDetailReducers from "./orderDetail.reducers";
import productReducers from "./product.reducers";
const rootReducer = combineReducers({
    customerReducers,
    orderReducers,
    orderDetailReducers,
    productReducers
});

export default rootReducer;