import { combineReducers } from "redux";
import cookieSlice from "../slices/cookieSlice";
import fullscreenSlice from "../slices/fullscreenSlice";
import documentSlice from "../slices/documentSlice";

const rootReducer = combineReducers({
  cookie: cookieSlice,
  fullscreen: fullscreenSlice,
  document: documentSlice,
});

export default rootReducer;
