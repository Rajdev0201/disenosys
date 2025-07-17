import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    batch:[],
    batchName:[],
    loading:false,
    errors:null
}

const batchSlice = createSlice({
     name:"batch",
     initialState,
     reducers:{
        setBatch:(state,action) => {
          state.loading = action.payload.loading;
          state.batch = action.payload.data;
          state.errors = action.payload.errors;
        },
         setBatchName:(state,action) => {
          state.loading = action.payload.loading;
          state.batchName = action.payload.data;
          state.errors = action.payload.errors;
        },
     }
})

export const {setBatch,setBatchName} = batchSlice.actions;
export default batchSlice.reducer