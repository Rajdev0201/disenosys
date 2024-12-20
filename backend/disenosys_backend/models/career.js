const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema({
  name: { type: String },                     
  email: { type: String},
  phone: { type: String },
  dob: { type: String },
  gender: { type: String },
  experience: { type: String },
  expmonths:{type:String},
  employee:{type:String},
  current:{type:String},
  cinr:{type:String},
  expected:{type:String},
  einr:{type:String},
  notice:{type:String},
  city:{type:String},
  relocate:{type:String},
  location:{type:String},
  // skills: { type: [String], default: [] },
  companies: [
    {
      companyName: { type: String },
      from: { type: String }, // Start date of employment
      to: { type: String }, // End date of employment
      rows: [
        {
          industry: { type: String },
          domain: { type: String },
          software: { type: String },
          months: { type: String }, // Add month of experience
        },
      ],
    },
  ],
  filePath: { type: String,required:true},
}, { timestamps: true }); 

const career = mongoose.model("career", careerSchema);
module.exports = career;


   