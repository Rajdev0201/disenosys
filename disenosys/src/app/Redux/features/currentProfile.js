import { createSlice } from '@reduxjs/toolkit';

// Initialize state as null or an empty object
const initialState = null; 

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setUpdate: (state, action) => {
      return action.payload;
    },
  },
});

export const { setUpdate } = currentUserSlice.actions;
export default currentUserSlice.reducer;
