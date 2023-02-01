import { combineReducers } from "redux";

import customerReducers from "./customer.reducers";
import productReducers from "./product.reducers";
const rootReducer = combineReducers({
    customerReducers,
    productReducers
});

export default rootReducer;