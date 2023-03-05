import { configureStore } from "@reduxjs/toolkit";
import { blogInfo } from './reducers/blog-reducer';
import { profileInfo } from './reducers/profile-reducer';
import { currenlyBlog } from "./reducers/currenly-blog-reducer";
import { paginationBlog } from "./reducers/pagination-reducer";

export const store = configureStore({
  reducer: {
    blog: blogInfo.reducer,
    profile: profileInfo.reducer,
    currenly: currenlyBlog.reducer,
    page: paginationBlog.reducer
  },
});