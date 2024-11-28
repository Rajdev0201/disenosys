"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";

const LinkedInAuth = () => {
    const [accessToken, setAccessToken] = useState("")
    const [userUrn, setUserUrn] = useState("");

    // Start the LinkedIn OAuth flow
    const startLinkedInAuth = async () => {
        try {
            const { data } = await axios.get("https://disenosys-1.onrender.com/exam/auth");
            window.location.href = data.url; // Redirect user to LinkedIn for authentication
        } catch (error) {
            console.error("Error starting LinkedIn auth:", error);
        }
    };

    // Exchange authorization code for an access token
    const exchangeCodeForToken = async (code) => {
        try {
            const { data } = await axios.post("https://disenosys-1.onrender.com/exam/get-access-token", {
                code,
            });
            
            if (data && data.accessToken) {
                setAccessToken(data.accessToken);
                alert("Access token obtained successfully!");
            } else {
                console.error("Access token not obtained");
            }
        } catch (error) {
            console.error("Error exchanging code for token:", error.response?.data || error.message);
        }
    };
    
    const getProfile = async () => {
        if (!accessToken) return;
    
        try {
            const { data } = await axios.get("https://disenosys-1.onrender.com/exam/profile", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
    
            setUserUrn(data.profile.sub); 
            console.log("Profile data:", data.profile.sub);
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };
    
    // Share a post to LinkedIn
    const sharePost = async () => {
        if (!accessToken || !userUrn) {
            alert("Please fetch your profile first!");
            return;
        }

        const postBody = {
            author: `urn:li:person:${userUrn}`,
            lifecycleState: "PUBLISHED",
            specificContent: {
                "com.linkedin.ugc.ShareContent": {
                    shareCommentary: { text: "Hello LinkedIn!" },
                    shareMediaCategory: "NONE",
                },
            },
            visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" },
        };

        try {
            await axios.post("https://disenosys-1.onrender.com/exam/share", postBody, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            alert("Post shared successfully!");
        } catch (error) {
            console.error("Error sharing post:", error);
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
            <button onClick={startLinkedInAuth} className="bg-blue-500">Login with LinkedIn</button>
            <button onClick={getProfile} className="bg-blue-500 ml-2" disabled={!accessToken}>
                Fetch Profile
            </button>
            <button onClick={sharePost} className="bg-blue-500 ml-2" disabled={!userUrn}>
                Share Post
            </button>
        </div>
    );
};

export default LinkedInAuth;
