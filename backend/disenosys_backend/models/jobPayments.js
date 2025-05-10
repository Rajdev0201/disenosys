const mongoose = require("mongoose");

const jobPaymentSchema = new mongoose.Schema({
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },
    lineItems: [{
      title: { type: String, required: true },
      amount: { type: Number, required: true },
    }],
 
    customerDetails: {
      name: {
          type: String,
          required: true,
      },
      email: {
          type: String,
          required: true,
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    expiredAt: {
      type:Boolean,
      default: false,
    },
    appliedCount:{
      type:Number,
      default:0,
    },
    isPaid: {
      type: Boolean,
      default: false,
  },
  });
  
  module.exports = mongoose.model('jobPayment', jobPaymentSchema);


  