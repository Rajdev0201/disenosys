
const Razorpay = require('razorpay');
const CheckoutSession = require('../models/bootcamp');
const nodemailer = require('nodemailer');

exports.createCheckoutSession = async (req, res) => {
    const { userData, cartItems } = req.body;
    console.log("Received data:", userData, cartItems);

    if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({ message: "Cart items are required to create an order." });
    }

    const razorpay = new Razorpay({
        key_id: process.env.KEY_ID,
        key_secret: process.env.KEY_SECRET,
    });

    try {
        const amount = cartItems.reduce((total, item) => total + item.price , 0) * 100;
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
                name: userData.name,
                email: userData.email,
                phone:userData.phone
            },
        });

        await checkoutSession.save();

        res.status(200).json({ orderId: order.id, amount: order.amount, currency: order.currency });
    } catch (err) {
        console.log(err)
        res.status(err.statusCode || 500).json(err.message);
    }
};




exports.handleRazorpayCallback = async (req, res) => {
    const { razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;

    try {
        const orderData = await CheckoutSession.findOne({ sessionId: razorpayOrderId, isPaid: false });

        if (!orderData) {
            return res.status(404).json({ message: "Order not found or already paid." });
        }

        const { customerDetails, lineItems } = orderData;

        console.log("User Data:", customerDetails);
        console.log("Cart Items:", lineItems);

        await sendPayment(customerDetails.email, customerDetails.name, lineItems);
        orderData.isPaid = true; 
        await orderData.save();  

        res.status(200).json({ message: "Payment verified and order updated successfully." });
    } catch (err) {
        console.error("Error handling callback:", err);
        res.status(500).json({ message: "Error verifying payment" });
    }
};

const sendPayment = async (studentEmail, studentName, lineItems) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rajkumarprjpm@gmail.com',
            pass: 'eztbnuzrbwxocizk',
        }
    });


    const itemRows = lineItems
        .map(item => `<tr><td style="padding: 10px; border: 1px solid #ddd; text-align: left;">${item.coursename}</td><td style="padding: 10px; border: 1px solid #ddd; text-align: right;">₹${item.price}</td></tr>`)
        .join('');

        const zoomLink = 'https://zoom.us/j/xxxxxxxxxxxxx'; 

        const mailOptions = {
            from: 'rajkumarprjpm@gmail.com',
            to: studentEmail,
            subject: 'Your Payment Confirmation from Disenosys',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #f0f0f0; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
                    <div style="background-color: #182073; padding: 20px; text-align: center; color: #fff;">
                        <img src="https://www.disenosys.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.d25c986e.png&w=384&q=75" alt="Disenosys Logo" style="max-width: 150px; margin-bottom: 10px;">
                        <h1 style="font-size: 24px; margin: 0;">Payment Confirmation</h1>
                    </div>
                    <div style="padding: 20px;">
                        <h2 style="color: #333;">Hello ${studentName},</h2>
                        <p style="color: #555;">Thank you for purchasing the following courses. Here are your payment details:</p>
                    </div>
                    <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background-color: #f9f9f9;">
                        <thead>
                            <tr style="background-color: #4a90e2; color: #fff;">
                                <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Course Name</th>
                                <th style="padding: 10px; border: 1px solid #ddd; text-align: right;">Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemRows}
                        </tbody>
                    </table>
                    <p style="color: #555;">Your Zoom meeting link for the Bootcamp is: <a href="${zoomLink}" style="color: #4a90e2; text-decoration: none;">Join here</a></p>
                    <div style="padding: 20px;">
                        <p style="color: #555;">Thank you for choosing Disenosys. We wish you a great learning journey!</p>
                        <p style="color: #555;">If you have any questions, feel free to <a href="mailto:rajkumarprjpm@gmail.com" style="color: #4a90e2; text-decoration: none;">contact us</a>.</p>
                    </div>
                    <div style="background-color: #4a90e2; color: #fff; padding: 10px; text-align: center;">
                        <p style="font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} Disenosys. All rights reserved.</p>
                    </div>
                </div>
            `,
        };
    
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};



exports.getPlaceOrder = async(req,res) => {
    try{
        const DataList = await CheckoutSession.find({ isPaid: true });
        res.status(200).json({
            message: 'External code has deleted',
            data: DataList,
          });
        }catch(err){
            console.log(err);
            return res.status(500).json({err : "data is not deleted"})
        }
}


