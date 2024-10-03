const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    filePath: { type: String},
    name: {
       type:String
      },
      title :{
        type: String, 
      },
      userId: {
        type: String,
      },
    lastUpdated: { type: Date, default: Date.now },
});

const ProfilePage = mongoose.model('Profile', profileSchema);

module.exports = ProfilePage;
