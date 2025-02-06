const express = require('express');
const router = express.Router();
const Code = require('../models/course.js');


router.post("/courseadd", async (req, res) => {
    try {
      const {course} = req.body;
      const newContact = new Code({ course });
      await newContact.save();
      res.status(200).json({ success: true, message: "Form submitted successfully!" });
    } catch (error) {
      console.error("Error saving contact:", error);
      res.status(500).json({ success: false, message: "Server error!" });
    }
  });

  router.get("/courseget" ,async (req,res) => {
    try{
        const course = await Code.find();
    
        if(!course){
              return res.status(400).json({ error: 'No Data is available' });
        }
    
        res.status(200).json({
            message: 'Course data is saved',
            data: course,
          });
        }catch(err){
            console.log(err);
            return res.status(500).json({err : "data is not fetched"})
        }
  })

  module.exports = router;