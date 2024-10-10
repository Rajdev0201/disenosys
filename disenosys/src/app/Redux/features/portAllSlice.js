import { createSlice } from '@reduxjs/toolkit';

const initialState = []; 

const portAllSlice = createSlice({
  name: 'All',
  initialState,
  reducers: {
    setUpdateAll: (state, action) => {
      return action.payload; 
    },
  },
});

export const { setUpdateAll } = portAllSlice.actions;
export default portAllSlice.reducer;
