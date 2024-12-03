const mongoose = require('mongoose');

const sharedScoreSchema = new mongoose.Schema({
    userUrn: { type: String, required: true },
    name: { type: String, required: true }, 
    email: { type: String, required: true },  
    phone: {type : String,required:true},
    commentary: { type: String, required: true },
    yourScore: { type: Number, required: true },
    yourLevel: { type: String, required: true },
    sharedAt: { type: Date, default: Date.now },
  });
  
  const SharedScore = mongoose.model("SharedScore", sharedScoreSchema);
  module.exports = SharedScore;