
"use client"

import axios from 'axios'
import { remove, setTeacher, updateTeacher } from '../features/teacherSlice';


export const teacher = () => async (dispatch) => {
    try {
        const res = await axios.get("https://disenosys-dkhj.onrender.com/ld/teacherget");
        const getData = res.data;
        dispatch(setTeacher(getData));
    } catch (error) {
        console.error('Error fetch code:', error);
    }
  }

  export const removeTeacher = (Id) => async (dispatch) => {
    try {
        await axios.delete(`https://disenosys-dkhj.onrender.com/ld/teacherdelete/${Id}`);
        dispatch(remove(Id));
        dispatch(teacher())
    } catch (error) {
        console.error('Error removing for courses:', error);
    }
};

export const editTeacher = (Id, updatedData) => async (dispatch) => {
  try {
      const response = await axios.put(`https://disenosys-dkhj.onrender.com/ld/teacheredit/${Id}`, updatedData);
      dispatch(updateTeacher(response.data.data)); 
      dispatch(teacher());
  } catch (error) {
      console.error('Error updating course:', error);
  }
};