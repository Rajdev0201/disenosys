const express = require('express');
const router = express.Router();
const teacher = require('../models/teachers.js');


router.post("/teacheradd", async (req, res) => {
    try {
      const {name,email,phone,exp,subject} = req.body;
      const newContact = new teacher({ name,email,phone,exp,subject });
      await newContact.save();
      res.status(200).json({ success: true, message: "Form submitted successfully!" });
    } catch (error) {
      console.error("Error saving contact:", error);
      res.status(500).json({ success: false, message: "Server error!" });
    }
 });

router.get("/teacherget" ,async (req,res) => {
    try{
        const course = await teacher.find();
    
        if(!course){
              return res.status(400).json({ error: 'No Data is available' });
        }
    
        res.status(200).json({
            message: 'teacher data is saved',
            data: course,
          });
        }catch(err){
            console.log(err);
            return res.status(500).json({err : "data is not fetched"})
        }
 })

router.delete('/teacherdelete/:id', async (req,res) => {
    const { id } = req.params;
    try{
    const fixed = await teacher.findByIdAndDelete(id);

    res.status(200).json({
        message: 'Teacher data has deleted',
        data: fixed,
      });
    }catch(err){
        console.log(err);
        return res.status(500).json({err : "data is not deleted"})
    }
 })

router.put('/teacheredit/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body; 
  try {
      const updatedCourse = await teacher.findByIdAndUpdate(id, updatedData, { new: true });

      if (!updatedCourse) {
          return res.status(404).json({ message: 'Course not found' });
      }

      res.status(200).json({
          message: 'teacher data has been updated',
          data: updatedCourse,
      });
  } catch (err) {
      console.log(err);
      return res.status(500).json({ err: 'Failed to update course data' });
  }
});


module.exports = router;