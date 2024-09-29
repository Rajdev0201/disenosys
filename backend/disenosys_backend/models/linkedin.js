const mongoose = require('mongoose');

const linkedinSchema = new mongoose.Schema({

  name:{
    type:String,
    unique:true
  },
  email: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('linkedin', linkedinSchema);
