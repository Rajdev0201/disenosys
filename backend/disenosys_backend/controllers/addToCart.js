const CatchAsyncError = require("../middlewares/CatchAsyncError");
const Cart = require("../models/addToCart.js"); 
const ErrorHandler = require("../utils/ErrorHandler");


exports.postCart = CatchAsyncError(async (req, res, next) => {
  const { courseId, name, price, quantity, img, userName } = req.body;
  console.log("Received request body:", req.body);  // Log the incoming data

  // Validate input data
  if (!courseId || !name || !price || !quantity || !img || !userName) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields in request body."
    });
  }

  try {
    // Check if the course already exists in the cart for the user
    const existingItem = await Cart.findOne({ courseId, userName });

    let cartItem;

    if (existingItem) {
      // If the course already exists, update the quantity
      existingItem.quantity += quantity;
      cartItem = await existingItem.save();
    } else {
      // Otherwise, create a new cart item
      cartItem = await Cart.create({
        courseId,
        name,
        price,
        quantity,
        img,
        userName
      });
    }

    console.log("Cart item saved successfully:", cartItem);
    
    res.status(201).json({
      success: true,
      cartItem
    });
  } catch (error) {
    console.error("Error saving to the database:", error);
    return res.status(500).json({
      success: false,
      message: "There was an issue saving the cart item."
    });
  }
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

  if (!item) {
    return next(new ErrorHandler('Item not found', 404));
  }

  if (item.quantity > 1) {
    item.quantity -= 1; // Decrease the quantity
    item.totalPrice -= item.price; // Update total price
    await item.save(); // Save the changes to the item
  } else {
    // Optionally handle the case where quantity is 1
    // You might want to remove the item or send a message
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


