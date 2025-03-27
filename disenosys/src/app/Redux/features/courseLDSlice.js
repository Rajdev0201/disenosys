import { createSlice } from '@reduxjs/toolkit';

 
const initialState = {
  course: [],
  loading:false,
  error:null,
};


const courseLDSlice = createSlice({
  name: 'courseLD',
  initialState,
  reducers: {
    setCourse: (state, action) => {
      state.loading = action.payload.loading;
      state.course = action.payload.data;
      state.error = action.payload.error; 
      },
      remove: (state, action) => {
        state.course = action.payload;
      },
      updateCourse: (state, action) => {
        const updatedCourse = action.payload;
        state.course = state.course.map(course =>
            course._id === updatedCourse._id ? updatedCourse : course
        );
    },
    
    },
});

export const { setCourse,remove,updateCourse} = courseLDSlice.actions;
export default courseLDSlice.reducer;
