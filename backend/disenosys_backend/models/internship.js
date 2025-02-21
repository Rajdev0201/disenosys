const mongoose = require("mongoose");

const internSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  course: {type: String, required: true},
}, { timestamps: true }); 
const internC = mongoose.model("internertificate", internSchema);

module.exports = internC;
