/* eslint-disable import/no-anonymous-default-export */
import { createSlice } from "@reduxjs/toolkit";

export const paginationBlog = createSlice({
  name: "pagination",
  initialState: [] ,
  reducers: {
    setPaginationData: (state, action) => {
      return action.payload;
    },
  },
});

export const { setPaginationData } = paginationBlog.actions;

export default paginationBlog.reducer;
