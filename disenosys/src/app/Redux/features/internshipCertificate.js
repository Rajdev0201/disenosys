import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    intern: [],
};

const internCetificateSlice = createSlice({
  name: 'intern',
  initialState,
  reducers: {
    setIntern: (state, action) => {
      return action.payload;
    },
  },
});

export const { setIntern } = internCetificateSlice.actions;
export default internCetificateSlice.reducer;
