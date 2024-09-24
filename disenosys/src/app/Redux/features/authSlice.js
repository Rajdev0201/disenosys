
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
  },
});

export const { Signup,Login,LogOut } = authSlice.actions;
export default authSlice.reducer;
