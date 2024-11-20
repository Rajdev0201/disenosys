
const Razorpay = require('razorpay');
const CheckoutSession = require('../models/consult.js');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const msal = require('@azure/msal-node');
const axios = require('axios');
const moment = require('moment-timezone');
const {BlockedEvent} = require('../models/blockedTime.js')

// const { Client } = require('@microsoft/microsoft-graph-client');
// const { ClientSecretCredential } = require('@azure/identity');

const formatTimeTo24HR = (time) => {
    const [hours, minutes, period] = time.match(/(\d+):(\d+) (\w+)/).slice(1);
    let hour = parseInt(hours);
    if (period.toUpperCase() === 'PM' && hour !== 12) hour += 12;
    if (period.toUpperCase() === 'AM' && hour === 12) hour = 0;
    return `${hour.toString().padStart(2, '0')}:${minutes}`;
};



async function checkCalendarConflict(date, time) {
    const accessToken = await getAccessToken();
    const userId = "classes@disenosys.com";
    const [startTime, endTime] = time.split(" - ");


    const startTime24 = formatTimeTo24HR(startTime);
    const endTime24 = formatTimeTo24HR(endTime);

    
    const startTimeMoment = moment.tz(`${date} ${startTime24}`, "YYYY-MM-DD HH:mm", "Asia/Kolkata");
    const endTimeMoment = moment.tz(`${date} ${endTime24}`, "YYYY-MM-DD HH:mm", "Asia/Kolkata");
    endTimeMoment.subtract(1, 'minute');

    const startTimeUTC = startTimeMoment.utc().format();
    const endTimeUTC = endTimeMoment.utc().format();

    console.log("Start Time UTC:", startTimeUTC); 
    console.log("End Time UTC:", endTimeUTC); 

    const query = `startDateTime=${startTimeUTC}&endDateTime=${endTimeUTC}`;

    try {
        const response = await axios.get(
            `https://graph.microsoft.com/v1.0/users/${userId}/calendarView?${query}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        const events = response.data.value;
        if (events && events.length > 0) {
            for (let event of events) {
                const blockedEvent = new BlockedEvent({
                    eventId: event.id,
                    subject: event.subject,
                    startTimeUTC: event.start.dateTime,
                    endTimeUTC: event.end.dateTime,
                    userId: userId,
                });
                await blockedEvent.save();
            }
            return true; 
        }
        return false; 
        
    } catch (error) {
        console.error("Error checking calendar conflict:", error.response ? error.response.data : error.message);
        throw new Error("Unable to verify calendar conflicts.");
    }
}


exports.createCheckoutSession = async (req, res) => {
    const { userData, cartItems } = req.body;
    console.log("Received data:", userData, cartItems);

    if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({ message: "Cart items are required to create an order." });
    }

    

    try {

        const isConflict = await checkCalendarConflict(userData.bookeddate, userData.bookedtime);
        console.log(isConflict)
        if (isConflict) {
            return res.status(400).json({ 
                message: `The selected ${userData.bookedtime} slot is already blocked. Please choose a different time.`
            });
        }


        const razorpay = new Razorpay({
            // key_id: process.env.KEY_ID,
            // key_secret: process.env.KEY_SECRET,
            key_id: 'rzp_test_pyzRkKRrWBkgnC',
            key_secret: 'CIdT8EcotbRTWc4JxdYIhEUn',
        });

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
        clientId: '5e27ffde-97bd-482c-ba58-532146e4bb83',
        authority:'https://login.microsoftonline.com/63c1c6c5-4075-4c11-8d8e-fd9ee5a8a2d3',
        clientSecret:'fYI8Q~byGdDwwXLK3AabWY.nyk4j8PAt5NSO-ctM'
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





async function createOutlookEvent(bookingDate, bookingTime, studentName) {
    try {
        const accessToken = await getAccessToken();  

        const [startTime, endTime] = bookingTime.split(" - ");
        const startTime24 = formatTimeTo24HR(startTime);
        const endTime24 = formatTimeTo24HR(endTime);

        // const eventStart = new Date(`${bookingDate}T${startTime24}:00Z`); 
        // const eventEnd = new Date(`${bookingDate}T${endTime24}:00Z`); 
        const startTimeUTC = moment.tz(`${bookingDate} ${startTime24}`, 'Asia/Kolkata').utc().format();
        const endTimeUTC = moment.tz(`${bookingDate} ${endTime24}`, 'Asia/Kolkata').utc().format();
        console.log(startTimeUTC);
        console.log(endTimeUTC)

        if (!startTimeUTC || !endTimeUTC) {
            throw new Error("Invalid time format.");
        }

        const eventPayload = {
            subject: `Booking Confirmation for ${studentName}`,
            body: {
                contentType: "HTML",
                content: `Booking confirmed for ${studentName}. Time: ${bookingTime}`,
            },
            start: {
                dateTime: startTimeUTC,
                timeZone: "UTC",  // Specify UTC here as it's the time being sent
            },
            end: {
                dateTime: endTimeUTC,
                timeZone: "UTC",  // Specify UTC here as well
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
        
        console.log('Outlook event created:', response.data);
        const eventUrl = response.data.webLink;
        console.log("Event Link: ", eventUrl);
    } catch (error) {
        console.error('Error creating Outlook event:', error.response ? error.response.data : error.message);
    }
}





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
            message: 'data is fetched',
            data: DataList,
          });
        }catch(err){
            console.log(err);
            return res.status(500).json({err : "data is not fetched"})
        }
}

exports.getBlockTime = async(req,res) => {
    try{
        const DataList = await BlockedEvent.find();
        res.status(200).json({
            message: 'date and time fetch',
            data: DataList,
          });
        }catch(err){
            console.log(err);
            return res.status(500).json({err : "data is not fetched"})
        }
}



