import { combineReducers } from "redux";

import orderReducer from './orders';


export default combineReducers({
    order: orderReducer
});
