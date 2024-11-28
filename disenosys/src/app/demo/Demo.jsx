"use client"
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import html2canvas from "html2canvas";  // Library to capture HTML as an image

const LinkedInAuth = () => {
    const [accessToken, setAccessToken] = useState("");
    const [userUrn, setUserUrn] = useState("");
    const scoreCardRef = useRef(null); // Reference to the score card div

    // Score card content
    const score = 85;  // Example score

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
            const { data } = await axios.post("https://disenosys-1.onrender.com/exam/get-access-token", { code });
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

    const generateScoreImage = async () => {
        const canvas = await html2canvas(scoreCardRef.current); // Capture the score card div
        return canvas.toDataURL("image/png"); // Convert it to a base64 image URL
    };

    const sharePost = async () => {
        if (!accessToken || !userUrn) {
            alert("Please fetch your profile first!");
            return;
        }

        // Generate the score image
        const imageUrl = await generateScoreImage();

        const postBody = {
            author: `urn:li:person:${userUrn}`,
            lifecycleState: "PUBLISHED",
            "specificContent": {
                "com.linkedin.ugc.ShareContent": {
                    "shareCommentary": {
                        "text": "Check out my score!"
                    },
                    "shareMediaCategory": "IMAGE", // Share image instead of article
                    "media": [
                        {
                            "status": "READY",
                            "description": {
                                "text": "Here's my scorecard!"
                            },
                            "originalUrl": imageUrl, // Image URL from canvas
                            "title": {
                                "text": "My Score Card"
                            }
                        }
                    ]
                }
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
            <div ref={scoreCardRef} className="score-card">
                {/* Design the score card */}
                <div className="p-4 border rounded shadow-md">
                    <h2 className="text-lg font-semibold">Your Score:</h2>
                    <p className="text-xl font-bold text-green-600">{score}%</p>
                </div>
            </div>

            <button onClick={startLinkedInAuth} className="bg-blue-500">Login with LinkedIn</button>
            <button onClick={getProfile} className="bg-blue-500 ml-2" disabled={!accessToken}>Fetch Profile</button>
            <button onClick={sharePost} className="bg-blue-500 ml-2" disabled={!userUrn}>Share Post</button>
        </div>
    );
};

export default LinkedInAuth;
