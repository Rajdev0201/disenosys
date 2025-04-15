const express = require("express");
const router = express.Router();
const Enroll = require("../models/enroll.js");


router.post("/post", async (req, res) => {
  try {
    const { name, email, phone} = req.body;
    const newContact = new Enroll({ name, email, phone});
    await newContact.save();
    res.status(200).json({ success: true, message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ success: false, message: "Server error!" });
  }
});


module.exports = router;
