import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  code: [],
};

const codeSlice = createSlice({
  name: 'code',
  initialState,
  reducers: {
    setCode: (state, action) => {
        return action.payload; 
      },
    },
});

export const { setCode } = codeSlice.actions;
export default codeSlice.reducer;
