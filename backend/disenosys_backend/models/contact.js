const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  fname: { type: String }, 
  lname: { type: String },                                         
  email: { type: String},
  phone: { type: String },
  des: { type: String},
}, { timestamps: true }); 

const Contact = mongoose.model("contact", contactSchema);
module.exports = Contact;