import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  online: [],
  loading:false,
  error:null,
};

const onlineSlice = createSlice({
  name: 'online',
  initialState,
  reducers: {
    setOnline: (state, action) => {
        state.loading = action.payload.loading;
        state.online = action.payload.data;
        state.error = action.payload.error;
      },
      remove: (state, action) => {
        state.online = action.payload;
      },
      updateOnline: (state, action) => {
        const updatedOnline = action.payload;
        state.online = state?.online?.map(online =>
            online._id === updatedOnline._id ? updatedOnline : online
        );
    },
    
    },
});

export const { setOnline,remove,updateOnline} = onlineSlice.actions;
export default onlineSlice.reducer;
