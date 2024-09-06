import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCourse: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCourse } = categorySlice.actions;
export default categorySlice.reducer;
