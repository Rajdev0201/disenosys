const express = require("express");
const { createAttendance, getReports } = require("../controllers/attendance");
const router = express.Router();



router.post("/crate-attendance",createAttendance);
router.get("/get-attendance",getReports);

module.exports = router;