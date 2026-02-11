"use client"
import axios from 'axios'
import { setExam } from '../features/examCertificateSlice';



export const ExamList = () => async (dispatch) => {
    try {
        const res = await axios.get("https://disenosys-7dm5.onrender.com/exam-c");
        const getData = res.data;
        dispatch(setExam(getData));
    } catch (error) {
        console.error('Error fetch code:', error);
    }
  }
