import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    checkout: [],
    block: [], 
    amt:[],
};

const consultSlice = createSlice({
    name: "consult",
    initialState,
    reducers: {
        setPlaceOrder: (state, action) => {
            state.checkout = action.payload;
        },
        setPayment: (state, action) => {
            state.checkout = action.payload; 
        },
        setBlock: (state, action) => {
            state.block = action.payload; 
        },
        // setCrateAmount: (state,action) => {
        //   state.amt = [action.payload];
        // },
        fetchPayment: (state,action) => {
            state.amt = action.payload;
        },
        setzeroPayemnt: (state,action) => {
          state.checkout = action.payload;
        },
    }
});

export const { setPlaceOrder, setPayment, setBlock ,setCrateAmount,fetchPayment,setzeroPayemnt } = consultSlice.actions;
export default consultSlice.reducer;
