const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  college: { type: String, },
  userType: { type: String, required: true },
  codeUsed: { type: String, required: true },
  attendedQuiz: { type: Boolean, default: false },
//   quizResults: [
//     {
//       questionId: String,
//       answer: String,
//       isCorrect: Boolean,
//       status: String,
//     },
//   ],
  totalScore: { type: Number },
  percentage: { type: Number },
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;