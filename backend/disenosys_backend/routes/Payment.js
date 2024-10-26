const express = require("express");
const {  createCheckoutSession, getPlaceOrder, handleRazorpayCallback } = require("../controllers/Payment.js");
const CheckoutSession = require('../models/Payment.js');

const router = express.Router();


router.post("/checkout-order",createCheckoutSession)
router.post('/handle-razorpay-callback', handleRazorpayCallback);
router.get("/getPlaceOrder",getPlaceOrder)

router.patch('/toggleCode/:id', async (req, res) => {
    const { id } = req.params;
    const { isActive } = req.body;
  
    try {
      const updatedCode = await CheckoutSession.findByIdAndUpdate(
        id,
        { isActive :  isActive },
        { new: true }
      );
  
      if (!updatedCode) {
        return res.status(400).json({ error: "valid payment!" });
      }
     if(isActive){
      res.status(200).json({ success: true, data: updatedCode ,message:`You get the Active token`});
     }else{
      res.status(200).json({ success: true, data: updatedCode ,message:`You get the DeActive token`});
     }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server error" });
    }
  });

module.exports = router;


