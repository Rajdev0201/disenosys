"use client"
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postJob, setJob } from '../features/cretaeJobSlice';



export const createJob = (data) => async (dispatch) => {
    const createJobPromise = axios.post("https://disenosys-dkhj.onrender.com/Jobs/postjob", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  
    try {
      const res = await toast.promise(
        createJobPromise,
        {
          pending: 'Creating job...',
          success: 'Job posted successfully!',
          error: 'Failed to post job.',
        },
        {
          position: 'top-right',
          autoClose: 3000,
        }
      );
  
      const jobData = res.data.data; //res structue -> data{ data: {} ,message,success}
      dispatch(postJob(jobData));
      dispatch(getJob())
    } catch (err) {
      console.error(err);
    }
  };


export const getJob = () => async (dispatch) => {
    dispatch(setJob({jobs:[],loading:true,error:false}))
    try{
       const res = await axios.get("https://disenosys-dkhj.onrender.com/Jobs/getjob");
       const data = res.data;
       dispatch(setJob({jobs:data,loading:false,error:false}))
    }catch(err){
        console.log(err)
    }
}


