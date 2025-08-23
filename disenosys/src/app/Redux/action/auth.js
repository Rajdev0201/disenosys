"use client"
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Admin, AdminLD, FacebookLog, Login, Signup } from '../features/authSlice.js';
import { setStudent, student } from "../features/studentSlice.js"
import {remove, setCode} from "../features/codeSlice.js";
import {removeCodeC, setCompanyCode} from "../features/companyCodeSlice.js";
import {setExternal,removeCode} from "../features/externalSlice.js";



export const SignupData = (userData) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        "https://disenosys-dkhj.onrender.com/api/v1/user/register",
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
        "https://disenosys-dkhj.onrender.com/api/v1/user/login",
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
        "https://disenosys-dkhj.onrender.com/admin/login",
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
      router.push("/dashboard-admin")
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

  export const adminLD = (userData,router) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        "https://disenosys-dkhj.onrender.com/admin/loginld",
        userData
      );
      dispatch(AdminLD(data));
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
      localStorage.setItem("profileLD", JSON.stringify(data));
      router.push("/coursel&d")
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

  const API_URL = "https://disenosys-dkhj.onrender.com/api/v1/user";

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
        "https://disenosys-dkhj.onrender.com/api/student/login",
        userData
      );
      console.log(data); 
      dispatch(setStudent(data));
      toast.dark('Login successful!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      localStorage.setItem("student", JSON.stringify(data));
      router.push('/quiz')
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


  export const studentLogin1 = (userData, router) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        "https://disenosys-dkhj.onrender.com/api/student/login",
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
      router.push('/quizone')
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
  
  export const studentLoginBIW = (userData, router) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        "https://disenosys-dkhj.onrender.com/api/student/examAll-login",
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
      router.push(`/quizall?code=${userData.code}`)
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
        const res = await axios.get("https://disenosys-dkhj.onrender.com/api/admin/studentCode");
        const getData = res.data;
        dispatch(setCode(getData));
    } catch (error) {
        console.error('Error fetch code:', error);
    }
}

//company code

export const companyCode = () => async (dispatch) => {
  try {
      const res = await axios.get("https://disenosys-dkhj.onrender.com/api/admin/companycode");
      const getData = res.data;
      dispatch(setCompanyCode(getData));
  } catch (error) {
      console.error('Error fetch code:', error);
  }
}

//external code 
export const externalCode = () => async (dispatch) => {
  try {
      const res = await axios.get("https://disenosys-dkhj.onrender.com/api/admin/externalCode");
      const getData = res.data;
      dispatch(setExternal(getData));
  } catch (error) {
      console.error('Error fetch code:', error);
  }
}


//student-code-delete 

export const deleteStudentCode = (id) => async (dispatch) => {
  try {
      await axios.delete(`https://disenosys-dkhj.onrender.com/api/admin/studentCode/${id}`);
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
    await axios.delete(`https://disenosys-dkhj.onrender.com/api/admin/externalCode/${id}`); //https://disenosys-dkhj.onrender.com
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

//company code delete

export const deleteCompanyCode = (id) => async (dispatch) => {
  try {
    await axios.delete(`https://disenosys-dkhj.onrender.com/api/admin/compnyCode/${id}`); //https://disenosys-dkhj.onrender.com
    dispatch(removeCodeC(id));
    dispatch(companyCode());
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