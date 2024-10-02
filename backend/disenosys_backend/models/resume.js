const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  filePath: { type: String, required: true },
});

module.exports = mongoose.model('Resume', resumeSchema);
