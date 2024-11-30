const express = require('express');
const router = express.Router();
const catia = require("../models/catia");
const Result = require('../models/results');
const nodemailer = require('nodemailer');
const axios = require('axios');
// const qs = require('qs');
// const { createCanvas, loadImage } = require('canvas');


router.get('/getcatia', async (req, res) => {
    try {
      const questions = await catia.find();
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }ś
  });


//   router.post('/catia', async (req, res) => {
//     const {catiaScore, catiaPercentage } = req.body;
    
//     try {
       
//         const catia = new Result({
//            catiaScore,
//            catiaPercentage
//         });

//         const saveCatia = await catia.save();

//         res.json({ 
//             message: 'Catia exam completed.', 
//             user: saveCatia 
//         });

//     } catch (error) {
//         res.status(400).json({ error: 'exam failed' });
//         console.log(error);
//     }
// });


// router.post('/product', async (req, res) => {
//     const { productScore , productPercentage } = req.body;
    
//     try {
       
//         const product = new Result({
//             productScore ,
//             productPercentage
//         });

//         const saveProduct = await product.save();

//         res.json({ 
//             message: 'Product exam completed.', 
//             user: saveProduct 
//         });

//     } catch (error) {
//         res.status(400).json({ error: 'exam failed' });
//         console.log(error);
//     }
// });


// Backend: Exchange Authorization Code for Access Token



// router.post('/auth/exchangeCodeForToken', async (req, res) => {
//     const { code } = req.body;  // The authorization code from LinkedIn
  
//     if (!code) {
//       return res.status(400).json({ error: 'Authorization code is missing' });
//     }
  
//     const clientId = '86tuwotemzkyou';  
//     const clientSecret = 'WPL_AP1.0tC5x2NKzBmqgcTL.f5A/ug==';  // Replace with your LinkedIn Client Secret
//     const redirectUri = 'http://localhost:3000/results';  // Replace with your redirect URI
    
  
//     try {
//       // Make a POST request to exchange the authorization code for an access token
//       const response = await axios.post(
//         'https://www.linkedin.com/oauth/v2/accessToken', 
//         qs.stringify({
//           grant_type: 'authorization_code',
//           code: code,
//           redirect_uri: redirectUri,
//           client_id: clientId,
//           client_secret: clientSecret
//         }),
//         {
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//           },
//         }
//       );
  
//       const { access_token } = response.data;
     
//       if (access_token) {
//         res.status(200).json({ accessToken: access_token });
//       } else {
//         res.status(400).json({ error: 'Failed to obtain access token' });
//       }
//     } catch (error) {
//         const errorMsg = error.response?.data || error.message;
//         console.error('Token exchange error:', errorMsg);
//         if (error.response?.status === 401) {
//             res.status(401).json({ error: 'Unauthorized. Please reauthorize.' });
//         } else {
//             res.status(500).json({ error: 'Server error during token exchange.' });
//         }
//     }
//   });

