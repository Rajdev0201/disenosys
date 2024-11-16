import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    checkout:[],
}


const consultSlice = createSlice({
    name:"consult",
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

export const { setPlaceOrder,setPayment} = consultSlice.actions;
export default consultSlice.reducer;