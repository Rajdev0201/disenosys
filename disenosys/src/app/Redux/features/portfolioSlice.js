import { createSlice } from '@reduxjs/toolkit';

const initialState = []; 

const portfolioSlice = createSlice({
  name: 'single',
  initialState,
  reducers: {
    setUpdate: (state, action) => {
      return action.payload; 
    },
  },
});

export const { setUpdate } = portfolioSlice.actions;
export default portfolioSlice.reducer;
