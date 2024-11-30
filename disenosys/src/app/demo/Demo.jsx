"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import html2canvas from "html2canvas";

const LinkedInAuth = () => {
    const [accessToken, setAccessToken] = useState("");
    const [userUrn, setUserUrn] = useState("");
    const yourScore = 85;

    // Start LinkedIn authentication process
    const startLinkedInAuth = async () => {
        try {
            const { data } = await axios.get("https://disenosys-1.onrender.com/exam/auth");
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
                { code }
            );
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

    // Fetch user profile using the access token
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

    // Capture the score card as an image
    const captureScoreCardImage = () => {
        const scoreCardElement = document.getElementById("score-card"); // Get the score card element

        html2canvas(scoreCardElement).then((canvas) => {
            const imageUrl = canvas.toDataURL(); // Converts the canvas to a base64 image URL

            // Upload image to server/cloud storage
            uploadImageToServer(imageUrl); // Call the function to upload the image
        });
    };

    // Upload the captured image to your server or cloud storage
    const uploadImageToServer = async (imageData) => {
        try {
            const response = await axios.post('https://your-server.com/upload', { image: imageData });
            const imageUrl = response.data.url; // Assuming the server returns the URL of the uploaded image
            sharePost(imageUrl); // Call sharePost with the image URL
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    // Share the post on LinkedIn with the image
    const sharePost = async (imageUrl) => {
        if (!accessToken || !userUrn) {
            alert("Please fetch your profile first!");
            return;
        }

        const postBody = {
            author: `urn:li:person:${userUrn}`,
            lifecycleState: "PUBLISHED",
            specificContent: {
                "com.linkedin.ugc.ShareContent": {
                    shareCommentary: {
                        text: `I scored ${yourScore}% in my recent quiz! #quiz #Learning`,
                    },
                    shareMediaCategory: "IMAGE",
                    media: [
                        {
                            status: "READY",
                            description: {
                                text: "Check out my score and learn more about automotive design quiz.",
                            },
                            originalUrl: "https://www.disenosys.com/quicktest", // Link to your quiz
                            media: {
                                status: "READY",
                                description: {
                                    text: "Image of my quiz score card",
                                },
                                originalUrl: imageUrl, // The URL of the uploaded image
                            },
                        },
                    ],
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
            <div id="score-card" className="score-card">
                {/* Design the score card */}
                <div className="p-4 border rounded shadow-md" style={{ backgroundColor: "red", color: "white" }}>
                    <h2 className="text-lg font-semibold">Your Score:</h2>
                    <p className="text-xl font-bold">{yourScore}%</p>
                </div>
            </div>

            <button onClick={startLinkedInAuth} className="bg-blue-500">Login with LinkedIn</button>
            <button onClick={getProfile} className="bg-blue-500 ml-2" disabled={!accessToken}>Fetch Profile</button>
            <button onClick={captureScoreCardImage} className="bg-blue-500 ml-2" disabled={!userUrn}>
                Share Post
            </button>
        </div>
    );
};

export default LinkedInAuth;
