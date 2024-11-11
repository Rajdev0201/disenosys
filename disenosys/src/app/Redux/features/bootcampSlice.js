import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    checkout:[],
}


const bootcampSlice = createSlice({
    name:"bootcamp",
    initialState,
    reducers:{
        setPlaceOrder:(state,action) => {
            state.checkout = action.payload;
        },
        setPayment: (state,action) => {
            return action.payload; 
        },
    }
})

export const { setPlaceOrder,setPayment} = bootcampSlice.actions;
export default bootcampSlice.reducer;