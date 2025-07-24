"use client"
import axios from "axios";
import {setReports} from "../features/attendanceSlice.js"

//https://disenosys-dkhj.onrender.com
export const getReports = (batch) => async (dispatch) => {
    try {
        dispatch(setReports({data:[],loading:true}))
        const res = await axios.get(`http://localhost:8000/get-attendance?batch=${batch}`);
        const getData = res.data;
        console.log(getData)
        dispatch(setReports({data:getData,loading:false}));
    } catch (error) {
        dispatch(setReports({data:[],loading:false,error:error}));
    }
  }
