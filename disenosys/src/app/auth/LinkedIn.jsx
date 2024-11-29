"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { LinkedInLog } from "../Redux/features/authSlice.js";

const LinkedInSocialLogin = ({ text }) => {
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
        "https://disenosys-1.onrender.com/exam/get-access-token",
        { code }
      );

      if (data && data.accessToken) {
        setAccessToken(data.accessToken);
        setShowFetchProfilePopup(true); // Show the popup to fetch the profile
        alert("Access token obtained successfully!");
      } else {
        console.error("Access token not obtained");
        setError("Error obtaining access token.");
      }
    } catch (error) {
      console.error(
        "Error exchanging code for token:",
        error.response?.data || error.message
      );
      setError("Error exchanging code for access token.");
    }
  };

  const getProfile = async () => {
    if (!accessToken) {
      alert("Access token is missing. Please try logging in again.");
      return;
    }

    try {
      const { data: profileResponse } = await axios.get(
        "https://disenosys-1.onrender.com/exam/profile",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (profileResponse) {
        const { name, email } = profileResponse.profile; // Ensure correct data structure
        dispatch(LinkedInLog(profileResponse.profile));
        localStorage.setItem("profile", JSON.stringify({ name, email }));
        setShowFetchProfilePopup(false); // Hide the popup after fetching profile
        alert("Profile fetched and logged in successfully!");
      } else {
        console.error("Profile data not obtained");
        setError("Error retrieving profile data.");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError("Error fetching LinkedIn profile.");
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
          {showFetchProfilePopup && (
            <div className="popup">
              <h3>Fetch Profile</h3>
              <p>Click the button below to fetch your LinkedIn profile.</p>
              <button onClick={getProfile}>Fetch Profile</button>
              {error && <p className="error">{error}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LinkedInSocialLogin;
