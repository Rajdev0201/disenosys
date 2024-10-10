const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
    required: true
  },
  filePath: { type: String, required: true },
});

module.exports = mongoose.model('Resume', resumeSchema);
