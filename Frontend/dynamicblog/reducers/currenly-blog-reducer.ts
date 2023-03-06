/* eslint-disable import/no-anonymous-default-export */
import { createSlice } from "@reduxjs/toolkit";



export const currenlyBlog = createSlice({
  name: "currenly",
  initialState: 0 ,
  reducers: {
    setCurrenlyBlogData: (state, action) => {
      return action.payload;
    },
  },
});



export const { setCurrenlyBlogData } = currenlyBlog.actions;

export default currenlyBlog.reducer;
