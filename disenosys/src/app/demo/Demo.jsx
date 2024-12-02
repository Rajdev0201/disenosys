"use client"
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";


const LinkedInAuth = () => {
    const [accessToken, setAccessToken] = useState("");
    const [userUrn, setUserUrn] = useState("");
    const yourScore = 85;

    const startLinkedInAuth = async () => {
        try {
          const { data } = await axios.get(
            "https://disenosys-1.onrender.com/exam/auth"
          );
          window.location.href = data.url;
        } catch (error) {
          console.error("Error starting LinkedIn auth:", error);
        }
      };
    
      // Exchange authorization code for an access token
      const exchangeCodeForToken = async (code) => {
        try {
          const { data } = await axios.post(
            "https://disenosys-1.onrender.com/exam/get-access-token",
            {
              code,
            }
          );
    
          if (data && data.accessToken) {
            setAccessToken(data.accessToken);
            alert("Access token obtained successfully!");
;
          } else {
            console.error("Access token not obtained");
          }
        } catch (error) {
          console.error(
            "Error exchanging code for token:",
            error.response?.data || error.message
          );
        }
      };
    
      const getProfile = async () => {
        if (!accessToken) return;
    
        try {
          const { data } = await axios.get(
            "https://disenosys-1.onrender.com/exam/profile",
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );
    
          setUserUrn(data.profile.sub);
          console.log("Profile data:", data.profile.sub);
  
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };
      
      
      const sharePost = async () => {
        const imageUrl = "https://via.placeholder.com/800x400.png?text=Dummy+Image"; 
    
        const postBody = {
            imageUrl: imageUrl,  // Image URL to be sent to the backend
            commentary: `I scored ${yourScore}% in my recent quiz! #quiz #Learning`,
            userUrn: userUrn,
            yourScore: yourScore,
        };
    
        try {
            // Send the post data to your backend
            await axios.post("http://localhost:8000/exam/share", postBody, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            alert("Post shared successfully with image!");
        } catch (error) {
            console.error("Error sharing post with image:", error);
        }
    };
    
      
    // Automatically detect authorization code from URL and exchange for token
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const code = queryParams.get("code");
        if (code) {
            exchangeCodeForToken(code);
        }
    }, []);

    return (
        <div>
            <div className="score-card">
                {/* Design the score card */}
                <div className="p-4 border rounded shadow-md">
                    <h2 className="text-lg font-semibold">Your Score:</h2>
                    <p className="text-xl font-bold text-green-600">{yourScore}%</p>
                </div>
            </div>

            <button onClick={startLinkedInAuth} className="bg-blue-500">Login with LinkedIn</button>
            <button onClick={getProfile} className="bg-blue-500 ml-2" disabled={!accessToken}>Fetch Profile</button>
            <button onClick={sharePost} className="bg-blue-500 ml-2" disabled={!userUrn}>Share Post</button>
        </div>
    );
};

export default LinkedInAuth;
