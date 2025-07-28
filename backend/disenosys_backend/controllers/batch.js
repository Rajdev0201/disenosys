const Batch = require("../models/batch.js");
const Student = require("../models/onlineStd.js");

exports.createBatch = async (req, res) => {
  let { batch, date, students, topic } = req.body;

  try {
    const existing = await Batch.findOne({ batch });

    if (!existing) {
      if (!date || !students || !topic) {
        return res.status(404).json({ message: "please enter all fields" });
      }

      if (!batch || batch.trim() === "") {
        const lastEntry = await Batch.findOne().sort({ createdAt: -1 });
        if (lastEntry && lastEntry.batch) {
          const match = lastEntry.batch.match(/(\d+)$/);
          const lastNumber = match ? parseInt(match[1]) : 0;
          const nextNumber = lastNumber + 1;
          batch = `batch-${nextNumber}`;
        }
      } else {
        batch = "batch-1";
      }
      const data = new Batch({
        batch: batch,
        date: date,
        topic: topic,
        students: students,
      });
      await data.save();

      // for (const std of students) {
      //   const student = await Student.findOne({ sid: std.sid });
      //   if (student) {
      //     for (let sub of std.subrows) {
      //       const targetSub = student.subrows.find(
      //         (s) => s._id.toString() === sub._id.toString() && s.cname === topic
      //       );
      //       if (targetSub) {
      //         targetSub.start = date;
      //       }
      //     }
      //     await student.save();
      //   }
      // }

      return res.status(201).json({ message: "Create a new batch", data });
    } else {
      existing?.students?.push(...students);
      await existing.save();
      return res
        .status(201)
        .json({ message: "Updated Student records in existing" + batch });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getBatch = async (req, res) => {
  const { batch } = req.query;
  try {
    const data = await Batch.find({ batch: batch });
    console.log(data);
    if (!data) {
      return res.status(404).json({ message: "not fetch the batch" });
    }
    return res.status(200).json({ message: "received data", data });
  } catch (err) {
    console.log(err);
  }
};

exports.getBatchName = async (req, res) => {
    const {course} = req.query;
  try {
    const data = await Batch.find({topic:course}, "batch");
    if (!data) {
      return res.status(404).json({ message: "not fetch the batch" });
    }
    return res.status(200).json({ message: "received data", data });
  } catch (err) {
    console.log(err);
  }
};
