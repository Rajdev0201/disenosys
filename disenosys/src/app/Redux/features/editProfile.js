import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: [],
};

const editCartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setprofile : (state, action) => {
        const userData = action.payload;
        state.user = userData;
      },
  },
});

export const { setprofile } = editCartSlice.actions;
export default editCartSlice.reducer;
