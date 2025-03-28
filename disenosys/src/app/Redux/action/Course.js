
"use client"
import { setProducts } from "../features/CourseSlice.js";
import{remove, setCourse, updateCourse} from "../features/courseLDSlice.js"
import axios from 'axios'

export const fetchCourse = () => async (dispatch) => {
    try {
      const response = await axios.get('https://disenosys-dkhj.onrender.com/api/v1/getAllCourses');
      const productsJson = response.data;
      dispatch(setProducts(productsJson));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  export const courseld = () => async (dispatch) => {
    try {
        dispatch(setCourse({data:[],loading:true}));
        const res = await axios.get("https://disenosys-dkhj.onrender.com/ld/courseget");
        const getData = res.data;
        dispatch(setCourse({data:getData,loading:false}));
    } catch (error) {
       dispatch(setCourse({data:[],loading:false,error:error.message}));
    }
  }

  export const removeCourse = (Id) => async (dispatch) => {
    try {
        await axios.delete(`https://disenosys-dkhj.onrender.com/ld/coursedelete/${Id}`);
        dispatch(remove(Id));
        dispatch(courseld())
    } catch (error) {
        console.error('Error removing for courses:', error);
    }
};

export const editCourse = (Id, updatedCourseData) => async (dispatch) => {
  try {
      const response = await axios.put(`https://disenosys-dkhj.onrender.com/ld/courseedit/${Id}`, updatedCourseData);
      dispatch(updateCourse(response.data)); 
  } catch (error) {
      console.error('Error updating course:', error);
  }
};


  // export const fetchByCategory = (category) => async (dispatch) => {
  //   try {
  //     const query = category ? `?category=${category}` : '';
  //     const response = await axios.get(`https://disenosys-backend.onrender.com/getCourseBycategory/${query}`);
  //     const productsJson = response.data;
  //     dispatch(setCourse(productsJson));
  //   } catch (error) {
  //     console.error('Error fetching products:', error);
  //   }
  // };
  
//   export const fetchCourses = createAsyncThunk('courses/fetchCourses', async (category) => {
//     const query = category ? `?category=${category}` : '';
//     const response = await axios.get(`http://localhost:5000/api/v1/courses${query}`);
//     return response.data;
//   });