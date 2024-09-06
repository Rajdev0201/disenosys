const mongoose = require("mongoose")



const cartSchema = new mongoose.Schema({
    courseId: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      },
      img: {
        type: String
      },
      totalPrice : {
        type: Number
      },
})
cartSchema.pre('save', function (next) {
  this.totalPrice = this.price * this.quantity;
  next();
});

module.exports = mongoose.model("cart",cartSchema)
