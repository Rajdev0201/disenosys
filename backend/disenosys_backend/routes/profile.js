const express = require("express");
const ProfilePage = require("../models/profile.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const router = express.Router();

router.get('/profile/:userId', async (req, res, next) => {
    const { userId } = req.params;

    try {
        // Use findOne to search by userId instead of findById
        const profile = await ProfilePage.findOne({ userId });

        if (!profile) {
            return next(new ErrorHandler('User not found', 404));
        }
      
        res.status(200).json({
            success: true,
            profile
        });
    } catch (error) {
        // Pass the error to the error handler middleware
        return next(new ErrorHandler('Internal server error', 500));
    }
});

module.exports = router;
