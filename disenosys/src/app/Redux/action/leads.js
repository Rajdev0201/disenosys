"use client"
import axios from "axios";
import { setLeads, setLeadsXl, updateLeads } from "../features/leadsSlice";


//https://disenosys-7dm5.onrender.com
export const getLeads = (page, limit, search = '', startDate = '', endDate = '') => async (dispatch) => {
    try {
        dispatch(setLeads({data:[],loading:true}))
        const res = await axios.get(`https://disenosys-7dm5.onrender.com/get-leads?page=${page}&limit=${limit}&search=${search}&startDate=${startDate}&endDate=${endDate}`);
        const getData = res.data;
        dispatch(setLeads({data:getData,loading:false}));
    } catch (error) {
        dispatch(setLeads({data:[],loading:false,error:error}));
    }
  }


export const getLeadSDownload = () => async (dispatch) => {
    try {
        dispatch(setLeadsXl({data:[],loading:true}))
        const res = await axios.get('https://disenosys-7dm5.onrender.com/leads-xl');
        const getData = res.data;
        dispatch(setLeadsXl({data:getData,loading:false}));
    } catch (error) {
        dispatch(setLeadsXl({data:[],loading:false,error:error}));
    }
  }
 
export const updateLead = (Id, updatedData) => async (dispatch) => {
  try {
      const response = await axios.put(`https://disenosys-7dm5.onrender.com/updated-status/${Id}`, {status:updatedData});
      dispatch(updateLeads(response.data)); 
      dispatch(getLeads(1,15,"","",""));
  } catch (error) {
      console.error('Error:', error);
  }
}; 
