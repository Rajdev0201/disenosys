"use client"
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FacebookLog, Login, Signup } from '../features/authSlice.js';




export const SignupData = (userData) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        "https://disenosys-1.onrender.com/api/v1/user/register",
        userData
      );
      dispatch(Signup(data));
      localStorage.setItem("profile", JSON.stringify(data));
      toast.dark('signup process done!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        nav("/");
    } catch (err) {
      toast.info("sigin process failed", {
        position: "top-center",
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
      toast.dark('Login successful!', {
        position: "top-center",
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
      toast.error(err?.response?.data?.message, {
        position: "top-center",
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
  

  const API_URL = "https://disenosys-1.onrender.com/api/v1/user";

  // Action creator for Facebook login success
  export const handleLogin = (response) => async (dispatch) => {
    console.log("Facebook Login Success:", response);
  
    const { first_name, last_name, userID } = response.data;
    const userName = `${first_name} ${last_name}`;
  
    try {
      const result = await axios.post(`${API_URL}/facebook`, {
        userEmail: userID,
        userName,
      });
  
      console.log("User data saved:", result.data);
  
      // Dispatch to Redux store
      dispatch(FacebookLog(result.data));
  
      // Save to localStorage only on the client side
  
        localStorage.setItem("profile", JSON.stringify({ userName, userEmail: userID }));
      
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };