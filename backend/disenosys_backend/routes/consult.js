const express = require("express");
const {  createCheckoutSession, getPlaceOrder, handleRazorpayCallback, getBlockTime, createAmount, getAmount, freeConsult } = require("../controllers/consult.js");


const router = express.Router();


router.post("/checkout-order",createCheckoutSession)
router.post("/freeconsult",freeConsult)
router.post('/handle-razorpay-callback', handleRazorpayCallback);
router.post('/create-amount', createAmount);
router.get('/get-amount', getAmount);
router.get("/getPlaceOrder",getPlaceOrder)
router.get("/getBlockTime",getBlockTime)


module.exports = router;