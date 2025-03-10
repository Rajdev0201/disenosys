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


  router.delete('/coursedelete/:id', async (req,res) => {
    const { id } = req.params;
    try{
    const fixed = await Code.findByIdAndDelete(id);

    res.status(200).json({
        message: 'Course data has deleted',
        data: fixed,
      });
    }catch(err){
        console.log(err);
        return res.status(500).json({err : "data is not deleted"})
    }
})

router.put('/courseedit/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body; 
  try {
      const updatedCourse = await Code.findByIdAndUpdate(id, updatedData, { new: true });

      if (!updatedCourse) {
          return res.status(404).json({ message: 'Course not found' });
      }

      res.status(200).json({
          message: 'Course data has been updated',
          data: updatedCourse,
      });
  } catch (err) {
      console.log(err);
      return res.status(500).json({ err: 'Failed to update course data' });
  }
});

module.exports = router;