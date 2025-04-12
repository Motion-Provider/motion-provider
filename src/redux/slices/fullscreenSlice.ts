import { ReduxFullscreenProps } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE: ReduxFullscreenProps = {
  isFullscreen: false,
};

const fullscreenSlice = createSlice({
  initialState: INITIAL_STATE,
  name: "fullscreen",
  reducers: {
    setFullscreen: (_, action) => {
      return action.payload;
    },
  },
});

export const { setFullscreen } = fullscreenSlice.actions;
export default fullscreenSlice.reducer;
