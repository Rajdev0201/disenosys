import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    course: [],
};

const courseCetificateSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setCourse: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCourse } = courseCetificateSlice.actions;
export default courseCetificateSlice.reducer;
