"use client"
import axios from 'axios'
import { setprofile } from '../features/editProfile.js';
import { setUpdate } from '../features/currentProfile.js';







export const editProfile = (Data) => async (dispatch) => {
    try {
      const { data } = await axios.post(
         "http://localhost:8000/upload-profile",        
          Data
      );
      dispatch(setprofile(data));
      dispatch(getProfile());
      alert("editProfile has been submitted!!");
    } catch (err) {
       console.log(err);
    }
  };
  

  export const getProfile = () => async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:8000/update/profile`);
      const profileData = res.data.profile; // Access the profile directly
      dispatch(setUpdate(profileData)); // Dispatch the profile object
    } catch (error) {
      console.error('Error getProfile:', error);
    }
  };