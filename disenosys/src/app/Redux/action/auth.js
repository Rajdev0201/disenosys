"use client"
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Admin, FacebookLog, Login, Signup } from '../features/authSlice.js';
import { setStudent, student } from "../features/studentSlice.js"
import {remove, setCode} from "../features/codeSlice.js";
import {setExternal,removeCode} from "../features/externalSlice.js";



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
  

  export const admin = (userData,router) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        "https://disenosys-1.onrender.com/admin/login",
        userData
      );
      dispatch(Admin(data));
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
      router.push("/historycode")
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








  export const studentLogin = (userData, router) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        "https://disenosys-1.onrender.com/api/student/login",
        userData
      );
      console.log(data); 
      dispatch(setStudent(data));
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
      localStorage.setItem("student", JSON.stringify(data));
      router.push("/quiz")
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'An unexpected error occurred';
      toast.dark(errorMessage || 'An unexpected error occurred', {
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
  



  //student code 
  export const studentCode = () => async (dispatch) => {
    try {
        const res = await axios.get("https://disenosys-1.onrender.com/api/admin/studentCode");
        const getData = res.data;
        dispatch(setCode(getData));
    } catch (error) {
        console.error('Error fetch code:', error);
    }
}

//external code 
export const externalCode = () => async (dispatch) => {
  try {
      const res = await axios.get("https://disenosys-1.onrender.com/api/admin/externalCode");
      const getData = res.data;
      dispatch(setExternal(getData));
  } catch (error) {
      console.error('Error fetch code:', error);
  }
}


//student-code-delete 

export const deleteStudentCode = (id) => async (dispatch) => {
  try {
      await axios.delete(`https://disenosys-1.onrender.com/api/admin/studentCode/${id}`);
      dispatch(remove(id));
      dispatch(studentCode());
      toast.dark('The code has Deleted!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
  } catch (error) {
      console.error('Error fetch code:', error);
  }
}


//external-code-delete

export const deleteExternalCode = (id) => async (dispatch) => {
  try {
    await axios.delete(`https://disenosys-1.onrender.com/api/admin/externalCode/${id}`);
    dispatch(removeCode(id));
    dispatch(externalCode());
    toast.dark('The code has Deleted!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  } catch(error){
    console.error('Error fetch code:', error);
  }
}

