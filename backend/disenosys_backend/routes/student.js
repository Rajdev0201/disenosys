const express = require('express');
const router = express.Router();
const Code = require('../models/code.js');
const Student = require('../models/students.js');
const nodemailer = require('nodemailer');

router.post('/login', async (req, res) => {
    const { name, email, code } = req.body;
    
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
        });

        const savedStudent = await student.save();

        res.json({ 
            message: 'Login successful, you can attend the quiz.', 
            user: savedStudent 
        });

    } catch (error) {
        res.status(400).json({ error: 'Login failed' });
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
  
      await student.save();
      await sendResultEmail(student.email, student.name, totalScore, percentage);
  
      res.status(200).json({ message: "Quiz results updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
});
  
  

module.exports = router;
