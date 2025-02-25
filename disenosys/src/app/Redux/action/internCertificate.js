

"use client"
import axios from 'axios'
import { setIntern } from '../features/internshipCertificate';



export const InternList = () => async (dispatch) => {
    try {
        const res = await axios.get("https://disenosys-dkhj.onrender.com/internlist-c");
        const getData = res.data;
        dispatch(setIntern(getData));
    } catch (error) {
        console.error('Error fetch code:', error);
    }
  }
