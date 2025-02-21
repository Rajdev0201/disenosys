const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  course: {type: String, required: true},
  score: {type: String, required: true},
}, { timestamps: true }); 
const ExamC = mongoose.model("examcertificate", examSchema);

module.exports = ExamC;
