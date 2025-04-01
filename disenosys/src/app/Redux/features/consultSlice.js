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
            state.checkout = action.payload; // Update checkout state, not replace the entire state
        },
        setBlock: (state, action) => {
            state.block = action.payload; // Update block state, not replace the entire state
        },
        setCrateAmount: (state,action) => {
          state.amt =  action.payload;
        }
    }
});

export const { setPlaceOrder, setPayment, setBlock ,setCrateAmount } = consultSlice.actions;
export default consultSlice.reducer;
