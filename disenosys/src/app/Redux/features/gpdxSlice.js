import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    gpdx: [],
};

const gpdxCetificateSlice = createSlice({
  name: 'gpdx',
  initialState,
  reducers: {
    setGpdx: (state, action) => {
      return action.payload;
    },
  },
});

export const { setGpdx } = gpdxCetificateSlice.actions;
export default gpdxCetificateSlice.reducer;
