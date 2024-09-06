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
      required: true
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
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  module.exports = mongoose.model('payment', paymentSchema);