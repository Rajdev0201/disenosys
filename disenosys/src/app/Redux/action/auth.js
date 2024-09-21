"use client"
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Login, Signup } from '../features/authSlice';




export const SignupData = (userData) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        "https://disenosys-1.onrender.com/api/v1/user/register",
        userData
      );
      dispatch(Signup(data));
      toast.dark('signup process done!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      localStorage.setItem("profile", JSON.stringify(data));
    } catch (err) {
      toast.info(err?.response?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    }
  };
  

  
  
  
  export const login = (userData,nav) => async (dispatch) => {
    console.log(userData);
    try {
      const { data } = await axios.post(
        "https://disenosys-1.onrender.com/api/v1/user/login",
        userData // This is now JSON, not FormData
      );
      dispatch(Login(data));
      toast.info('Login successful!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      localStorage.setItem("profile", JSON.stringify(data));
      nav("/");
    }catch(err) {
      toast.error(err.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      }
  };
  