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



const { createCanvas } = require('canvas');

const fs = require('fs');

router.post("/share", async (req, res) => {
    const { authorization } = req.headers;
    const { commentary, userUrn, yourScore,yourlevel } = req.body;
      console.log(yourScore)
    try {
        
        const imageUrl = await createImageWithScore(yourScore,yourlevel); // Generate image

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
                                text: "GPDX Results",
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


const createImageWithScore = (score,level) => {
    return new Promise((resolve, reject) => {
        const width = 400; 
        const height = 400; 
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#182073';
        ctx.fillRect(0, 0, width, height);

    
        ctx.font = '28px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText('Your Score:', width / 2, 80);
        const marginY = 4;
        ctx.font = 'bold 26px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`${level}`, width / 2, 120 + marginY);


        const centerX = width / 2;
        const centerY = height / 2 + 50 + marginY;
        const circleRadius = 100;

        ctx.beginPath();
        ctx.arc(centerX, centerY, circleRadius, 0, Math.PI * 2);
        ctx.strokeStyle = '#d9d9d9';
        ctx.lineWidth = 15;
        ctx.stroke();

  
        const progress = (score / 100) * Math.PI * 2; 
        ctx.beginPath();
        ctx.arc(centerX, centerY, circleRadius, -Math.PI / 2, progress - Math.PI / 2);
        ctx.strokeStyle = '#f0a500';
        ctx.lineWidth = 15;
        ctx.stroke();

        // const marginTop = 20;
        ctx.font = 'bold 40px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`${score}%`, centerX, centerY + 15);

    
        const imagePath = './output-score-image.png';
        const buffer = canvas.toBuffer('image/png');
        fs.writeFileSync(imagePath, buffer);
        resolve(imagePath); 
    });
};

module.exports = router;