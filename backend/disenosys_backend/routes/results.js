const express = require('express');
const router = express.Router();
const catia = require("../models/catia");
const Result = require('../models/results');
const nodemailer = require('nodemailer');
const axios = require('axios');



router.get('/getcatia', async (req, res) => {
    try {
      const questions = await catia.find();
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }ś
  });




const sendResultEmail = async (studentEmail, studentName, catiaScore, productScore, totalScore) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com', 
        port: 587,
        secure: false,   
        auth: {
            user: 'classes@disenosys.com',
            pass: 'xnccsypkfhfpymwg',
        }
    });

    // Assuming full score for both Catia and Product is 100 for percentage calculation
    const totalPossibleScore = 100;
    
    // Calculate percentages
    const catiaPercentage = ((catiaScore / totalPossibleScore) * 100).toFixed(2);
    const productPercentage = ((productScore / totalPossibleScore) * 100).toFixed(2);
    const totalPercentage = ((totalScore / totalPossibleScore) * 100).toFixed(2);

    const mailOptions = {
        from: 'classes@disenosys.com',
        to: studentEmail,
        subject: 'Your Quiz Results From Disenosys',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #f0f0f0; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
                <!-- Header -->
                <div style="background-color: #182073; padding: 20px; text-align: center; color: #fff;">
                    <img src="https://www.disenosys.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.d25c986e.png&w=384&q=75" alt="Disenosys Logo" style="max-width: 150px; margin-bottom: 10px;">
                    <h1 style="font-size: 24px; margin: 0;">Quiz Results</h1>
                </div>

                <!-- Body -->
                <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; max-width: 600px; margin: 20px auto; box-shadow: 0px 4px 12px rgba(0,0,0,0.1);">
                    <h2 style="color: #333;">Dear ${studentName},</h2>
                    <p style="font-size: 16px; color: #666;">We are excited to share your quiz results with you. Here’s a summary:</p>
                    
                    <!-- Results Table -->
                    <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background-color: #f9f9f9;">
                        <thead>
                            <tr style="background-color: #182073; color: #fff;">
                                <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Category</th>
                                <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Score</th>
                                <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding: 10px; border: 1px solid #ddd;">Catia</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">${catiaScore}</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">${catiaPercentage}%</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border: 1px solid #ddd;">Product</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">${productScore}</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">${productPercentage}%</td>
                            </tr>
                            <tr style="background-color: #f0f0f0;">
                                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Total Score</td>
                                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">${totalScore}</td>
                                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">${totalPercentage}%</td>
                            </tr>
                        </tbody>
                    </table>

                    <p style="font-size: 16px; color: #666;">We appreciate your efforts and encourage you to keep up the great work! Feel free to reach out for any assistance.</p>
                    
                    <p style="font-size: 16px; color: #333;">Best regards,</p>
                    <p style="font-size: 16px; color: #0d6efd; font-weight: bold;">The Disenosys Team</p>
                </div>

                <!-- Footer -->
                <div style="text-align: center; padding: 10px; font-size: 12px; color: #999;">
                    <p style="margin: 0;">&copy; ${new Date().getFullYear()} Disenosys. All rights reserved.</p>
                </div>
            </div>
        `,
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};


router.post('/details', async (req, res) => {
    const {firstName,lastName,email,phone,country,dob, catiaScore = 0,
        catiaPercentage = 0,
        productScore = 0,
        productPercentage = 0,} = req.body;
    console.log(req.body)
    try {
       
        const details = new Result({
           firstName,
           lastName,
           email,
           phone,
           country,
           dob,
           catiaScore: Number(catiaScore),
           catiaPercentage: Number(catiaPercentage),
           productScore: Number(productScore),
           productPercentage: Number(productPercentage),
        });
        const totalScore = (Number(catiaScore) + Number(productScore)) / 2;
        const saveCatia = await details.save();
        await sendResultEmail(saveCatia.email, saveCatia.firstName, saveCatia.catiaScore,saveCatia.productScore,totalScore);
        res.json({ 
            message: 'details has completed.', 
            user: saveCatia 
        });

    } catch (error) {
        res.status(400).json({ error: 'Login failed' });
        console.log(error);
    }
});




// LinkedIn API Configuration
const CLIENT_ID = '86tuwotemzkyou';
const CLIENT_SECRET = 'WPL_AP1.0tC5x2NKzBmqgcTL.f5A/ug==';
const REDIRECT_URI = 'https://www.disenosys.com/results';


// Step 1: Generate Authorization URL
router.get("/auth", (req, res) => {
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
  )}&scope=openid%20profile%20email%20w_member_social`;
  res.json({ url: authUrl });
});


