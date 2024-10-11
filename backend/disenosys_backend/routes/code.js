const express = require('express');
const router = express.Router();
const Code = require('../models/code.js');


router.post('/generate-code', async (req, res) => {
    const { college ,collegeCode} = req.body;
    const standardizedCollegeName = college.toLowerCase().trim();

    try {
        let existingCode = await Code.findOne({ collegeCode });

        if (existingCode) {
            return res.json({ 
                message: `A code already exists for ${existingCode.college}.`,
                code: existingCode 
            });
        }

   
        const code = Math.random().toString(36).substr(2, 8).toUpperCase();

        const newCode = new Code({
            college:standardizedCollegeName,
            collegeCode,
            code,
            userType: 'college', 
            expiresAt: null, 
        });

        await newCode.save();

        res.json({ 
            message: `A new code has been generated for ${college}.`,
            code: newCode 
        });
    } catch (error) {
        res.status(400).json({ error: 'Failed to generate code' });
    }
});





// router.post('/generate-external-code', async (req, res) => {


//     const { month, year } = req.body;


//     const expirationDate = new Date(year, month, 1);
//     expirationDate.setDate(1);
//     expirationDate.setHours(0, 0, 0, 0);

  
//     expirationDate.setMonth(expirationDate.getMonth() + 1);

    

//     try {
//         let existingCode = await Code.findOne({ month });
        
//     if (existingCode) {
//         return res.json({ 
//             message: `A code already exists for ${existingCode.college}.`,
//             code: existingCode 
//         });
//     }

//     const code = Math.random().toString(36).substr(2, 8).toUpperCase();

//     const newCode = new Code({
//         code,
//         userType: 'external',
//         expiresAt: expirationDate, 
//         college: null
//     });

 
//         await newCode.save();
//         res.status(201).json({ code: newCode });
//     } catch (error) {
//         res.status(500).json({ message: 'Error generating code', error });
//     }
// });



//backend 



//backend 


router.post('/generate-external-code', async (req, res) => {
    const { month, year } = req.body;

    // Ensure the month and year are valid
    if (month < 0 || month > 11 || year < 1900) {
        return res.status(400).json({ message: 'Invalid month or year provided.' });
    }

    // Set expiration date to the end of the current month
    const expirationDate = new Date(year, month + 1, 0, 23, 59, 59); // Set to the last moment of the current month

    try {
        // Check for existing code in the specified month
        let existingCode = await Code.findOne({
            userType: 'external',
            expiresAt: {
                $gte: new Date(year, month, 1), // First day of the month
                $lte: expirationDate // Last day of the month
            }
        });

        // If an existing code is found, return it
        if (existingCode) {
            return res.json({
                message: `A code already exists for ${month + 1}/${year}.`,
                code: existingCode
            });
        }

        // Generate new code
        const code = Math.random().toString(36).substr(2, 8).toUpperCase();

        const newCode = new Code({
            code,
            userType: 'external',
            expiresAt: expirationDate,
            college: null
        });

        await newCode.save();
        res.status(201).json({
            message: `A new code has been generated for ${month + 1}/${year}.`,
            code: newCode
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed generating code', error });
    }
});



router.get('/studentCode', async (req,res) => {

    try{
    const student = await Code.find({userType:"college"});

    if(!student){
          return res.status(400).json({ error: 'No Data is available' });
    }

    res.status(200).json({
        message: 'Student data is saved',
        data: student,
      });
    }catch(err){
        console.log(err);
        return res.status(500).json({err : "data is not fetched"})
    }
})


router.get('/externalCode', async (req,res) => {
  
    try{
        const student = await Code.find({userType:"external"});
    
        if(!student){
              return res.status(400).json({ error: 'No Data is available' });
        }
    
        res.status(200).json({
            message: 'External data is saved',
            data: student,
          });
        }catch(err){
            console.log(err);
            return res.status(500).json({err : "data is not fetched"})
        }
})



module.exports = router;
