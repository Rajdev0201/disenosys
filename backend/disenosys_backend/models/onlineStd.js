const mongoose = require("mongoose");

const onlineSchema = new mongoose.Schema({
  name: { type: String },     
  email: { type: String }, 
  phone: { type: String }, 
  course: { type: String }, 
  start: { type: String }, 
  end:  { type: String }, 
  status:{type: String },             
}, { timestamps: true }); 

const online = mongoose.model("onlinestd", onlineSchema);
module.exports = online;