const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
  name: { type: String },                     
  email: { type: String},
  phone: { type: String },
  link: { type: String },
  exp: { type: String },
  bio: { type: String },
  a1:{type:[String]},
  a2:{type:[String]},
  a3:{type:[String]},
  a4:{type:[String]},
  a5:{type:[String]},
  a6:{type:[String]},
  a7:{type:[String]},
  a8:{type:[String]},
  a9:{type:[String]},
  a9:{type:[String]},
  a10:{type:[String]},
  a11:{type:[String]},                   
  course:{type:String},
  automotive:{type:String},
  totalHour:{type:String},
  yearexp:{type:String},
  // component:{type:String},
  brief:{type:String},
 topics: [
    {
      rows: [
        {
          topic: { type: String },
          hours: { type: String },
        },
      ],
    },
  ],
  filePath: { type: String,required:true},
}, { timestamps: true }); 

const mentor = mongoose.model("mentor", mentorSchema);
module.exports = mentor;


   