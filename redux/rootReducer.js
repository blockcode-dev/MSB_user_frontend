// rootReducer.js
import { combineReducers } from "redux";
import getClientProfileReducer from './getClientProfileSlice';
import getLikeReducer  from "./getlikeslice"
import getBlogDetail from "./getBlog"
const rootReducer = combineReducers({
  clientProfile: getClientProfileReducer,
  like: getLikeReducer,
  blogdetail: getBlogDetail,



});

export default rootReducer;
