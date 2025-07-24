import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    attendance:[],
    loading:false,
    error:null
}


const attendanceslice = createSlice({
   name:"attendance",
   initialState,
   reducers:{
    setReports:(state,action) => {
     state.loading = action.payload.loading;
     state.attendance = action.payload.data;
     state.error = action.payload.error;
    },
   }
})

export const {setReports} = attendanceslice.actions;

export default attendanceslice.reducer;