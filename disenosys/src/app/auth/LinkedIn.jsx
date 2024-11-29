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
        "https://disenosys-1.onrender.com/auth"
      );
      window.location.href = data.url;
    } catch (error) {
      console.error("Error starting LinkedIn auth:", error);
      setError("Error starting LinkedIn login process.");
    }
  };

  const exchangeCodeForToken = async (code) => {
    try {
      const { data } = await axios.post(
        "https://disenosys-1.onrender.com/get-access-token",
        { code },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (data && data.accessToken) {
        setAccessToken(data.accessToken);

        // Fetch user profile using the access token
        const {profileResponse} = await axios.get(
          "https://disenosys-1.onrender.com/profile",
          {
            headers: { Authorization: `Bearer ${data.accessToken}` },
          }
        );
        console.log(profileResponse.data)

        if (profileResponse.data) {
          const { name, email } = profileResponse.data;
          console.log(name)
          dispatch(LinkedInLog(profileResponse.data));
          localStorage.setItem("profile", JSON.stringify({ name, email }));
          alert("Logged in successfully!");
        } else {
          console.error("Profile data not obtained");
          setError("Error retrieving profile data.");
        }
      } else {
        console.error("Access token not obtained");
        setError("Access token not received from server.");
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
