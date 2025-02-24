

"use client"
import axios from 'axios'
import { setCourse } from '../features/CourseCertificateSlice';


export const CourseList = () => async (dispatch) => {
    try {
        const res = await axios.get("http://localhost:8000/courselist-c");
        const getData = res.data;
        dispatch(setCourse(getData));
    } catch (error) {
        console.error('Error fetch code:', error);
    }
  }
