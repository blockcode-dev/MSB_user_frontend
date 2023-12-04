// rootReducer.js
import { combineReducers } from "redux";
import getClientProfileReducer from './getClientProfileSlice';
import getLikeReducer  from "./getlikeslice"
import getBlogDetail from "./getBlog"
import getcomment from "./getcommentSlice";
const rootReducer = combineReducers({
  clientProfile: getClientProfileReducer,
  like: getLikeReducer,
  blogdetail: getBlogDetail,
  comment:getcomment



});

export default rootReducer;
