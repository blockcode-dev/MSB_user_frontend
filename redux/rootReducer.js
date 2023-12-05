// rootReducer.js
import { combineReducers } from "redux";
import getClientProfileReducer from './getClientProfileSlice';
import getLikeReducer  from "./getlikeslice"
import getBlogDetail from "./getBlogSlice"
import getcomment from "./getcommentSlice";
const rootReducer = combineReducers({
  clientProfile: getClientProfileReducer,
  like: getLikeReducer,
  blogs: getBlogDetail,
  comment:getcomment



});

export default rootReducer;
