import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    checkout:[],
}


const PaymentSlice = createSlice({
    name:"placeorder",
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

export const { setPlaceOrder,setPayment} = PaymentSlice.actions;
export default PaymentSlice.reducer;