import { ReduxCookieProps } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE: ReduxCookieProps = {
  activated: false,
};

const cookieSlice = createSlice({
  initialState: INITIAL_STATE,
  name: "cookie",
  reducers: {
    setCookie: (_, action) => {
      return action.payload;
    },
  },
});

export const { setCookie } = cookieSlice.actions;
export default cookieSlice.reducer;
