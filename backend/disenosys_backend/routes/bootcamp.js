const express = require("express");
const {  createCheckoutSession, getPlaceOrder, handleRazorpayCallback } = require("../controllers/bootcamp.js");


const router = express.Router();


router.post("/checkout-order",createCheckoutSession)
router.post('/handle-razorpay-callback', handleRazorpayCallback);
router.get("/getPlaceOrder",getPlaceOrder)



module.exports = router;