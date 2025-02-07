import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  teacher: [],
};

const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    setTeacher: (state, action) => {
        return action.payload; 
      },
      remove: (state, action) => {
        state.teacher = action.payload;
      },
      updateTeacher: (state, action) => {
        const updatedTeacher = action.payload;
        state.teacher = state?.teacher?.map(teach =>
            teach._id === updatedTeacher._id ? updatedTeacher : teach
        );
    },
    
    },
});

export const { setTeacher,remove,updateTeacher} = teacherSlice.actions;
export default teacherSlice.reducer;
