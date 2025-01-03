const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    filePath: { type: String,required:true },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
      required: true
    },
      title :{
        type: String,required:true 
      },
      description:{
        type:String,
        required:true
      },
    lastUpdated: { type: Date, default: Date.now },
});

const PortfolioPage = mongoose.model('Portfolio',  portfolioSchema);

module.exports = PortfolioPage;