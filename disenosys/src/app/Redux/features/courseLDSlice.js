import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courseLD: [],
};

const courseLDSlice = createSlice({
  name: 'courseLD',
  initialState,
  reducers: {
    setCourse: (state, action) => {
        return action.payload; 
      },
    },
});

export const { setCourse} = courseLDSlice.actions;
export default courseLDSlice.reducer;
