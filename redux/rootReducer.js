// rootReducer.js
import { combineReducers } from "redux";
import getClientProfileReducer from './getClientProfileSlice';
import getLikeReducer  from "./getlikeslice"
const rootReducer = combineReducers({
  clientProfile: getClientProfileReducer,
  like: getLikeReducer,


});

export default rootReducer;
