"use client"
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postJob, postPayment, postPremiumUsers, removeJob, setJob, setPayment, setPremiumUser, updateJob } from '../features/cretaeJobSlice';



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


export const getJob = (page=1) => async (dispatch) => {
    try{
       dispatch(setJob({jobs:[],loading:true,error:false}))
       const res = await axios.get(`https://disenosys-dkhj.onrender.com/Jobs/getjob?page=${page}&limit=9`);
       const data = res.data;
       dispatch(setJob({jobs:data,loading:false,error:false}))
    }catch(err){
        console.log(err)
    }
}


export const remove = (Id) => async (dispatch) => {
  try {
      await axios.delete(`https://disenosys-dkhj.onrender.com/Jobs/deleteJob/${Id}`);
      dispatch(removeJob(Id));
      dispatch(getJob())
  } catch (error) {
      console.error('Error removing for jobs:', error);
  }
};

export const editJob = (Id, updatedData) => async (dispatch) => {
const response = await axios.put(`https://disenosys-dkhj.onrender.com/Jobs/editJob/${Id}`, updatedData);
try {
    const res = await toast.promise(
      response,
      {
        pending: 'Updating job...',
        success: 'Updated Job posted successfully!',
        error: 'Failed to updated job.',
      },
      {
        position: 'top-right',
        autoClose: 3000,
      }
    );
    dispatch(updateJob(res.data)); 
    dispatch(getJob())
} catch (error) {
    console.error('Error updating jobs:', error);
}
};


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
    const createJobPromise = axios.post("https://disenosys-dkhj.onrender.com/Jobs/postPremium", data, {
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




export const PremiumList = () => async (dispatch) => {
  dispatch(setPremiumUser({premium:[],loading:true,error:false}))
  try {
      const res = await axios.get("https://disenosys-dkhj.onrender.com/Jobs/getpremiumlist");
      const getData = res.data.data;
      dispatch(setPremiumUser(getData));
      dispatch(setPremiumUser({premium:getData,loading:false,error:false}))
  } catch (error) {
      console.error('Error fetch code:', error);
  }
}

