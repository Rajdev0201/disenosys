const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },
    lineItems: [{
      name: { type: String, required: true },
      price: { type: Number, required: true },
      totalPrice:{type:Number,required:true}
    }],
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
    },
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
    mode: { type: String, default: "Online" },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    isActive: { type: Boolean, default: false },
    isPaid: {
      type: Boolean,
      default: false,
  },
  });
  
  module.exports = mongoose.model('payment', paymentSchema);


  