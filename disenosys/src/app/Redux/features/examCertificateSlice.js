import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    exam: [],
};

const examCetificateSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {
    setExam: (state, action) => {
      return action.payload;
    },
  },
});

export const { setExam } =  examCetificateSlice.actions;
export default  examCetificateSlice.reducer;
