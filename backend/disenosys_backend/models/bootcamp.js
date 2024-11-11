const mongoose = require("mongoose");

const bootcamp = new mongoose.Schema({
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },
    lineItems: [{
      coursename: { type: String, required: true },
      price: { type: Number, required: true },
      totalPrice:{type:Number,required:true}
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
      number:{
        type: String,
          required: true,
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    isPaid: {
      type: Boolean,
      default: false,
  },
  });
  
  module.exports = mongoose.model('bootcamp', bootcamp);


  