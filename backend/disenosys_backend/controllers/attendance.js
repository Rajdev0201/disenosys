const Attendance = require("../models/attendance")
const Batch = require("../models/batch.js")




exports.createAttendance = async (req,res) => {
    const {batch,startedDate,students,updateAttendanceDate} = req.body;
    console.log(updateAttendanceDate)
    try{
    
        if (
  !batch ||
  !startedDate ||
  !updateAttendanceDate ||
  updateAttendanceDate.trim() === "" ||
  !students ||
  !Array.isArray(students) ||
  students.length === 0 ||
  students.some(student => !student.date || student.date.trim() === "")
) {
  return res.status(400).json({ error: "Please check all fields before submitting..." });
}

    const inputDate = new Date(updateAttendanceDate).toISOString().slice(0, 10)
    
    const existingDate = await Attendance.find({ batch });

    const getDate = existingDate?.map((record) => new Date(record?.updateAttendanceDate).toISOString().slice(0, 10));

    if(getDate.includes(inputDate)) {
     return res.status(400).json({ error: "Attendance already created for this date..." });//same date 
     }
     
      
     const findDate = await Batch.find(
        {
            $or:[
                {batch:batch},
                {date:startedDate}
            ]
        }
     )

    const getBatchDate = findDate.map((record) => 
      new Date(record?.date).toISOString().slice(0, 10) 
    );

    const startedDateInput =  new Date(startedDate).toISOString().slice(0, 10)
     const batchStartDate = getBatchDate[0]; // e.g. "2025-07-25"
    const attendanceDate = startedDateInput;    // e.g. "2025-07-17" 
   console.log(attendanceDate <= batchStartDate || inputDate <= batchStartDate)

    if (attendanceDate < batchStartDate || inputDate < batchStartDate) {
     return res.status(400).json({ error: "Please check your batch started date..." });
   }
//     if(attendanceDate < batchStartDate || inputDate < batchStartDate) {
//      return res.status(400).json({ error: "Please check your batch started date..." });
//    }

   const existing = await Attendance.findOne({ batch });

    if (!existing) {
      // Create new document if not found
      const data = new Attendance({
        batch,
        updateAttendanceDate,
        startedDate,
        students: students.map(std => ({
          ...std,
          topic: [std.topic],
          status: [std.status],
          date: [std.date]
        }))
      });

      await data.save();
      return res.status(201).json({ message: "Attendance created successfully.",data });
    }

    // STEP 3: Update existing attendance
    for (const std of students) {
       const studentIndex = existing.students.findIndex(s => s.sid === std.sid);
      if(studentIndex !== -1) {
         const matchedStudent = existing.students[studentIndex];
       matchedStudent.status.push(std.status);
       matchedStudent.date.push(std.date);
       matchedStudent.topic.push(std.topic);
      } else {
        // New student - add to existing array
        existing.students.push({
          sid: std.sid,
          name: std.name,
          topic: [std.topic],
          status: [std.status],
          date: [std.date]
        });
      }
    }
     existing.updateAttendanceDate = updateAttendanceDate;
    await existing.save();
    return res.status(200).json({ message: "Attendance updated successfully." });

    }catch(err){
        console.log(err);
    }
}


exports.getReports = async (req,res) => {
    const {batch} = req.query;
    try{
        const reports = await Attendance.find({batch:batch});
        if(!reports){
            return res.status(400).json({message:"Im not get the reports"});
        }
        return res.status(200).json({message:"i got reports",reports});
    }catch(err){
       console.log(err)
    }
}