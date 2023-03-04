/* eslint-disable import/no-anonymous-default-export */
import { createSlice } from "@reduxjs/toolkit";



export const profileInfo = createSlice({
  name: "profile",
  initialState: [],
  reducers: {
    setProfileData: (state, action) => {
      return action.payload;
    },
  },
});

export const { setProfileData } = profileInfo.actions;
export default profileInfo.reducer;
