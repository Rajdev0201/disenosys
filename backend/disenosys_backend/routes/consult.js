const express = require("express");
const {  createCheckoutSession, getPlaceOrder, handleRazorpayCallback, getBlockTime } = require("../controllers/consult.js");


const router = express.Router();


router.post("/checkout-order",createCheckoutSession)
router.post('/handle-razorpay-callback', handleRazorpayCallback);
router.get("/getPlaceOrder",getPlaceOrder)
router.get("/getBlockTime",getBlockTime)


module.exports = router;