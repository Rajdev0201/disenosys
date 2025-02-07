import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  online: [],
};

const onlineSlice = createSlice({
  name: 'online',
  initialState,
  reducers: {
    setOnline: (state, action) => {
        return action.payload; 
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
