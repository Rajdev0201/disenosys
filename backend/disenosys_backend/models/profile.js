const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    filePath: { type: String,required:true },
    name: {
       type:String
      },
      title :{
        type: String, 
      },
      userId: {
        type: String,
        required: true
      },
    lastUpdated: { type: Date, default: Date.now },
});

const ProfilePage = mongoose.model('Profile', profileSchema);

module.exports = ProfilePage;
