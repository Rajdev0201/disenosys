const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  firstName: { type: String },                     
  lastName: { type: String},
  email: { type: String },
  phone: { type: String},
  country: { type: String},
  dob: { type: String},
  catiaScore: { type: Number },
  catiaPercentage: { type: Number },
  productScore :{ type: Number },
  productPercentage: { type: Number },
}, { timestamps: true }); 

const Result = mongoose.model("result", resultSchema);
module.exports = Result;
