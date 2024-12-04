"use client"
import axios from 'axios'
import { setUpdate } from '../features/portfolioSlice.js';
import { setUpdateAll } from '../features/portAllSlice.js';
import {setUpdateResume} from "../features/resumeSlice.js";



export const getPortfolioOne = () => async (dispatch) => {
    try {
      const res = await axios.get(`https://disenosys-dkhj.onrender.com/update/portfolio/single`);
      console.log(res)
      const portfolio = res.data;
      dispatch(setUpdate(portfolio));
    } catch (error) {
      console.error('Error getProfile:', error);
    }
  };


  export const getPortfolioAll = () => async (dispatch) => {
    try {
      const res = await axios.get(`https://disenosys-dkhj.onrender.com/update/portfolio`);
      const portfolioAll = res.data;
      dispatch(setUpdateAll(portfolioAll));
    } catch (error) {
      console.error('Error getProfile:', error);
    }
  };

//resume
  export const getResume = () => async (dispatch) => {
    try {
      const res = await axios.get(`https://disenosys-dkhj.onrender.com/resume/profile`);
      const portfolioAll = res.data;
      dispatch(setUpdateResume(portfolioAll));
    } catch (error) {
      console.error('Error getProfile:', error);
    }
  };