// Step 2: Exchange Authorization Code for Access Token
router.post("/get-access-token", async (req, res) => {
  const { code } = req.body; 

  try {
    const response = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
      params: {
        grant_type: "authorization_code",
        code : code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret:CLIENT_SECRET,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const tokenData = response.data;
   console.log(tokenData);
      // On success, return the access token
      res.json({ accessToken: tokenData.access_token });
  } catch (error) {
      console.error("Error getting access token:", error.response?.data || error.message);
      res.status(500).json({ error: "Failed to get access token" });
  }
});


// Step 3: Fetch User's LinkedIn Profile (URN)
router.get("/profile", async (req, res) => {
    const { authorization } = req.headers;

    try {
        const response = await axios.get("https://api.linkedin.com/v2/userinfo", {
            headers: { Authorization: authorization }
        });

        const urn = `urn:li:person:${response.data.id}`;
        res.json({ urn, profile: response.data });
    } catch (error) {
        console.error("Error fetching profile:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch profile" });
    }
});

//Step 4: Share a Post on LinkedIn
// router.post("/share", async (req, res) => {
//     const { authorization } = req.headers;
//     const postBody = req.body;

//     try {
//         const response = await axios.post("https://api.linkedin.com/v2/ugcPosts", postBody, {
//             headers: {
//                 Authorization: authorization,
//                 "Content-Type": "application/json",
//                 "X-Restli-Protocol-Version": "2.0.0"
//             }
//         });

//         res.status(201).json({ message: "Post shared successfully!", data: response.data });
//     } catch (error) {
//         console.error("Error sharing post:", error.response?.data || error.message);
//         res.status(500).json({ error: "Failed to share post" });
//     }
// });


// const fetch = require("node-fetch"); 

// router.post("/share", async (req, res) => {
//     const { authorization } = req.headers;
//     const { imageUrl, commentary, userUrn } = req.body;

//     try {
//         // Step 1: Register the image upload with LinkedIn API
//         const imageUploadResponse = await axios.post(
//             "https://api.linkedin.com/v2/assets?action=registerUpload",
//             {
//                 registerUploadRequest: {
//                     recipes: ["urn:li:digitalmediaRecipe:feedshare-image"],
//                     owner: `urn:li:person:${userUrn}`,
//                     serviceRelationships: [
//                         {
//                             relationshipType: "OWNER",
//                             identifier: "urn:li:userGeneratedContent",
//                         },
//                     ],
//                 },
//             },
//             {
//                 headers: {
//                     Authorization: authorization,
//                     "X-Restli-Protocol-Version": "2.0.0",
//                 },
//             }
//         );

//         const imageUrn = imageUploadResponse.data.value.asset; // URN for the uploaded image
//         const uploadUrl = imageUploadResponse.data.value.uploadMechanism[
//             "com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"
//         ].uploadUrl;

//         console.log("Image URN:", imageUrn);
//         console.log("Upload URL:", uploadUrl);

//    //step 2
//         const imageResponse = await fetch(imageUrl);
// const imageBuffer = await imageResponse.buffer();

// const uploadResponse = await axios.put(uploadUrl, imageBuffer, {
//     headers: {
//         "Content-Type": "image/jpeg", // Ensure this matches the image format
//     },
// });
//         console.log("Upload Response:", uploadResponse.status);

//         if (uploadResponse.status !== 201) {
//             throw new Error("Failed to upload image to LinkedIn");
//         }

//         // Step 3: Share the post with the uploaded image
//         const postBody = {
//             author: `urn:li:person:${userUrn}`,
//             lifecycleState: "PUBLISHED",
//             specificContent: {
//                 "com.linkedin.ugc.ShareContent": {
//                     shareCommentary: {
//                         text: commentary,
//                     },
//                     shareMediaCategory: "IMAGE",
//                     media: [
//                         {
//                             status: "READY",
//                             description: {
//                                 text: "Check out my score and learn more about the automotive design quiz.",
//                             },
//                             media: imageUrn,
//                             title: {
//                                 text: "CEFR Quiz Image",
//                             },
//                         },
//                     ],
//                 },
//             },
//             visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" },
//         };

