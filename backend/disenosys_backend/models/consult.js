const mongoose = require("mongoose");

const consult = new mongoose.Schema({
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },
    lineItems: [{
      coursename: { type: String, required: true },
      price: { type: Number, required: true },
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
      phone:{
        type: String,
          required: true,
      },
      bookedtime:{
        type: String,
        required: true,
      },
      timeZone:{
        type: String,
        required: true,
    },
    bookeddate:{
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
  
  module.exports = mongoose.model('consult', consult);


  