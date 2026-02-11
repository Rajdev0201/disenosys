

"use client"
import axios from 'axios'
import { setCourse } from '../features/CourseCertificateSlice';


export const CourseList = () => async (dispatch) => {
    try {
        const res = await axios.get("https://disenosys-7dm5.onrender.com/courselist-c");
        const getData = res.data;
        dispatch(setCourse(getData));
    } catch (error) {
        console.error('Error fetch code:', error);
    }
  }
