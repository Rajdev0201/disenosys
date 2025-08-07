"use client"
import axios from "axios";
import { setLeads, updateLeads } from "../features/leadsSlice";


//https://disenosys-dkhj.onrender.com
export const getLeads = (page, limit, search = '', startDate = '', endDate = '') => async (dispatch) => {
    try {
        dispatch(setLeads({data:[],loading:true}))
        const res = await axios.get(`https://disenosys-dkhj.onrender.com/get-leads?page=${page}&limit=${limit}&search=${search}&startDate=${startDate}&endDate=${endDate}`);
        const getData = res.data;
        console.log(getData)
        dispatch(setLeads({data:getData,loading:false}));
    } catch (error) {
        dispatch(setLeads({data:[],loading:false,error:error}));
    }
  }


 
export const updateLead = (Id, updatedData) => async (dispatch) => {
  try {
      const response = await axios.put(`https://disenosys-dkhj.onrender.com/updated-status/${Id}`, {status:updatedData});
      dispatch(updateLeads(response.data)); 
      dispatch(getLeads());
  } catch (error) {
      console.error('Error:', error);
  }
}; 
