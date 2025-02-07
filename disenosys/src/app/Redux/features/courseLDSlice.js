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
      remove: (state, action) => {
        state.courseLD = action.payload;
      },
      updateCourse: (state, action) => {
        const updatedCourse = action.payload;
        state.courseLD = state.courseLD.map(course =>
            course._id === updatedCourse._id ? updatedCourse : course
        );
    },
    
    },
});

export const { setCourse,remove,updateCourse} = courseLDSlice.actions;
export default courseLDSlice.reducer;
