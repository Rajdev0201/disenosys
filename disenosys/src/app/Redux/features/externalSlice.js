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
    },
});

export const { setExternal } = externalSlice.actions;
export default externalSlice.reducer;
