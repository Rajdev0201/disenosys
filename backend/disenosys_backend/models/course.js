//courseWith -> L&D Team

const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  course: { type: String },                     
}, { timestamps: true }); 

const Course = mongoose.model("courseLD", courseSchema);
module.exports = Course;