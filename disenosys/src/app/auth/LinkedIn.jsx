"use client";
// import React, { useCallback, useState } from "react";
// import {   LoginSocialLinkedin } from "reactjs-social-login";
// import { LinkedInLoginButton } from 'react-social-login-buttons';
// import { useDispatch } from "react-redux";
// import { LinkedInLog } from "../Redux/features/authSlice"; 
// import axios from "axios";

// const LinkedIn = () => {
//   const dispatch = useDispatch();

//   const handleLoginSuccess = async (response) => {
//     console.log("LinkedIn Response Data:", response);

//     // Extract user data directly from the response
//     const userName = `${response.firstName} ${response.lastName}`;
//     const userEmail = response.emailAddress; // Ensure email is included in response

//     if (!userName || !userEmail) {
//       console.error("User data is incomplete");
//       return;
//     }

//     try {
//       // Step 3: Send the user information to your backend to save it
//       const serverResponse = await axios.post('http://localhost:8000/api/v1/user/linkedin', {
//         userName,
//         userEmail,
//       });

//       console.log("User data saved:", serverResponse.data);

//       // Dispatch to Redux store
//       dispatch(LinkedInLog(serverResponse.data));

//       // Save user data to local storage
//       localStorage.setItem("profile", JSON.stringify({ userName, userEmail }));

//     } catch (error) {
//       console.error("Error during LinkedIn login flow:", error);
//     }
//   };

//   const handleLoginError = (error) => {
//     console.error("LinkedIn login error:", error);
//   };

//   return (
//     <div>
//       <LoginSocialLinkedin
//         client_id="86mz8rwaet7akp"
//         client_secret="WPL_AP1.LmVZLcEe0gCCOHGT.AhiX0g=="
//         redirect_uri="http://localhost:3000/"
//         scope={["openid profile email"]}
//         onResolve={handleLoginSuccess}
//         onReject={handleLoginError}
//       >
//         <LinkedInLoginButton />
//       </LoginSocialLinkedin>
//     </div>
//   );
// };

// export default LinkedIn;


import React, { useEffect } from 'react';

// LinkedIn OAuth configuration
const LINKEDIN_CLIENT_SECRET = 'WPL_AP1.LmVZLcEe0gCCOHGT.AhiX0g==';
const LINKEDIN_CLIENT_ID = '86mz8rwaet7akp';
const LINKEDIN_CALLBACK_URL = 'http://localhost:3000/'; // Make sure this matches the LinkedIn Developer console

// LinkedIn OAuth URL with updated scopes
const linkedinOAuthURL = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(
  LINKEDIN_CALLBACK_URL
)}&scope=openid%20profile%20email`; // Updated scopes

const LinkedIn = () => {
  


  const handleLogin = async (code) => {
    console.log("Entered handleLogin function"); // Check if this logs
  
    try {
      console.log("Authorization code received:", code); // Check if the code is correctly passed
      
      const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: LINKEDIN_CALLBACK_URL,
          client_id: LINKEDIN_CLIENT_ID,
          client_secret: LINKEDIN_CLIENT_SECRET,
        }),
      });
  
      console.log("Access token response:", response); // Log the response after exchanging the code
  
      const data = await response.json();
      console.log("Parsed access token response:", data);
  
    } catch (error) {
      console.error("Error during LinkedIn login flow:", error); // Catch any errors
    }
  };

  
  const handleLinkedInCallback = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');
    
    console.log("The code:", code); // Log the code to ensure it's being retrieved correctly
    
    if (code) {
      console.log("Calling handleLogin with code:", code);
      handleLogin(code);
    } else {
      console.error("No authorization code found in URL");
    }
  };
  
  useEffect(() => {
    handleLinkedInCallback();
  }, []);

  return (
    <div>
      <a href={linkedinOAuthURL}>Sign in with LinkedIn</a>
    </div>
  );
};

export default LinkedIn;
