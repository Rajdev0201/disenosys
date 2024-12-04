"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { LinkedInLog } from "../Redux/features/authSlice.js";

const LinkedInSocialLogin = ({ text, err }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [showFetchProfilePopup, setShowFetchProfilePopup] = useState(false);

  const isUserLoggedIn = () => {
    const storedUser = localStorage.getItem("profile");
    return storedUser !== null;
  };

  const startLinkedInAuth = async () => {
    try {
      const { data } = await axios.get(
        "https://disenosys-dkhj.onrender.com/auth"
      );
      window.location.href = data.url;
    } catch (error) {
      console.error("Error starting LinkedIn auth:", error);
      setError("Error starting LinkedIn login process.");
    }
  };

 
  const exchangeCodeForToken = async (code) => {
    try {
      // Exchange code for access token
      const { data } = await axios.post(
        "https://disenosys-dkhj.onrender.com/get-access-token",
        { code },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
  
      if (data && data.accessToken) {
        setAccessToken(data.accessToken);
        alert("Access token obtained successfully!");
      } else {
        console.error("Access token not obtained");
      }
  
      // Fetch user profile using the access token
      const { data: profileData } = await axios.get(
        "https://disenosys-dkhj.onrender.com/profile",
        {
          headers: { Authorization: `Bearer ${data.accessToken}` },
        }
      );
  
      if (profileData && profileData.profile) {
        const { name, email } = profileData.profile; // Destructure the profile
        console.log(name);
        dispatch(LinkedInLog(profileData.profile)); // Dispatch the profile to the Redux store
        localStorage.setItem("profile", JSON.stringify({ name, email })); // Store in localStorage
        alert("Logged in successfully!");
      } else {
        console.error("Profile data not obtained");
        setError("Error retrieving profile data.");
      }
  
    } catch (error) {
      console.error("Error exchanging code for token:", error.response?.data || error.message);
      setError("Error exchanging code for access token.");
    }
  };
  

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    if (code) {
      exchangeCodeForToken(code);
    }
  }, []);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{err || error}</p>}

      {!isUserLoggedIn() ? (
        <button onClick={startLinkedInAuth}>{text}</button>
      ) : (
        <div>
          <p>Welcome back! You are logged in.</p>
        </div>
      )}
    </div>
  );
};

export default LinkedInSocialLogin;
