import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  career: [],
};

const careerSlice = createSlice({
  name: 'career',
  initialState,
  reducers: {
    getCareerData: (state,action) => {
        return action.payload; 
    }
    },
});

export const { getCareerData } = careerSlice.actions;
export default careerSlice.reducer;
