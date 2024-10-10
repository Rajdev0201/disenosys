"use client"
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  student: null,
};




const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setStudent: (state, action) => {
        const userData = action.payload || {};
        if (typeof window !== "undefined") {
          localStorage.setItem("student", JSON.stringify(userData));
        }
        state.student = userData;
      },
    student: (state, action) => {
      const userData = action.payload || {};
      if (typeof window !== "undefined") {
        localStorage.setItem("student", JSON.stringify(userData));
      }
      state.student = userData;
    },
    LogOut: (state, action) => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("student");
        // localStorage.removeItem("linkedin_code_sent");
      }
      state.student = null;
    },
    
  },
});

export const { student,LogOut,setStudent} = studentSlice.actions;
export default studentSlice.reducer;
