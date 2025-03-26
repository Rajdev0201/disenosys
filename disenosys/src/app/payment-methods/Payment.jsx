"use client"
import Image from "next/image";
import pay from "../assests/profile/online-payment.jpg"
import React from "react";
import Link from "next/link";
const PaymentMethods = () => {

    const sendWhatsAppMessage = () => {
        if (typeof window !== 'undefined') { // Check if window is defined
          const phoneNumber = '9944478700';
          const message = 'I’m interested in the courses offered at Disenosys. Could you please share more details? Thanks!';
          const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
          window.open(url, '_blank');
        }
    }

  return (
    <div className="min-h-screen bg-[#FAFBFF] p-6 flex flex-col items-center font-garet ">
      {/* <h2 className="text-3xl font-semibold text-gray-800 mb-6 mt-24">Choose Payment Method</h2> */}
      <div className="grid gap-6 md:grid-cols-2 w-full max-w-4xl mt-36">
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Online Payment</h3>
          <p className="text-gray-600 mb-4">
            Pay securely via Razorpay with multiple payment options.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full transition">
          <Link href="/cart">Proceed to Checkout</Link>
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Offline Payment</h3>
          <p className="text-gray-600 mb-4">
            Contact our sales team to get a QR code and pay via PhonePe, Google Pay, etc.
          </p>
          <button onClick = {sendWhatsAppMessage} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg w-full transition">
            Contact Sales Team
          </button>
        </div>

      </div>
      <div className="mt-12">
         <Image src={pay} alt="payments" className="object-cover w-80 h-80 rounded-full shadow-lg"/>
      </div>
    </div>
  );
};

export default PaymentMethods;
