const express = require("express");
const router = express.Router();
const Contact = require("../models/scholar");
const nodemailer = require("nodemailer");

const otpStore = {};

router.post("/post", async (req, res) => {
  try {
    const { fname, lname, email, phone, cname,date,sub,total } = req.body;
    const newContact = new Contact({ fname, lname, email, phone, cname,date,sub,total });
    await newContact.save();
    res.status(200).json({ success: true, message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ success: false, message: "Server error!" });
  }
});

  const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com', 
     port: 587,                 
     secure: false,   
     auth: {
      user: 'classes@disenosys.com',
      pass: 'xnccsypkfhfpymwg',
    }
     });
  
  router.post("/send-otp", async (req, res) => {
    const { email } = req.body;
  
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }
  
    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[email] = otp; 

    const mailOptions = {
      from: "classes@disenosys.com",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}. It will expire in 5 minutes.`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      res.json({ success: true, message: "OTP sent successfully!" });
    } catch (error) {
      console.error("Error sending OTP email:", error);
      res.status(500).json({ success: false, message: "Failed to send OTP" });
    }
  });
  
  router.post("/verify-otp", (req, res) => {
    const { email, otp } = req.body;
  
    if (otpStore[email] && otpStore[email] == otp) {
      delete otpStore[email];
      res.json({ success: true, message: "OTP verified successfully!" });
    } else {
      res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }
  });

module.exports = router;
