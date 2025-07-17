const express = require("express");
const router = express.Router();
const {createBatch, getBatch, getBatchName} = require("../controllers/batch.js")

router.post("/batch-create",createBatch)
router.get("/get-batch",getBatch)
router.get("/get-batchName",getBatchName)
module.exports = router;