"use client"
import axios from "axios";
import { toast} from 'react-toastify';
import Razorpay from "razorpay";
import 'react-toastify/dist/ReactToastify.css';
import { setPlaceOrder} from "../features/PaymentSlice.js";
// import { getOrder } from "../fetures/getOrderSlice";

const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(window.Razorpay);
        script.onerror = () => reject(new Error('Failed to load Razorpay SDK'));
        document.body.appendChild(script);
    });
};

export const CheckOut = (Data, nav) => async (dispatch) => {
    try {
        const res = await axios.post("https://disenosys-1.onrender.com/course/checkout-order", Data);
        const { orderId, amount, currency } = res.data;

        await loadRazorpayScript(); // Ensure Razorpay script is loaded

        const options = {
            key: 'rzp_test_pyzRkKRrWBkgnC', // Replace with your Razorpay key ID
            amount: amount, // Amount in currency subunits (paise for INR)
            currency: currency,
            name: 'Disenosys',
            description: 'Course Payment',
            order_id: orderId,
            handler: async (response) => {
                try {
                    const captureResponse = await axios.post("https://disenosys-1.onrender.com/course/capture-payment", {
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                    });

                    dispatch(setPlaceOrder(captureResponse.data));
                    toast.success("Payment successful!");
                    nav('/success');
                } catch (err) {
                    console.error(err);
                    toast.error("Payment failed! Please try again.");
                }
            },
            prefill: {
                name: Data.userName,
                email: Data.userEmail,
            },
            theme: {
                color: '#3399cc',
            },
        };

        const razor = new window.Razorpay(options);
        razor.open();
        toast.info("Redirecting to payment gateway...");
    } catch (err) {
        console.error(err);
        toast.error("Error while creating order. Please try again.");
    }
};


// export const getPlaceOrder = () => async (dispatch) => {
//  try{
//     const res = await axios.get("http://localhost:8000/course/getPlaceOrder");
//     const data = res.data
//     dispatch(getOrder(data))
//  }catch(err){
//     console.error('Error fetching data:', err);
//  }
// }