//         const postResponse = await axios.post(
//             "https://api.linkedin.com/v2/ugcPosts",
//             postBody,
//             {
//                 headers: {
//                     Authorization: authorization,
//                     "X-Restli-Protocol-Version": "2.0.0",
//                 },
//             }
//         );

//         console.log("Post Response:", postResponse.data);
//         res.status(201).json({ message: "Post shared successfully!" });
//     } catch (error) {
//         console.error(
//             "Error sharing post:",
//             error.response?.data || error.message
//         );
//         res.status(500).json({ error: "Failed to share post" });
//     }
// });


const { createCanvas } = require('canvas');

const fs = require('fs');

router.post("/share", async (req, res) => {
    const { authorization } = req.headers;
    const { commentary, userUrn, yourScore } = req.body;

    try {
        // Step 1: Generate an image with the score dynamically using Canvas
        const imageUrl = await createImageWithScore(yourScore); // Generate image

        // Step 2: Register the image upload with LinkedIn API
        const imageUploadResponse = await axios.post(
            "https://api.linkedin.com/v2/assets?action=registerUpload",
            {
                registerUploadRequest: {
                    recipes: ["urn:li:digitalmediaRecipe:feedshare-image"],
                    owner: `urn:li:person:${userUrn}`,
                    serviceRelationships: [
                        {
                            relationshipType: "OWNER",
                            identifier: "urn:li:userGeneratedContent",
                        },
                    ],
                },
            },
            {
                headers: {
                    Authorization: authorization,
                    "X-Restli-Protocol-Version": "2.0.0",
                },
            }
        );

        const imageUrn = imageUploadResponse.data.value.asset; // URN for the uploaded image
        const uploadUrl = imageUploadResponse.data.value.uploadMechanism[
            "com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"
        ].uploadUrl;

        console.log("Image URN:", imageUrn);
        console.log("Upload URL:", uploadUrl);

        // Step 3: Upload the generated image to LinkedIn
        const imageBuffer = fs.readFileSync(imageUrl); // Read the generated image file
        const uploadResponse = await axios.put(uploadUrl, imageBuffer, {
            headers: {
                "Content-Type": "image/png", // Ensure this matches the image format
            },
        });

        console.log("Upload Response:", uploadResponse.status);

        if (uploadResponse.status !== 201) {
            throw new Error("Failed to upload image to LinkedIn");
        }

        // Step 4: Share the post with the uploaded image
        const postBody = {
            author: `urn:li:person:${userUrn}`,
            lifecycleState: "PUBLISHED",
            specificContent: {
                "com.linkedin.ugc.ShareContent": {
                    shareCommentary: {
                        text: commentary,
                    },
                    shareMediaCategory: "IMAGE",
                    media: [
                        {
                            status: "READY",
                            description: {
                                text: "Check out my score and learn more about the automotive design quiz.",
                            },
                            media: imageUrn,
                            title: {
                                text: "CEFR Quiz Image",
                            },
                        },
                    ],
                },
            },
            visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" },
        };

        const postResponse = await axios.post(
            "https://api.linkedin.com/v2/ugcPosts",
            postBody,
            {
                headers: {
                    Authorization: authorization,
                    "X-Restli-Protocol-Version": "2.0.0",
                },
            }
        );

        console.log("Post Response:", postResponse.data);
        res.status(201).json({ message: "Post shared successfully!" });
    } catch (error) {
        console.error("Error sharing post:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to share post" });
    }
});


const createImageWithScore = (score) => {
    return new Promise((resolve, reject) => {
        const width = 800;
        const height = 400;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        // Set background color to #182073
        ctx.fillStyle = '#182073'; // New background color
        ctx.fillRect(0, 0, width, height);

        // Draw a circular background for the score
        const circleRadius = 150;
        const centerX = width / 2;
        const centerY = height / 2;
        ctx.fillStyle = '#f39c12'; // Circle color for score highlight
        ctx.beginPath();
        ctx.arc(centerX, centerY, circleRadius, 0, Math.PI * 2);
        ctx.fill();

        // Add the score text in the center
        ctx.font = '60px Arial'; // Large font size
        ctx.fillStyle = '#fff'; // Text color
        const text = `Score: ${score}%`;

        // Measure the text width to center it horizontally
        const textWidth = ctx.measureText(text).width;
        const textX = centerX - textWidth / 2; // Center the text horizontally
        const textY = centerY + 20; // Slightly below the center

        ctx.fillText(text, textX, textY); // Draw the text on the canvas

        // Save the image as a buffer and store it locally
        const imagePath = './output-score-image.png';
        const buffer = canvas.toBuffer('image/png');
        fs.writeFileSync(imagePath, buffer);
        resolve(imagePath); // Return the path to the saved image
    });
};




