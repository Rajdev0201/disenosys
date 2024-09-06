
"use client"
import { setProducts } from "../features/CourseSlice.js";
// import{setCourse} from "../features/categorySlice.js"
import axios from 'axios'

export const fetchCourse = () => async (dispatch) => {
    try {
      const response = await axios.get('https://disenosys-backend.onrender.com/api/v1/getAllCourses');
      const productsJson = response.data;
      dispatch(setProducts(productsJson));
    } catch (error) {
      console.error('Error fetching products:', error);
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