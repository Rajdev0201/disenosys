
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  course: String,
  from: String,
  to: String,
  award: String,
  email: String,
});

module.exports = mongoose.model("certificate", studentSchema);
