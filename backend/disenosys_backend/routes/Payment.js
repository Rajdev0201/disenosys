const express = require("express");
const {  createCheckoutSession, getPlaceOrder } = require("../controllers/Payment.js");

const router = express.Router();


router.post("/checkout-order",createCheckoutSession)
router.get("/getPlaceOrder",getPlaceOrder)



module.exports = router;


