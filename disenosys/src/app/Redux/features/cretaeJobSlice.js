import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    jobs:[],
    payment:[],
    loading:false,
    error:null
}


const createJobSlice = createSlice({
    name:'jobs',
    initialState,
    reducers:{
        setJob:(state,action) => {
            state.loading = action.payload.loading;
            state.jobs = action.payload.jobs;
            state.error = action.payload.error;
        },
        postJob:(state,action) => {
            state.jobs.push(action.payload);
        },
        postPayment:(state,action) => {
            state.payment.push(action.payload);
        }
         
    }
})


export const {setJob,postJob,postPayment} = createJobSlice.actions;
export default createJobSlice.reducer;