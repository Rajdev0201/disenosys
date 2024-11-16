
const Razorpay = require('razorpay');
const CheckoutSession = require('../models/consult.js');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const msal = require('@azure/msal-node');
const axios = require('axios');
const { Client } = require('@microsoft/microsoft-graph-client');
const { ClientSecretCredential } = require('@azure/identity');

exports.createCheckoutSession = async (req, res) => {
    const { userData, cartItems } = req.body;
    console.log("Received data:", userData, cartItems);

    if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({ message: "Cart items are required to create an order." });
    }

    const razorpay = new Razorpay({
        // key_id: process.env.KEY_ID,
        // key_secret: process.env.KEY_SECRET,
        key_id: 'rzp_test_pyzRkKRrWBkgnC',
        key_secret: 'CIdT8EcotbRTWc4JxdYIhEUn',
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
                phone:userData.phone,
                bookedtime:userData.bookedtime,
                timeZone:userData.timeZone,
                bookeddate:userData.bookeddate,
            },
        });

        await checkoutSession.save();

        res.status(200).json({ orderId: order.id, amount: order.amount, currency: order.currency });
    } catch (err) {
        console.log(err)
        res.status(err.statusCode || 500).json(err.message);
    }
};




const msalConfig = {
    auth: {
        clientId: process.env.AZURE_CLIENT,
        authority: `https://login.microsoftonline.com/${process.env.AZURE_TENET}`,
        clientSecret: process.env.AZURE_SECRET
    }
};


const cca = new msal.ConfidentialClientApplication(msalConfig);

async function getAccessToken() {
    try {
        const result = await cca.acquireTokenByClientCredential({
            scopes: ['https://graph.microsoft.com/.default'],
        });
        return result.accessToken;
    } catch (error) {
        console.error("Error acquiring access token:", error);
    }
}

exports.handleRazorpayCallback = async (req, res) => {
    const { razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;

    try {
        const orderData = await CheckoutSession.findOne({ sessionId: razorpayOrderId, isPaid: false });

        if (!orderData) {
            return res.status(404).json({ message: "Order not found or already paid." });
        }

        const { customerDetails, lineItems } = orderData;

        await sendPayment(customerDetails.email, customerDetails.name, lineItems, customerDetails.bookedtime, customerDetails.bookedSlot,customerDetails.bookeddate);
        // await sendWhatsAppMessage(customerDetails.bookedtime, customerDetails.bookedSlot,customerDetails.phone);
        await createOutlookEvent(customerDetails.bookeddate, customerDetails.bookedtime, customerDetails.name);
        orderData.isPaid = true;
        await orderData.save();  
        


        res.status(200).json({ message: "Payment verified and order updated successfully." });
    } catch (err) {
        console.error("Error handling callback:", err);
        res.status(500).json({ message: "Error verifying payment" });
    }
};

const formatTimeTo24HR = (time) => {
    const [hours, minutes, period] = time.match(/(\d+):(\d+) (\w+)/).slice(1);
    let hour = parseInt(hours);
    if (period.toUpperCase() === 'PM' && hour !== 12) hour += 12;
    if (period.toUpperCase() === 'AM' && hour === 12) hour = 0;
    return `${hour.toString().padStart(2, '0')}:${minutes}`;
};




async function createOutlookEvent(bookingDate, bookingTime, studentName) {
    try {
        const accessToken = await getAccessToken();  

        const [startTime, endTime] = bookingTime.split(" - ");
        const startTime24 = formatTimeTo24HR(startTime);
        const endTime24 = formatTimeTo24HR(endTime);

        const eventStart = new Date(`${bookingDate}T${startTime24}:00`);
        const eventEnd = new Date(`${bookingDate}T${endTime24}:00`);

        if (isNaN(eventStart.getTime()) || isNaN(eventEnd.getTime())) {
            throw new Error("Invalid date/time value");
        }

        const eventPayload = {
            subject: `Booking Confirmation for ${studentName}`,
            body: {
                contentType: "HTML",
                content: `Booking confirmed for ${studentName}. Time: ${bookingTime}`,
            },
            start: {
                dateTime: eventStart.toISOString(),
                timeZone: "Asia/Kolkata",
            },
            end: {
                dateTime: eventEnd.toISOString(),
                timeZone: "Asia/Kolkata",
            },
            location: {
                displayName: "Disenosys Online Classes",
            },
        };
        // console.log('Event Payload:', JSON.stringify(eventPayload, null, 2));
        // console.log('Access Token:', accessToken);
        
        const userId = "classes@disenosys.com"; 
        const response = await axios.post(
            `https://graph.microsoft.com/v1.0/users/${userId}/events`, 
            eventPayload, 
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            }
        );
        
        // console.log('Outlook event created:', response.data);
        // const eventUrl = response.data.webLink;
        // console.log("Event Link: ", eventUrl);
    } catch (error) {
        console.error('Error creating Outlook event:', error.response ? error.response.data : error.message);
    }
}




