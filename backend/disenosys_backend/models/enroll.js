const mongoose = require("mongoose");

const enrollSchema = new mongoose.Schema({
  name: { type: String },                                          
  email: { type: String},
  phone: { type: String },
}, { timestamps: true }); 

const Enroll = mongoose.model("enroll", enrollSchema);
module.exports = Enroll;