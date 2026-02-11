

"use client"
import axios from 'axios'
import { setGpdx } from '../features/gpdxSlice.js';



export const gpdxList = () => async (dispatch) => {
    try {
        const res = await axios.get("https://disenosys-7dm5.onrender.com/gpdx-c");
        const getData = res.data;
        dispatch(setGpdx(getData));
    } catch (error) {
        console.error('Error fetch code:', error);
    }
  }
