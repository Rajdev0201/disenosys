import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const currentCartSlice = createSlice({
  name: 'currentcart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCart } = currentCartSlice.actions;
export default currentCartSlice.reducer;
