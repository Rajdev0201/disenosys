const express = require('express');
const router = express.Router();
const Code = require('../models/code.js');



router.post('/generate-code', async (req, res) => {
    const { college } = req.body;

    const standardizedCollegeName = college.toLowerCase().trim();

    try {
        let existingCode = await Code.findOne({ college: standardizedCollegeName });

        if (existingCode) {
            return res.json({ 
                message: `A code already exists for ${college}.`,
                code: existingCode 
            });
        }

        const code = Math.random().toString(36).substr(2, 8).toUpperCase();

        const newCode = new Code({
            college: standardizedCollegeName,
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




router.post('/generate-external-code', async (req, res) => {
    const { month, year } = req.body;


    const expirationDate = new Date(year, month, 1);
    expirationDate.setDate(1);
    expirationDate.setHours(0, 0, 0, 0);

  
    expirationDate.setMonth(expirationDate.getMonth() + 1);


    const code = Math.random().toString(36).substr(2, 8).toUpperCase();

    const newCode = new Code({
        code,
        userType: 'external',
        expiresAt: expirationDate, 
        college: null
    });

    try {
        await newCode.save();
        res.status(201).json({ code: newCode });
    } catch (error) {
        res.status(500).json({ message: 'Error generating code', error });
    }
});

module.exports = router;
