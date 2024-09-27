const CatchAsyncError = require("../middlewares/CatchAsyncError");
const Cart = require("../models/addToCart.js"); 
const ErrorHandler = require("../utils/ErrorHandler");


exports.postCart = CatchAsyncError(async (req, res, next) => {
  const { courseId, name, price, quantity, img ,userName} = req.body;

  const existingItem = await Cart.findOne({ courseId });

  let cartItem;

  if (existingItem) {
    existingItem.quantity += quantity;
    cartItem = await existingItem.save();
  } else {
    cartItem = await Cart.create({
      courseId,
      name,
      price,
      quantity,
      img,
      userName
    });
  }

  res.status(201).json({
    success: true,
    cartItem
  });
});

exports.getCart = CatchAsyncError(async (req, res, next) => {
  const cartItems = await Cart.find();

  res.status(200).json({
    success: true,
    cartItems
  });
});


exports.increament = CatchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const item = await Cart.findById(id);

  if (!item) {
    return next(new ErrorHandler('Item not found', 404));
  }

  item.quantity += 1;
  await item.save();

  res.status(200).json({
    success: true,
    item
  });
});


exports.decreament = CatchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const item = await Cart.findById(id);
  const cart = await cart.find();
  const existItem = cart.find((item) => item.id === id);

  if (!item) {
    return next(new ErrorHandler('Item not found', 404));
  }

  if (existItem.quantity > 1) {
    existItem.quantity -= 1;
    existItem.totalPrice -= existItem.price //500 - 100
    await existItem.save();
  } else {

  }

  res.status(200).json({
    success: true,
    item
  });
});

exports.removeCart = CatchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const item = await Cart.findByIdAndDelete(id);

  if (!item) {
    return next(new ErrorHandler('Item not found', 404));
  }
  res.status(200).json({
    success: true,
    message: 'Item removed successfully',
    deletedItem: item,
  });
});


