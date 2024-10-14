import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  external: [],
};

const externalSlice = createSlice({
  name: 'external',
  initialState,
  reducers: {
    setExternal: (state,action) => {
        return action.payload; 
    },
    removeCode: (state, action) => {
      state.code = action.payload;
    },
    },
});

export const { setExternal,removeCode } = externalSlice.actions;
export default externalSlice.reducer;