// const accountSid = 'AC5979968987c526e14698da96212169a4';
// const authToken = '1cc22dea47b9a44254d8e2558b0aba99';
// const client = new twilio(accountSid, authToken);

    



// const sendWhatsAppMessage = async (bookedTime, bookedSlot,phone) => {
//     const message = `You have a new booking for 'Job Consultation For Freshers In Auto Design'.\nBooking Time: ${bookedTime} (${bookedSlot})`;

//     try {
//         const response = await client.messages.create({
//             body: message,
//             from: '+14242767083', 
//             to:'+916382209795'
//         });

//         console.log('WhatsApp message sent:', response.sid);
//     } catch (error) {
//         console.error('Error sending WhatsApp message:', error);
//     }
// };

const sendPayment = async (studentEmail, studentName, lineItems, bookedTime, bookedSlot,bookingdate) => {
    const transporter = nodemailer.createTransport({

        host: 'smtp.office365.com', 
       port: 587,                 
       secure: false,   
       auth: {
        user: 'classes@disenosys.com',
        pass: 'xnccsypkfhfpymwg',
      }
       });
       

    const itemRows = lineItems
        .map(item => `<tr><td style="padding: 10px; border: 1px solid #ddd; text-align: left;">${item.coursename}</td><td style="padding: 10px; border: 1px solid #ddd; text-align: right;">₹${item.price}</td></tr>`)
        .join('');

        const [startTime, endTime] = bookedTime.split(" - ");

       
    
        const start = formatTimeTo24HR(startTime);
        const end = formatTimeTo24HR(endTime);

        // const formatDateForICS = (date, time) => {
        //     const { hour, minute } = time;
        //     const startDate = new Date(date);
        //     startDate.setHours(hour, minute, 0, 0);
        //     return startDate.toISOString().replace(/[-:]/g, "").split(".")[0];  
        // };
    
    //     const icsContent = `BEGIN:VCALENDAR
    // VERSION:2.0
    // BEGIN:VEVENT
    // SUMMARY:Booking Confirmation for ${studentName}
    // DESCRIPTION:Thank you for your booking. Your booking details are as follows: \nDate: ${bookingdate} \nTime: ${bookedTime}
    // DTSTART:${formatDateForICS(bookingdate, start)}
    // DTEND:${formatDateForICS(bookingdate, end)}
    // LOCATION:Disenosys Online Classes
    // STATUS:CONFIRMED
    // BEGIN:VALARM
    // TRIGGER:-PT10M  // Trigger reminder 10 minutes before the event
    // DESCRIPTION:Reminder for your booking!
    // ACTION:DISPLAY
    // END:VALARM
    // END:VEVENT
    // END:VCALENDAR`;
    
       
      

    const mailOptions = {
        from: 'classes@disenosys.com',
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
                    <p style="color: #555;">Your booked time slot is <strong>${bookedTime}</strong>.</p>
                    <p style="color: #555;">Thank you for choosing Disenosys. We wish you a great learning journey!</p>
                    <p style="color: #555;">If you have any questions, feel free to <a href="mailto:rajkumarprjpm@gmail.com" style="color: #4a90e2; text-decoration: none;">contact us</a>.</p>
                </div>
                <div style="background-color: #4a90e2; color: #fff; padding: 10px; text-align: center;">
                    <p style="font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} Disenosys. All rights reserved.</p>
                </div>
            </div>
        `,
        // attachments: [
        //     {
        //         filename: 'booking.ics',
        //         content: icsContent,
        //         contentType: 'text/calendar',
        //     },
        // ],
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


