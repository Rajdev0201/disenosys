
"use client"
import axios from 'axios'
import {remove, setOnline, updateOnline} from "../features/onlineStdSlice.js"


export const Online = () => async (dispatch) => {
    try {
        const res = await axios.get("https://disenosys-dkhj.onrender.com/ld/studentget");
        const getData = res.data;
        dispatch(setOnline(getData));
    } catch (error) {
        console.error('Error fetch code:', error);
    }
  }

  export const removeOnline = (Id) => async (dispatch) => {
    try {
        await axios.delete(`https://disenosys-dkhj.onrender.com/ld/studentdelete/${Id}`);
        dispatch(remove(Id));
        dispatch(Online())
    } catch (error) {
        console.error('Error removing for courses:', error);
    }
};

export const editOnline = (Id, updatedData) => async (dispatch) => {
  try {
      const response = await axios.put(`https://disenosys-dkhj.onrender.com/ld/studentedit/${Id}`, updatedData);
      dispatch(updateOnline(response.data.data)); 
      dispatch(Online());
  } catch (error) {
      console.error('Error updating course:', error);
  }
};