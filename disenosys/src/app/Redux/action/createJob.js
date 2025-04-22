"use client"
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postJob, postPayment, postPremiumUsers, setJob, setPayment } from '../features/cretaeJobSlice';



export const createJob = (data) => async (dispatch) => {
    const createJobPromise = axios.post("https://disenosys-dkhj.onrender.com/Jobs/postjob", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  
    try {
      const res = await toast.promise(
        createJobPromise,
        {
          pending: 'Creating job...',
          success: 'Job posted successfully!',
          error: 'Failed to post job.',
        },
        {
          position: 'top-right',
          autoClose: 3000,
        }
      );
  
      const jobData = res.data.data; //res structue -> data{ data: {} ,message,success}
      dispatch(postJob(jobData));
      dispatch(getJob())
    } catch (err) {
      console.error(err);
    }
  };


export const getJob = () => async (dispatch) => {
    dispatch(setJob({jobs:[],loading:true,error:false}))
    try{
       const res = await axios.get("https://disenosys-dkhj.onrender.com/Jobs/getjob");
       const data = res.data;
       dispatch(setJob({jobs:data,loading:false,error:false}))
    }catch(err){
        console.log(err)
    }
}


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
        const res = await axios.post("https://disenosys-dkhj.onrender.com/jobs/checkout-order", {
            userData: Data.userData,
            cartItems: Data.cartItems,
        });
       
        const { orderId, amount, currency } = res.data;

        await loadRazorpayScript(); 

        const options = {
            // key: process.env.NEXT_PUBLIC_KEY_RAZOR,
            key: 'rzp_test_pyzRkKRrWBkgnC',
            amount: amount,
            currency: currency,
            name: 'Disenosys',
            description: 'Job Portal Payment',
            order_id: orderId,
            handler: async (response) => {
                try {
                    // Send payment details to callback endpoint
                    const captureResponse = await axios.post("https://disenosys-dkhj.onrender.com/jobs/handle-razorpay-callback", {
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                    });

                    dispatch(postPayment(captureResponse.data));
                    toast.success("Payment successful!");
                    setTimeout(() => {
                        window.location.href = `/premium-form?orderId=${orderId}&paymentId=${response.razorpay_payment_id}&amount=${amount / 100}`;
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
        toast.error(`Error while creating order-${err?.response?.data?.message}`);
    }
};


export const Payment = () => async (dispatch) => {
    dispatch(setPayment({payment:[],loading:true,error:false}))
    try {
        const res = await axios.get("https://disenosys-dkhj.onrender.com/Jobs/getPlaceOrder");
        const getData = res.data.data;
        dispatch(setPayment(getData));
        dispatch(setPayment({payment:getData,loading:false,error:false}))
    } catch (error) {
        console.error('Error fetch code:', error);
    }
  }
  

  export const createPremiumList = (data,router) => async (dispatch) => {
    const createJobPromise = axios.post("http://localhost:8000/Jobs/postPremium", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  
    try {
      const res = await toast.promise(
        createJobPromise,
        {
          pending: 'Posting Your Application...',
          success: 'Application Submitted successfully!',
          error: 'Failed to post job.',
        },
        {
          position: 'top-right',
          autoClose: 3000,
        }
      );
  
      const jobData = res.data.data; //res structue -> data{ data: {} ,message,success}
      dispatch(postPremiumUsers(jobData));
      router.push("/applied");
    } catch (err) {
      console.error(err);
    }
  };

