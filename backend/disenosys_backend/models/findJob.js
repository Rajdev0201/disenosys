const mongoose = require("mongoose");
const findJobSchema = new mongoose.Schema({
     title:{type:String,required:true},
     description:{type:String,required:true},
     logo:{type:String,required:true},
     companyName:{type:String,required:true},
     type:{type:String,required:true},
     location:{type:String,required:true},
     experience:{type:String,required:true},
     level:{type:String,required:true},
     salary:{type:String,required:true},
     jobPosted:{type:String,required:true},
     jobExpire:{type:String,required:true},
}, { timestamps: true });


const FindJob = mongoose.model("findJob", findJobSchema);
module.exports = FindJob;