"use client"
import axios from "axios";
import { setBatch, setBatchName } from "../features/batchSlice";


//https://disenosys-dkhj.onrender.com
export const getBatch = (batch) => async (dispatch) => {
    console.log(batch)
    try {
        dispatch(setBatch({data:[],loading:true}))
        const res = await axios.get(`https://disenosys-dkhj.onrender.com/get-batch?batch=${batch}`);
        const getData = res.data;
        console.log(getData)
        dispatch(setBatch({data:getData,loading:false}));
    } catch (error) {
        dispatch(setBatch({data:[],loading:false,error:error}));
    }
  }


  export const getBatchName = (course) => async (dispatch) => {
    try {
        dispatch(setBatchName({data:[],loading:true}))
        const res = await axios.get(`http://localhost:8000/get-batchName?course=${course}`);
        const getData = res.data;
        dispatch(setBatchName({data:getData,loading:false}));
    } catch (error) {
        dispatch(setBatchName({data:[],loading:false,error:error}));
    }
  }