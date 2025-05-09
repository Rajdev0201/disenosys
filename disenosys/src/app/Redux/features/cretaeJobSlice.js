import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    jobs:[],
    payment:[],
    premium:[],
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
        },
        setPayment:(state,action) => {
            state.loading = action.payload.loading;
            state.payment = action.payload.payment;
            state.error = action.payload.error;
        },
        postPremiumUsers:(state,action) => {
            state.premium.push(action.payload);
        },
        setPremiumUser : (state, action) => {
            state.loading = action.payload.loading;
            state.premium= action.payload.premium;
            state.error = action.payload.error;
          },
          removeJob: (state, action) => {
            state.jobs = action.payload;
          },
          updateJob: (state, action) => {
            const updated = action.payload;
            state.jobs = state?.jobs?.map(job =>
                job._id === updated._id ? updated : job
            );
        },
         
    }
})


export const {setJob,postJob,postPayment,setPayment,postPremiumUsers,setPremiumUser,removeJob,updateJob} = createJobSlice.actions;
export default createJobSlice.reducer;