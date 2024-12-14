const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema({
  name: { type: String },                     
  email: { type: String},
  phone: { type: String },
  dob: { type: String },
  gender: { type: String },
  experience: { type: String },
  employee:{type:String},
  current:{type:String},
  expected:{type:String},
  notice:{type:String},
  city:{type:String},
  relocate:{type:String},
  location:{type:String},
  skills: { type: [String], default: [] },
  filePath: { type: String,required:true},
}, { timestamps: true }); 

const career = mongoose.model("career", careerSchema);
module.exports = career;


   