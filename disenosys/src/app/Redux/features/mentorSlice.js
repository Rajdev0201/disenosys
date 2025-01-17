import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mentor: [],
  
};

const mentorSlice = createSlice({
  name: 'mentor',
  initialState,
  reducers: {
    getmentorData: (state,action) => {
        return action.payload; 
    }
    },
});

export const { getmentorData } = mentorSlice.actions;
export default mentorSlice.reducer;