const Razorpay = require('razorpay');
const CheckoutSession = require('../models/Payment.js');

exports.createCheckoutSession = async (req, res) => {
    const { userData, cartItems } = req.body;
    const initialCartSnapshot = [...cartItems]; 

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
            lineItems: initialCartSnapshot.map((item) => ({
                name: item.name,
                price: item.price,
                totalPrice: item.price * item.quantity,
            })),
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

exports.getPlaceOrder = async(req,res) => {
    try{
        const DataList = await CheckoutSession.find();
        res.status(200).json(DataList)
       }catch(err){
         console.log(err)
        res.status(404).json("Couldn't retrieve data")
       }
}
