const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  course: {type: String, required: true},
  Completion: {type: String, required: true},
  Udin: {type: String, required: true},
}, { timestamps: true }); 
const ExamC = mongoose.model("coursecertificate", courseSchema);

module.exports = ExamC;
