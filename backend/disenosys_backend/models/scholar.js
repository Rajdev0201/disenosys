const mongoose = require("mongoose");

const scholarshipSchema = new mongoose.Schema({
  fname: { type: String }, 
  lname: { type: String },                                         
  email: { type: String},
  phone: { type: String },
  cname: { type: String},
  date: { type: String},
  sub: { type: String},
  total: { type: String},
}, { timestamps: true }); 

const scholarship = mongoose.model("scholarship", scholarshipSchema);
module.exports = scholarship;