import { combineReducers } from "redux";
import cookieSlice from "../slices/cookieSlice";
import fullscreenSlice from "../slices/fullscreenSlice";

const rootReducer = combineReducers({
  cookie: cookieSlice,
  fullscreen: fullscreenSlice,
});

export default rootReducer;
