import { createSlice } from '@reduxjs/toolkit';

const initialState = []; 

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setUpdateResume: (state, action) => {
      return action.payload; 
    },
  },
});

export const { setUpdateResume } = resumeSlice.actions;
export default resumeSlice.reducer;