//   async function getUserURN(accessToken) {
//     try {
//         // Fetch user profile information
//         const response = await axios.get('https://api.linkedin.com/v2/me', {
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`,
//                 'X-Restli-Protocol-Version': '2.0.0',
//             }
//         });

//         // LinkedIn API returns the user ID under the 'id' field
//         const userURN = response.data.id;
//         // Return the URN in the required format
//         return `urn:li:person:${userURN}`;
//     } catch (error) {
//         // Improved error logging
//         console.error('Error fetching LinkedIn profile:', error.response ? error.response.data : error.message);
//         throw new Error('Unable to fetch LinkedIn user data');
//     }
// }



// router.post('/shareLinkedIn', async (req, res) => {
//     const { accessToken, message } = req.body; 
//     const userURN = await getUserURN(accessToken);
//     if (!userURN) {
//         throw new Error('Invalid user URN');
//     }

//     const url = 'https://api.linkedin.com/v2/ugcPosts';
//     const headers = {
//       'Authorization': `Bearer ${accessToken}`,
//       'X-Restli-Protocol-Version': '2.0.0',
//       'Content-Type': 'application/json',
//     };
  
//     const postBody = {
//       author: userURN, 
//       lifecycleState: 'PUBLISHED',
//       specificContent: {
//         'com.linkedin.ugc.ShareContent': {
//           shareCommentary: {
//             text: message,
//           },
//           shareMediaCategory: 'NONE',
//         },
//       },
//       visibility: {
//         'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
//       },
//     };
  
//     try {
//       const response = await axios.post(url, postBody, { headers });
//       res.status(200).json({ message: 'Post shared successfully!', data: response.data });
//     }  catch (error) {
//         console.error('Post sharing error:', error.message);
//         res.status(500).json({ error: error.message });
//     }

//   });
  
  


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

// Step 4: Share a Post on LinkedIn
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




// Endpoint to register and upload the image, and share the post on LinkedIn
router.post('/api/linkedin/upload', async (req, res) => {
  const { image, userUrn, accessToken, score, level } = req.body;

  // Step 1: Register the image with LinkedIn
  try {
    const registerImageResponse = await axios.post(
      'https://api.linkedin.com/v2/assets?action=registerUpload',
      {
        registerUploadRequest: {
          recipes: ['urn:li:digitalmediaRecipe:feedshare-image'],
          owner: `urn:li:person:${userUrn}`,
          serviceRelationships: [
            {
              relationshipType: 'OWNER',
              identifier: 'urn:li:userGeneratedContent',
            },
          ],
        },
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const asset = registerImageResponse?.data?.value?.asset;
    const uploadUrl = registerImageResponse?.data?.value?.uploadMechanism?.com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest?.uploadUrl;

    if (!asset || !uploadUrl) {
      return res.status(400).send('Error registering image or missing upload URL');
    }

    // Step 2: Upload the image to LinkedIn
    await axios.post(uploadUrl, image, {
      headers: {
        'Content-Type': 'image/png',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Step 3: Create and share the post
    const postBody = {
      author: `urn:li:person:${userUrn}`,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: `I scored ${score}% in my recent quiz! Level: ${level} #quiz #Learning`,
          },
          shareMediaCategory: 'ARTICLE',
          media: [
            {
              status: 'READY',
              description: {
                text: 'Check out my score and learn more about automotive design quiz.',
              },
              originalUrl: 'https://www.disenosys.com/quicktest',
              title: {
                text: 'CEFR Quiz Score',
              },
              mediaUrl: image, // Use base64 image URL here
            },
          ],
        },
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
      },
    };

    // Step 4: Share the post on LinkedIn
    await axios.post('https://api.linkedin.com/v2/ugcPosts', postBody, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    res.status(200).send('Post shared successfully');
  } catch (error) {
    console.error('Error processing LinkedIn post:', error);
    res.status(500).send('Error processing LinkedIn post');
  }
});











// router.post("/share", async (req, res) => {
//   const { authorization } = req.headers;
//   const { score, postBody } = req.body;
//   console.log("Received postBody:", postBody);

//   if (!postBody || !postBody.specificContent || !postBody.specificContent["com.linkedin.ugc.ShareContent"]) {
//       return res.status(400).json({ error: "Invalid post body structure" });
//   }

//   // Generate the image with the score if needed
//   const base64Image = await generateImageWithScore(score);

//   // Update the postBody with the generated image
//   postBody.specificContent["com.linkedin.ugc.ShareContent"].media[0].originalUrl = base64Image;

//   try {
//       const response = await axios.post("https://api.linkedin.com/v2/ugcPosts", postBody, {
//           headers: {
//               Authorization: authorization,
//               "Content-Type": "application/json",
//               "X-Restli-Protocol-Version": "2.0.0"
//           }
//       });

//       res.status(201).json({ message: "Post shared successfully!", data: response.data });
//   } catch (error) {
//       console.error("Error sharing post:", error.response?.data || error.message);
//       res.status(500).json({ error: "Failed to share post", details: error.message });
//   }
// });


// // Helper function to generate the image with the score
// async function generateImageWithScore(score) {
//     const canvas = createCanvas(600, 400);
//     const ctx = canvas.getContext('2d');
//     const background = await loadImage('path_to_background_image.png'); // or use a default background
//     ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
//     ctx.font = '40px Arial';
//     ctx.fillStyle = 'white';
//     ctx.fillText(`Score: ${score}`, 50, 50); // Position the score
//     return canvas.toDataURL(); // Returns base64 string of the image
// }












module.exports = router;