
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("profile")) : {}
};


const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
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
    LinkedInOut: (state, action) => {
      localStorage.removeItem("profile");
      state.user = null;
    },
    FacebookLog:(state,action) => {
      const userData = action.payload || {};
      localStorage.setItem("profile", JSON.stringify(userData));
      state.user = userData;
    }
  },
});

export const { Signup,Login,LogOut,GoogleLog,GoogleOut,LinkedInLog,LinkedInOut,FacebookLog } = authSlice.actions;
export default authSlice.reducer;
