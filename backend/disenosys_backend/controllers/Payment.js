
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

const sendPayment = async (studentEmail, studentName, courseName, totalPrice) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rajkumarprjpm@gmail.com',
            pass: 'eztbnuzrbwxocizk',
        }
    });

    const mailOptions = {
        from: 'rajkumarprjpm@gmail.com',
        to: studentEmail,
        subject: 'Your Payment Confirmation from Disenosys',
        html: `
            <h2>Hello ${studentName},</h2>
            <p>Thank you for purchasing the course "${courseName}". Here are your payment details:</p>
            <table border="1" cellpadding="5" cellspacing="0">
                <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${courseName}</td>
                        <td>${totalPrice}</td>
                    </tr>
                </tbody>
            </table>
            <p>Thank you for choosing Disenosys. We wish you a great learning journey!</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};


exports.handleRazorpayCallback = async (req, res) => {
    const { razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;

    try {
        const orderData = await CheckoutSession.findOne({ sessionId: razorpayOrderId });

        if (!orderData) {
            return res.status(404).json({ message: "Order not found." });
        }

        const { customerDetails, lineItems } = orderData;

        console.log("User Data:", customerDetails);
        console.log("Cart Items:", lineItems);
        await sendPayment(customerDetails.email, customerDetails.name, lineItems.price, lineItems.name);

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


