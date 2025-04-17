import { ReduxDocumentProps } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE: ReduxDocumentProps = {
  objectID: null,
};

const documentSlice = createSlice({
  initialState: INITIAL_STATE,
  name: "document",
  reducers: {
    setDocument: (_, action) => {
      return action.payload;
    },
  },
});

export const { setDocument } = documentSlice.actions;
export default documentSlice.reducer;