// router.post('/linkedin/upload', async (req, res) => {
//     const { image, userUrn, accessToken, score, level } = req.body;

//     try {
//         // Step 1: Register the image with LinkedIn
//         const registerImageResponse = await axios.post(
//             'https://api.linkedin.com/v2/assets?action=registerUpload',
//             {
//                 registerUploadRequest: {
//                     recipes: ['urn:li:digitalmediaRecipe:feedshare-image'],
//                     owner: `urn:li:person:${userUrn}`,
//                     serviceRelationships: [
//                         {
//                             relationshipType: 'OWNER',
//                             identifier: 'urn:li:userGeneratedContent',
//                         },
//                     ],
//                 },
//             },
//             {
//                 headers: { Authorization: `Bearer ${accessToken}` },
//             }
//         );

//         console.log('LinkedIn Register Image Response:', registerImageResponse.data);

//         const asset = registerImageResponse?.data?.value?.asset;
//         const uploadUrl = registerImageResponse?.data?.value?.uploadMechanism?.['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest']?.uploadUrl;

//         if (!asset || !uploadUrl) {
//             return res.status(400).send('Error registering image or missing upload URL');
//         }

//         // Step 2: Upload the image to LinkedIn
//         const uploadImageResponse = await axios.post(uploadUrl, image, {
//             headers: {
//                 'Content-Type': 'image/png', // Ensure this matches your image type
//                 Authorization: `Bearer ${accessToken}`,
//             },
//         });

//         console.log('Image Upload Response:', uploadImageResponse.data);

//         // Step 3: Check asset status to ensure it's ready
//         let assetReady = false;
//         const maxRetries = 5; // Maximum number of retries
//         for (let i = 0; i < maxRetries; i++) {
//             await new Promise(resolve => setTimeout(resolve, 2000)); // wait for 2 seconds

//             const assetStatusResponse = await axios.get(
//                 `https://api.linkedin.com/v2/assets/${asset}`,
//                 { headers: { Authorization: `Bearer ${accessToken}` } }
//             );

//             console.log(`Asset Status (Attempt ${i + 1}):`, assetStatusResponse.data);

//             // Check if the asset is ready
//             if (assetStatusResponse.data.status === 'READY') {
//                 assetReady = true;
//                 break;
//             } else {
//                 console.log(`Asset status is not ready yet. Current status: ${assetStatusResponse.data.status}`);
//             }
//         }

//         if (!assetReady) {
//             return res.status(400).send('Asset is not ready for posting after multiple attempts');
//         }

//         // Step 4: Create and share the post
//         const postBody = {
//             author: `urn:li:person:${userUrn}`,
//             lifecycleState: 'PUBLISHED',
//             specificContent: {
//                 'com.linkedin.ugc.ShareContent': {
//                     shareCommentary: {
//                         text: `I scored ${score}% in my recent quiz! Level: ${level} #quiz #Learning`,
//                     },
//                     shareMediaCategory: 'ARTICLE',
//                     media: [
//                         {
//                             status: 'READY',
//                             description: {
//                                 text: 'Check out my score and learn more about automotive design quiz.',
//                             },
//                             media: asset, // Use the asset ID directly
//                             title: {
//                                 text: 'CEFR Quiz Score' 
//                             }
//                         }
//                     ]
//                 }
//             }
//         };

//         const postResponse = await axios.post(
//             'https://api.linkedin.com/v2/ugcPosts',
//             postBody,
//             {
//                 headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' }
//             }
//         );

//         console.log('Post Response:', postResponse.data);
//         return res.status(201).send('Post created successfully');
//     } catch (error) {
//         console.error('Error processing LinkedIn post:', error.response ? error.response.data : error.message);
//         return res.status(500).send('Error processing LinkedIn post');
//     }
// });










module.exports = router;