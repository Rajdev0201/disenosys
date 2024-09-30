"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { LinkedInLog } from "../Redux/features/authSlice.js";

const LinkedInSocialLogin = ({text,err}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const name = user?.user?.name;
  const LINKEDIN_CLIENT_ID = "86xiq0kdd6l43i"; // Your LinkedIn client ID
  const LINKEDIN_CALLBACK_URL = "https://www.disenosys.com"; // Your registered callback URL
  const linkedinOAuthURL = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(LINKEDIN_CALLBACK_URL)}&scope=openid%20profile%20email`;

  const search = useSearchParams();
  const router = useRouter();
  const code = search.get("code");
  const [hasProcessedCode, setHasProcessedCode] = useState(false);
  const [error, setError] = useState(null);

  const isUserLoggedIn = () => {
    const storedUser = localStorage.getItem("profile");
    return storedUser !== null;
  };

  const sendCodeToBackend = async (code) => {
    try {
      const response = await axios.post(
        "https://disenosys-1.onrender.com/linkedin-login", // Your backend API
        { code },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        const { name, email } = response.data.user;
        dispatch(LinkedInLog(response.data.user));
        localStorage.setItem("profile", JSON.stringify({ name, email }));
        setHasProcessedCode(true); // Mark code as processed
        router.replace(router.pathname); // Clear the code from the URL
      }
    } catch (err) {
      console.error('Error during LinkedIn OAuth process:', err);
      setError("LinkedIn OAuth process failed: " + err.message);
    }
  };

  useEffect(() => {
    if (isUserLoggedIn()) {
      return; // User is already logged in
    }

    if (code && !hasProcessedCode) {
      sendCodeToBackend(code);
    }

    // Clear the code from the URL after processing it
    if (hasProcessedCode) {
      const newURL = window.location.origin + router.pathname;
      window.history.replaceState({}, document.title, newURL); // Clear the code from the URL
    }
  }, [code, hasProcessedCode]); // Watch for code and hasProcessedCode changes
  
  
  useEffect(() => {
    if (isUserLoggedIn()) {
      return;
    }
  
    if (code && !hasProcessedCode) {
      const timer = setTimeout(() => {
        sendCodeToBackend(code);
      }, 500); // Wait for 500ms before sending
  
      return () => clearTimeout(timer); // Cleanup
    }
  
    if (hasProcessedCode) {
      const newURL = window.location.origin + router.pathname;
      window.history.replaceState({}, document.title, newURL);
    }
  }, [code, hasProcessedCode]);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{err}</p>}

      {!isUserLoggedIn() ? (
        <a href={linkedinOAuthURL}>{text}</a>
      ) : (
        // <div>
        //   <h3>Welcome, {name}!</h3>
        // </div>
        ""
      )}
    </div>
  );
};

export default LinkedInSocialLogin;


