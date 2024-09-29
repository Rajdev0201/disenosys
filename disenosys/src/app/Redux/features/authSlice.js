"use client"
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};




const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    Signup: (state, action) => {
      const userData = action.payload || {};
      localStorage.setItem("profile", JSON.stringify(userData));
      state.user = userData;
    },

    Login: (state, action) => {
      const userData = action.payload || {};
      if (typeof window !== "undefined") {
        localStorage.setItem("profile", JSON.stringify(userData));
      }
      state.user = userData;
    },
    LogOut: (state, action) => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("profile");
        localStorage.removeItem("linkedin_code_sent");
      }
      state.user = null;
    },
    // Forget: (state, action) => {
    //   state.user = action.payload;
    // },
    GoogleLog: (state, action) => {
      const userData = action.payload || {};
      // console.log(userData);
      localStorage.setItem("profile", JSON.stringify(userData));
      state.user = userData;
    },
    GoogleOut: (state, action) => {
      localStorage.removeItem("profile");
      state.user = null;
    },
    LinkedInLog: (state, action) => {
      const userData = action.payload || {};
      // console.log(userData);
      localStorage.setItem("profile", JSON.stringify(userData));
      state.user = userData;
    },
    // LinkedInOut: (state, action) => {
    //   localStorage.removeItem("profile");
    //   state.user = null;
    // },
    FacebookLog:(state,action) => {
      const userData = action.payload || {};
      localStorage.setItem("profile", JSON.stringify(userData));
      state.user = userData;
    }
  },
});

export const { Signup,Login,LogOut,GoogleLog,GoogleOut,FacebookLog,LinkedInLog,setUser } = authSlice.actions;
export default authSlice.reducer;
