"use client"
import axios from 'axios'
import { setUpdate } from '../features/portfolioSlice.js';
import { setUpdateAll } from '../features/portAllSlice.js';
import {setUpdateResume} from "../features/resumeSlice.js";
import { getBlogData } from '../features/blogSlice.js';
import { getCareerData } from '../features/careerSlice.js';



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


  //blog

  //http://localhost:8000/blog

  export const getBlog = () => async (dispatch) => {
    try {
        const res = await axios.get("https://disenosys-dkhj.onrender.com/api/blog/data");
        const getData = res.data;
        dispatch(getBlogData(getData));
    } catch (error) {
        console.error('Error fetch code:', error);
    }
  }

  export const getCareer = () => async (dispatch) => {
    try{
      const res = await axios.get("https://disenosys-dkhj.onrender.com/careerdata");
      const getData = res.data;
      dispatch(getCareerData(getData));
    }catch(error){
      console.error('Error fetch code:', error);
    }
  }