const express = require('express');
const router = express.Router();
const Code = require('../models/code.js');


router.post('/generate-code', async (req, res) => {
    const { college } = req.body;
    
    const code = Math.random().toString(36).substr(2, 8).toUpperCase();

    const newCode = new Code({
        college,
        code,
        userType: 'college', 
        expiresAt: null, 
    });

    try {
        await newCode.save();
        res.json({ code: newCode });
    } catch (error) {
        res.status(400).json({ error: 'Failed to generate code' });
    }
});




router.post('/generate-external-code', async (req, res) => {
    const { month, year } = req.body;


    const expirationDate = new Date(year, month, 1); // Set to the first of the selected month
    expirationDate.setDate(1); // Set to the first of the month
    expirationDate.setHours(0, 0, 0, 0); // Set to midnight

  
    expirationDate.setMonth(expirationDate.getMonth() + 1); // Move to next month

    // Generate a random code
    const code = Math.random().toString(36).substr(2, 8).toUpperCase(); // Generates a random code

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
