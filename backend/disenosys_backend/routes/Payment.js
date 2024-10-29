const express = require("express");
const {  createCheckoutSession, getPlaceOrder, handleRazorpayCallback } = require("../controllers/Payment.js");
const CheckoutSession = require('../models/Payment.js');
const nodemailer = require('nodemailer');

const router = express.Router();


router.post("/checkout-order",createCheckoutSession)
router.post('/handle-razorpay-callback', handleRazorpayCallback);
router.get("/getPlaceOrder",getPlaceOrder)





const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'rajkumarprjpm@gmail.com',
    pass: 'eztbnuzrbwxocizk',
  }
});

router.patch('/toggleCode/:id', async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;

  try {
    const updatedCode = await CheckoutSession.findByIdAndUpdate(
      id,
      { isActive: isActive },
      { new: true }
    );

    if (!updatedCode) {
      return res.status(400).json({ error: "Valid payment!" });
    }
    const itemRows = updatedCode.lineItems
        .map(item => `<tr><td style="padding: 10px; border: 1px solid #ddd; text-align: left;">${item.name}</td><td style="padding: 10px; border: 1px solid #ddd; text-align: right;">₹${item.totalPrice}</td></tr>`)
        .join('');

    if (isActive) {
      const mailOptions = {
        from: 'rajkumarprjpm@gmail.com',
        to: updatedCode.customerDetails.email,
        subject: 'Your Course Has Been Activated!',
        html: `
          <div style="font-family: Arial, sans-serif; color: #333;">
      <div style="background-color: #f2f4f6; padding: 20px; text-align: center;">
        <h1 style="color: #0d6efd; margin: 0;">Course Activation Notice</h1>
      </div>
      <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; max-width: 600px; margin: 20px auto; box-shadow: 0px 4px 12px rgba(0,0,0,0.1);">
        <h2 style="color: #333;">Dear ${updatedCode.customerDetails.name},</h2>
        <p style="font-size: 16px; color: #666;">We are pleased to inform you that your course has been <strong>activated</strong> by our admin team.</p>
        
        <div style="background-color: #f9f9f9; padding: 10px 20px; border-left: 4px solid #0d6efd; margin: 20px 0; border-radius: 4px;">
          <p style="font-size: 16px; margin: 0;"><strong>Session ID:</strong> ${updatedCode.sessionId}</p>
          <p style="font-size: 16px; margin: 0;"><strong>Status:</strong> Active</p>
        </div>

         <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background-color: #f9f9f9;">
                    <thead>
                        <tr style="background-color: #4a90e2; color: #fff;">
                            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Course Name</th>
                            <th style="padding: 10px; border: 1px solid #ddd; text-align: right;">Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemRows}
                    </tbody>
                </table>
        <p style="font-size: 16px; color: #666;">Thank you for choosing us for your learning journey. We look forward to providing you with a valuable experience.</p>
        
        <p style="font-size: 16px; color: #333;">Best regards,</p>
        <p style="font-size: 16px; color: #0d6efd; font-weight: bold;">The Admin Team</p>
      </div>
      <div style="text-align: center; padding: 10px; font-size: 12px; color: #999;">
        <p style="margin: 0;">&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </div>
        `
      };

    
      await transporter.sendMail(mailOptions);

      res.status(200).json({ success: true, data: updatedCode, message: `You get the Active token` });
    } else {
      res.status(200).json({ success: true, data: updatedCode, message: `You get the DeActive token` });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;





