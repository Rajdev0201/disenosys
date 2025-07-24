const mongoose = require("mongoose");


const attendanceSchema = new mongoose.Schema({
    batch:{
        type:String,
        required:true
    },
    startedDate:{
        type:Date,
        required:true
    },
    updateAttendanceDate:{
        type:String,
        required:true,
    },
    students: [
    {
      sid: String,
      name: String,
      topic:[String],
      status: {
       type: [Boolean],
      default: false
      },
      date:[Date],
    }
  ],

},{timestamps:true})


module.exports = mongoose.model("attendance",attendanceSchema)