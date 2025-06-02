const express = require('express');
const router = express.Router();
const students = require('../models/onlineStd.js');



router.get("/studentget", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const search = req.query.search || "";

    const skip = (page - 1) * limit;

    // Build search filter
    let filter = {};
    if (search) {
      // Search in fname or email, case-insensitive
      filter = {
        $or: [
          { fname: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      };
    }

    const total = await students.countDocuments(filter);
    const studentsData = await students
      .find(filter)
      .skip(skip)
      .limit(limit);

    if (!studentsData) {
      return res.status(400).json({ error: "No Data is available" });
    }

    res.status(200).json({
      message: "student data is fetched",
      data: studentsData,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "data is not fetched" });
  }
});




  router.delete('/studentdelete/:id', async (req,res) => {
    const { id } = req.params;
    try{
    const fixed = await students.findByIdAndDelete(id);

    res.status(200).json({
        message: 'student data has deleted',
        data: fixed,
      });
    }catch(err){
        console.log(err);
        return res.status(500).json({err : "data is not deleted"})
    }
})

router.put('/studentedit/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body; 
  try {
      const updatedCourse = await students.findByIdAndUpdate(id, updatedData, { new: true });

      if (!updatedCourse) {
          return res.status(404).json({ message: 'student not found' });
      }

      res.status(200).json({
          message: 'student data has been updated',
          data: updatedCourse,
      });
  } catch (err) {
      console.log(err);
      return res.status(500).json({ err: 'Failed to update student data' });
  }
});


router.post("/subrows/:id", async (req, res) => {
  try {
    const { cname, start, end } = req.body;
    const updatedEntry = await students.findByIdAndUpdate(
      req.params.id,
      { $push: { subrows: { cname, start, end } } },
      { new: true }
    );
    res.status(200).json(updatedEntry);
  } catch (error) {
    res.status(500).json({ error: "Failed to add subrow" });
  }
});

router.put("/subrows/:parentId/:subrowId", async (req, res) => {
  try {
    const { cname, start, end } = req.body;
    const updatedEntry = await students.findOneAndUpdate( //updateone students
      { _id: req.params.parentId, "subrows._id": req.params.subrowId },
      {
        $set: {
          "subrows.$.cname": cname,
          "subrows.$.start": start,
          "subrows.$.end": end
        }
      },
      { new: true }
    );
    res.status(200).json(updatedEntry);
  } catch (error) {
    res.status(500).json({ error: "Failed to edit subrow" });
  }
});

router.delete("/subrows/:parentId/:subrowId", async (req, res) => {
  try {
    const updatedEntry = await students.findByIdAndUpdate(
      req.params.parentId,
      { $pull: { subrows: { _id: req.params.subrowId } } },
      { new: true }
    );
    res.status(200).json(updatedEntry);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete subrow" });
  }
});


module.exports = router;