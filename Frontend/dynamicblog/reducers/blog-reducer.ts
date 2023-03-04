/* eslint-disable import/no-anonymous-default-export */
import { createSlice } from "@reduxjs/toolkit";
export const blogInfo = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    setBlogData: (state, action) => {
      return action.payload;
    },
  },
});



export const { setBlogData } = blogInfo.actions;

export default blogInfo.reducer;
