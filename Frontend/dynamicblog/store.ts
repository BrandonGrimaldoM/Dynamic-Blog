import { configureStore } from "@reduxjs/toolkit";
import { blogInfo } from './reducers/blog-reducer'
import { profileInfo } from './reducers/profile-reducer'

export const store = configureStore({
  reducer: {
    blog: blogInfo.reducer,
    profile: profileInfo.reducer
  },
});