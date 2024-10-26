
const Razorpay = require('razorpay');
const CheckoutSession = require('../models/Payment.js');

exports.createCheckoutSession = async (req, res) => {
    const { userData, cartItems } = req.body;
    console.log("Received data:", userData, cartItems);

    if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({ message: "Cart items are required to create an order." });
    }

    const razorpay = new Razorpay({
        key_id: 'rzp_test_pyzRkKRrWBkgnC',
        key_secret: 'CIdT8EcotbRTWc4JxdYIhEUn',
    });

    try {
        const amount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0) * 100; // Convert to paise
        const options = {
            amount: amount,
            currency: "INR",
            receipt: `receipt_order_${Date.now()}`,
            payment_capture: 1,
        };

        const order = await razorpay.orders.create(options);

        const checkoutSession = new CheckoutSession({
            sessionId: order.id,
            lineItems: cartItems,
            user: userData._id,
            customerDetails: {
                name: userData.userName,
                email: userData.userEmail,
            },
        });

        await checkoutSession.save();

        res.status(200).json({ orderId: order.id, amount: order.amount, currency: order.currency });
    } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
    }
};



exports.handleRazorpayCallback = async (req, res) => {
    const { razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;

    try {
        // Retrieve stored order data based on orderId
        const orderData = await CheckoutSession.findOne({ sessionId: razorpayOrderId });

        if (!orderData) {
            return res.status(404).json({ message: "Order not found." });
        }

        // Extract the userData and cartItems from stored order data
        const { customerDetails, lineItems } = orderData;

        console.log("User Data:", customerDetails);
        console.log("Cart Items:", lineItems);

        // Additional code to verify payment and update order status
        res.status(200).json({ message: "Payment verified and order updated successfully." });
    } catch (err) {
        console.error("Error handling callback:", err);
        res.status(500).json({ message: "Error verifying payment" });
    }
};



exports.getPlaceOrder = async(req,res) => {
    try{
        const DataList = await CheckoutSession.find();
        res.status(200).json({
            message: 'External code has deleted',
            data: DataList,
          });
        }catch(err){
            console.log(err);
            return res.status(500).json({err : "data is not deleted"})
        }
}


