const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: { type: String },     
  email: { type: String }, 
  phone: { type: String }, 
  exp: { type: String }, 
  subject: { type: String },                 
}, { timestamps: true }); 

const teacher = mongoose.model("teachers", teacherSchema);
module.exports = teacher;