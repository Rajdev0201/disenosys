const findJob = require("../models/findJob.js");
const Razorpay = require('razorpay');
const SendEmail = require("../utils/SendEmail")
const CheckoutSession = require("../models/jobPayments.js");
const PremiumJobList = require('../models/premiumJobUsers.js'); 

exports.postJob = async (req,res) => {
    const { title, description, companyName, type, location, experience, level, salary, jobPosted, jobExpire } = req.body;
    const logo = req.file.path;

    try {
        const newJob = await findJob.create({
            title,
            description,
            logo,
            companyName,
            type,
            location,
            experience,
            level,
            salary,
            jobPosted,
            jobExpire
        });


        res.status(201).json({
            success: true,
            message: "Job Details created Successfully.",
            newJob
        });
    } catch (error) {
        console.error("Error saving to the database:", error);
        return res.status(500).json({
            success: false,
            message: "There was an issue saving the job."
        });
    }
}



exports.getJob = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // default to page 1
      const limit = parseInt(req.query.limit) || 9; // default to 9 jobs per page
      const skip = (page - 1) * limit; // calculate the number of jobs to skip
  
      const jobs = await findJob.find().skip(skip).limit(limit); //its based on how many docs to skip before fetch data ex => Page 1 → skip = (1-1) * 6 = 0 → fetch from beginning
      const total = await findJob.countDocuments();
  
      res.status(200).json({
        success: true,
        jobs,
        total,//total document
        page,//current page
        pages: Math.ceil(total / limit), //count total pages
      });
    } catch (error) {
      console.error("Error fetching jobs:", error);
      return res.status(500).json({
        success: false,
        message: "There was an issue fetching the jobs.",



      });
    }
  };
  
exports.editJob = async (req,res) => {
      const { id } = req.params;
      const updatedData = req.body; 
      try {
          const updatedJob = await findJob.findByIdAndUpdate(id, updatedData, { new: true });
    
          if (!updatedJob) {
              return res.status(404).json({ message: 'Job not found' });
          }
    
          res.status(200).json({
              message: 'Job data has been updated',
              data: updatedJob,
          });
      } catch (err) {
          console.log(err);
          return res.status(500).json({ err: 'Failed to update course data' });
      }
}

exports.deleteJob = async (req,res) => {
        const { id } = req.params;
        try{
        const fixed = await findJob.findByIdAndDelete(id);
    
        res.status(200).json({
            message: 'Job data has deleted',
            data: fixed,
          });
        }catch(err){
            console.log(err);
            return res.status(500).json({err : "data is not deleted"})
        }
}


exports.createCheckoutSession = async (req, res) => {
    const { userData, cartItems } = req.body;
    console.log("Received data:", userData, cartItems);

    if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({ message: "Cart items are required to create an order." });
    }

    const razorpay = new Razorpay({
        //   key_id: process.env.KEY_ID,
        //   key_secret: process.env.KEY_SECRET,
        key_id: 'rzp_test_pyzRkKRrWBkgnC',
        key_secret: 'CIdT8EcotbRTWc4JxdYIhEUn',
    });

    try {
        const options = {
            amount: cartItems.amount*100,
            currency: "INR",
            receipt: `receipt_order_${Date.now()}`,
            payment_capture: 1,
        };

        const order = await razorpay.orders.create(options);

        const checkoutSession = new CheckoutSession({
            sessionId: order.id,
            lineItems: cartItems,
            customerDetails: {
                name: userData.name,
                email: userData.email,
            },
        });

        await checkoutSession.save();

        res.status(200).json({ orderId: order.id, amount: order.amount, currency: order.currency });
    } catch (err) {
        console.log(err)
        res.status(500).json(err.message);
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

    const itemRows = lineItems
        .map(item => `<tr><td style="padding: 10px; border: 1px solid #ddd; text-align: left;">${item.title}</td><td style="padding: 10px; border: 1px solid #ddd; text-align: right;">₹${item.amount}</td></tr>`)
        .join('');

    const mailOptions = {
        to: studentEmail,
        subject: 'Your Payment Confirmation from Disenosys',
        text: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #f0f0f0; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
                <!-- Company Logo -->
                <div style="background-color: #182073; padding: 20px; text-align: center; color: #fff;">
                    <img src="https://www.disenosys.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.d25c986e.png&w=384&q=75" alt="Disenosys Logo" style="max-width: 150px; margin-bottom: 10px;">
                    <h1 style="font-size: 24px; margin: 0;">Payment Confirmation</h1>
                </div>

                <!-- Greeting -->
                <div style="padding: 20px;">
                    <h2 style="color: #333;">Hello ${studentName},</h2>
                    <p style="color: #555;">Thank you for Applied the Job. Here are your payment details:</p>
                </div>

                <!-- Payment Details Table -->
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

                <!-- Closing Message -->
                <div style="padding: 20px;">
                    <p style="color: #555;">Thank you for choosing Disenosys. We wish you a great journey!</p>
                    <p style="color: #555;">If you have any questions, feel free to <a href="mailto:rajkumarprjpm@gmail.com" style="color: #4a90e2; text-decoration: none;">contact us</a>.</p>
                </div>

                <!-- Footer -->
                <div style="background-color: #4a90e2; color: #fff; padding: 10px; text-align: center;">
                    <p style="font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} Disenosys. All rights reserved.</p>
                </div>
            </div>
        `
    };
    
    try {
        await SendEmail(mailOptions);
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};



exports.getPlaceOrder = async(req,res) => {
    try{
        const DataList = await CheckoutSession.find({ isPaid: true });
        res.status(200).json({
            message: 'Applicants paid Data',
            data: DataList,
          });
        }catch(err){
            console.log(err);
            return res.status(500).json({err : "There was an issue fetching the data"})
        }
}




exports.postPremiumJobUser = async (req, res) => {
  try {
    const {
      name,
      phone,
      dob,
      gender,
      linkedin,
      portfolio,
      qualification,
      specialization,
      college,
      yearOfPassing,
      currentJob,
      experience,
      previousCompany,
      currentCTC,
      expectedCTC,
      noticePeriod,
      preferredLocation,
      email,
      native,
      message,
    } = req.body;

    const resume = req.file.path;
    //    const existingUser = await PremiumJobList.findOne({ 
    //        $or: [{ email }, { name }] 
    //      });
     
    //      if (existingUser) {
    //        return res.status(409).json({ error: 'Your data already exists!' }); 
    //      }
    const newJob = new PremiumJobList({
      name,
      title,
      phone,
      dob,
      gender,
      linkedin,
      portfolio,
      qualification,
      specialization,
      college,
      yearOfPassing,
      currentJob,
      experience,
      previousCompany,
      currentCTC,
      expectedCTC,
      noticePeriod,
      preferredLocation,
      resume,
      email,
      native,
      message,
    });

    await newJob.save();

    res.status(201).json({
      success: true,
      message: "Premium job user created successfully.",
      newJob,
    });
  } catch (error) {
    console.error("Error saving to the database:", error);
    return res.status(500).json({
      success: false,
      message: "There was an issue saving the job.",
    });
  }
};


exports.getPremiumJobsList = async(req,res) => {
    try{
        const DataList = await PremiumJobList.find();
        res.status(200).json({
            message: 'Applicants Job paid Data',
            data: DataList,
          });
        }catch(err){
            console.log(err);
            return res.status(500).json({err : "There was an issue fetching the data"})
        }
}

