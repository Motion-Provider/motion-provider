import { combineReducers } from "redux";
import cookieSlice from "../slices/cookieSlice";

const rootReducer = combineReducers({
  cookie: cookieSlice,
});

export default rootReducer;
