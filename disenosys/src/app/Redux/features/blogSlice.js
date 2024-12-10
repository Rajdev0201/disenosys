import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  blog: [],
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    getBlogData: (state,action) => {
        return action.payload; 
    }
    },
});

export const { getBlogData } = blogSlice.actions;
export default blogSlice.reducer;
