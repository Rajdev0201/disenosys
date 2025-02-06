
"use client";
import axios from "axios";
import { toast } from 'react-toastify';
import Razorpay from "razorpay";
import 'react-toastify/dist/ReactToastify.css';
import { setPayment, setPlaceOrder } from "../features/PaymentSlice.js";

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
        console.log("Data sent to backend:", Data);
        const res = await axios.post("https://disenosys-dkhj.onrender.com/course/checkout-order", {
            userData: Data.userData,
            cartItems: Data.cartItems,
        });
        const { orderId, amount, currency } = res.data;

        await loadRazorpayScript(); 

        const options = {
            key: process.env.NEXT_PUBLIC_KEY_RAZOR,
            amount: amount,
            currency: currency,
            name: 'Disenosys',
            description: 'Course Payment',
            order_id: orderId,
            handler: async (response) => {
                try {
                    // Send payment details to callback endpoint
                    const captureResponse = await axios.post("https://disenosys-dkhj.onrender.com/course/handle-razorpay-callback", {
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                    });

                    dispatch(setPlaceOrder(captureResponse.data));
                    toast.success("Payment successful!");
                    setTimeout(() => {
                        window.location.href = `/success?orderId=${orderId}&paymentId=${response.razorpay_payment_id}&amount=${amount / 100}`;
                    }, 1000);
                } catch (err) {
                    console.error("Error during callback:", err);
                    toast.error("Payment verification failed! Please try again.");
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
        console.error("Error creating order:", err);
        toast.error("Error while creating order. Please try again.");
    }
};


export const payment = () => async (dispatch) => {
    try {
        const res = await axios.get("https://disenosys-dkhj.onrender.com/course/getPlaceOrder");
        const getData = res.data;
        dispatch(setPayment(getData));
    } catch (error) {
        console.error('Error fetch code:', error);
    }
  }
  
