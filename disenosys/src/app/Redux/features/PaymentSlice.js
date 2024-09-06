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
    }
})

export const { setPlaceOrder} = PaymentSlice.actions;
export default PaymentSlice.reducer;