import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  teach: [],
  loading:false,
  error:null,
};

const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    setTeacher: (state, action) => {
       state.loading = action.payload.loading;
        state.teach = action.payload.data;
        state.error = action.payload.error;
      },
      remove: (state, action) => {
        state.teach = action.payload;
      },
      updateTeacher: (state, action) => {
        const updatedTeacher = action.payload;
        state.teach = state?.teach?.map(teach =>
            teach._id === updatedTeacher._id ? updatedTeacher : teach
        );
    },
    
    },
});

export const { setTeacher,remove,updateTeacher} = teacherSlice.actions;
export default teacherSlice.reducer;
