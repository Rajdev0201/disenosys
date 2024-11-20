
"use client";
import axios from "axios";
import { toast } from 'react-toastify';
import Razorpay from "razorpay";
import 'react-toastify/dist/ReactToastify.css';
import { setBlock, setPayment, setPlaceOrder } from "../features/consultSlice.js";

const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(window.Razorpay);
        script.onerror = () => reject(new Error('Failed to load Razorpay SDK'));
        document.body.appendChild(script);
    });
};
//https://disenosys-1.onrender.com/ 
export const CheckOut = (Data, nav) => async (dispatch) => {
    try {
        console.log("Data sent to backend:", Data);
        const res = await axios.post("https://disenosys-1.onrender.com/consult/checkout-order", {
            userData: Data.userData,
            cartItems: Data.cartItems,
        });

    
        const { orderId, amount, currency } = res.data;

        await loadRazorpayScript(); 

        const options = {
            key: 'rzp_test_pyzRkKRrWBkgnC',
            amount: amount,
            currency: currency,
            name: 'Disenosys',
            description: 'bootcamp Payment',
            order_id: orderId,
            handler: async (response) => {
                try {
                    // Send payment details to callback endpoint
                    const captureResponse = await axios.post("https://disenosys-1.onrender.com/consult/handle-razorpay-callback", {
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
        if (err.response && err.response.status === 400) {
            toast.error(err.response.data.message); 
        } else {
            toast.error("Error while creating order. Please try again.");
        }
    }
};


export const payment = () => async (dispatch) => {
    try {
        const res = await axios.get("https://disenosys-1.onrender.com/consult/getPlaceOrder");
        const getData = res.data;
        dispatch(setPayment(getData));
    } catch (error) {
        console.error('Error fetch code:', error);
    }
  }
  
  export const block = () => async (dispatch) => {
    try {
        const res = await axios.get("https://disenosys-1.onrender.com/consult/getBlockTime");
        const getData = res.data;
        dispatch(setBlock(getData));
    } catch (error) {
        console.error('Error fetch code:', error);
    }
  }
  
  
