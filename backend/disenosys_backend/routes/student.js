const express = require('express');
const router = express.Router();
const Code = require('../models/code.js');
const Student = require('../models/students.js');
const nodemailer = require('nodemailer');
const XLSX = require('xlsx');
const { format,isValid } = require('date-fns');

router.post('/login', async (req, res) => {
    const { name, email, code,mobile } = req.body;
    
    try {
        const foundCode = await Code.findOne({ code });
        if (!foundCode) {
            return res.status(400).json({ error: 'Invalid code' });
        }
        
        if (foundCode.userType === 'external') {
            const currentDate = new Date();
            if (foundCode.expiresAt && foundCode.expiresAt <= currentDate) {
                return res.status(400).json({ error: 'The code has expired.' });
            }
        }

        let existingStudent = await Student.findOne({ email });

        if (existingStudent) {


            if (existingStudent.attendedQuiz === true) {
                return res.status(400).json({ error: 'You have already attended the quiz.' });
            }

            return res.json({
                message: 'Welcome back! You can attend the quiz.',
                user: existingStudent,
            });
        }

        const student = new Student({
            name,
            email,
            college: foundCode.college,
            userType: foundCode.userType,
            codeUsed: code,
            mobile
        });

        const savedStudent = await student.save();

        res.json({ 
            message: 'Login successful, you can attend the quiz.', 
            user: savedStudent 
        });

    } catch (error) {
        res.status(400).json({ error: 'Login failed' });
        console.log(error);
    }
});




const sendResultEmail = async (studentEmail, studentName, totalScore, percentage) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'rajkumarprjpm@gmail.com', 
        pass: 'eztbnuzrbwxocizk',
      }
    });
  

    const mailOptions = {
      from: 'rajkumarprjpm@gmail.com',
      to: studentEmail,
      subject: 'Your Quiz Results From Disenosys',
      html: `
        <h2>Hello ${studentName},</h2>
        <p>Here are your quiz results:</p>
        <table border="1" cellpadding="5" cellspacing="0">
          <thead>
            <tr>
              <th>Total Score</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${totalScore}</td>
              <td>${percentage}%</td>
            </tr>
          </tbody>
        </table>
        <p>Best of luck for your future quizzes!</p>
      `
    };
  
    // Send the email
    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  

  
router.post('/updateStudentQuiz', async (req, res) => {
    const { studentId, totalScore, percentage } = req.body;
  
    try {
      const student = await Student.findById(studentId);
  
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
  
    //   student.quizResults = quizResults;
      student.totalScore = totalScore;
      student.percentage = percentage;
      student.attendedQuiz = true;
      student. quizFinishTime = Date.now();
  
      await student.save();
      await sendResultEmail(student.email, student.name, totalScore, percentage);
  
      res.status(200).json({ message: "Quiz results updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
});
  
  

module.exports = router;





router.get('/result', async (req, res) => {
  try {
    const result = await Student.find();

    if (!result || result.length === 0) {
      return res.status(400).json({ error: 'No Data is available' });
    }

    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheetData = result.map((student) => {
      // Format the dates only if they are valid
      const createdAtFormatted = isValid(new Date(student.createdAt))
        ? format(new Date(student.createdAt), 'hh:mm a')
        : 'Invalid Date'; // Fallback if the date is invalid

      const quizFinishTimeFormatted = isValid(new Date(student.quizFinishTime))
        ? format(new Date(student.quizFinishTime), 'hh:mm a')
        : 'Invalid Date'; // Fallback if the date is invalid

      return {
        name: student.name,
        email: student.email,
        college: student.college || 'N/A', // Use 'N/A' for null values
        mobile: student.mobile,
        userType: student.userType,
        codeUsed: student.codeUsed,
        attendedQuiz: student.attendedQuiz,
        createdAt: createdAtFormatted,
        percentage: student.percentage,
        quizFinishTime: quizFinishTimeFormatted,
        totalScore: student.totalScore,
      };
    });

    // Create the worksheet from the data
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Results');

    // Write the Excel file to a buffer
    const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    // Set the response headers to download the Excel file
    res.setHeader('Content-Disposition', 'attachment; filename="results.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    // Send the buffer as the response
    res.send(excelBuffer);

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Failed to generate Excel file" });
  }
});

module.exports = router;


module.exports = router;
