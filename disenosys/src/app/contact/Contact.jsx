"use client";
import React, { useState } from "react";
import "./Contact.css";

export const Contact = () => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    des: "",
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendOTP = async () => {
    setLoading1(true);
    if (!formData.email) {
      alert("Please enter your email");
      setLoading1(false);
      return;
    }
  
    try {
      const response = await fetch("https://disenosys-dkhj.onrender.com/contact/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }), 
      });
  
      const data = await response.json();
      if (data.success) {
        alert("OTP sent successfully!");
        setLoading1(false);
      } else {
        alert("Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setResult("An error occurred while sending OTP.");
    }
  };
  

  const verifyOTP = async () => {
    if (!otp) {
      alert("Please enter OTP");
      return;
    }
  
    setLoading(true);
    try {
      const response = await fetch("https://disenosys-dkhj.onrender.com/contact/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp }),
      });
  
      const data = await response.json();
      if (data.success) {
        alert("OTP verified successfully!");
        setOtpSent(true); 
      } else {
        alert("Invalid OTP, please try again.");
        setOtpSent(false);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setResult("An error occurred while verifying OTP.");
    }
    setLoading(false);
  };
  
  const onSubmit = async (event) => {
    event.preventDefault();
  
    if (!otpSent) {
      alert("Please verify OTP before submitting.");
      return;
    }
  
    setLoading(true);
    try {
      const response = await fetch("https://disenosys-dkhj.onrender.com/contact/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (data.success) {
        setResult("Form Submitted Successfully ✅");
        setFormData({ fname: "", lname: "", email: "", phone: "", des: "" });
        setOtp("");
        setOtpSent(false);
      } else {
        setResult(data.message);
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setResult("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  
  return (
    <>
      <div className="bg-contact flex justify-center py-20 mt-6 lg:mt-32">
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:px-12">
            <div className="lg:p-8 flex flex-col justify-center lg:-mt-20">
              <h2 className="text-3xl font-semibold text-center lg:text-start font-garet text-[#0d1039] mb-2">
                Contact Us
              </h2>
              <div className="bg-[#D6E0F0] lg:p-10 p-3 rounded-2xl">
                <form onSubmit={onSubmit}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 font-garet">
                    <input
                      type="text"
                      name="fname"
                      value={formData.fname}
                      onChange={handleChange}
                      placeholder="First Name"
                      className="p-3 rounded-full border border-gray-300 outline-none"
                      required
                    />
                    <input
                      type="text"
                      name="lname"
                      value={formData.lname}
                      onChange={handleChange}
                      placeholder="Last Name"
                      className="p-3 rounded-full border border-gray-300 outline-none"
                      required
                    />
                  </div>

                  <input
                    name="phone"
                    placeholder="Enter Mobile"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-4 w-full p-3 rounded-full border border-gray-300 outline-none"
                    required
                  />

                  <div className="mt-4 flex">
                    <input
                     name="email"
                      type="email"
                      placeholder="Enter Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="flex-grow p-3 rounded-full border border-gray-300 outline-none"
                      required
                    />
                    <button
                      className="ml-2 bg-[#0d1039] text-white lg:px-4 lg:py-3 p-1 rounded-xl"
                      onClick={sendOTP}
                      disabled={loading1}
                    >
                      {loading1 ? "Sending OTP..." : "Send OTP"}
                    </button>
                  </div>
                  <div className="mt-4 flex">
                  <input
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="flex-grow p-3 rounded-full border border-gray-300 outline-none"
   
                  />
                  <button
  className="ml-2 text-blue-600 font-garet font-medium text-lg underline px-1 rounded-md  bg-transparent"
  onClick={verifyOTP}
  disabled={loading || otpSent}
>
  {otpSent ? "OTP Verified ✅" : "Verify OTP"}
</button>

                  </div>
    
                  <textarea
                    name="des"
                    value={formData.des}
                    onChange={handleChange}
                    placeholder="Go ahead, we are listening..."
                    className="mt-4 w-full p-3 rounded-2xl border border-gray-300 outline-none h-40"
   
                  />
                  <button className="mt-4 w-full text-2xl bg-[#0d1039] text-white py-3 font-garet rounded-md">
                    Submit
                  </button>
                </form>
                <p className="text-center mt-2 text-red-500">{result}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
