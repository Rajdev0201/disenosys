const mongoose = require("mongoose");

const gpdxSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  score: {type: String, required: true},
  Completion: {type: String, required: true},
}, { timestamps: true }); 
const GpdxC = mongoose.model("gpdxcertificate", gpdxSchema);

module.exports = GpdxC;
