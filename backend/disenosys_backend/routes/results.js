const express = require('express');
const router = express.Router();
const catia = require("../models/catia");
const Result = require('../models/results');
const nodemailer = require('nodemailer');



router.get('/getcatia', async (req, res) => {
    try {
      const questions = await catia.find();
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
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

module.exports = router;