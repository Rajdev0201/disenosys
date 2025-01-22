import { createSlice } from '@reduxjs/toolkit';
import { companyCode } from '../action/auth';

const initialState = {
  companyCode: [],
};

const companySlice = createSlice({
  name: 'companyCode',
  initialState,
  reducers: {
    setCompanyCode: (state, action) => {
        return action.payload; 
      },
       removeCodeC: (state, action) => {
        state.code = action.payload;
      },
    },
});

export const { setCompanyCode ,removeCodeC} = companySlice.actions;
export default companySlice.reducer;
