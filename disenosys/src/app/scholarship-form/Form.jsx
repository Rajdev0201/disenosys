"use client";
import React, { useEffect, useState } from "react";
import "../home/Home.css";
import { useDispatch, useSelector } from "react-redux";
import { courseld } from "../Redux/action/Course";

const Form = () => {
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
    cname: "",
    date: "",
    sub: "2000",
    total: "2500",
  });

  const course = useSelector((state) => state.courseLD);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(courseld());
  }, [dispatch]);

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
      const response = await fetch(
        "https://disenosys-dkhj.onrender.com/scholar/send-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email }),
        }
      );

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
      const response = await fetch(
        "https://disenosys-dkhj.onrender.com/scholar/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email, otp }),
        }
      );

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
      const response = await fetch(
        "https://disenosys-dkhj.onrender.com/scholar/post",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

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
      <div className="bg-sch-form flex justify-center  min-h-screen">
        <div className="">
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm w-full z-50">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center">
              <h1 className="text-lg font-semibold font-garet">
                This is not open yet. Please wait for the opening date.
              </h1>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="lg:p-8 flex flex-col justify-center w-3/4">
              <h2 className="text-3xl font-semibold text-center lg:text-center font-garet text-[#0d1039] mb-2">
                Scholarship Application
              </h2>
              <div className="bg-[#D6E0F0]/70 lg:p-10 p-3 rounded-2xl">
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
                      className="ml-2 text-black font-garet font-medium text-lg underline px-1 rounded-md  bg-transparent"
                      onClick={verifyOTP}
                      disabled={loading || otpSent}
                    >
                      {otpSent ? "OTP Verified ✅" : "Verify OTP"}
                    </button>
                  </div>
                  <div className="flex">
                    <select
                      name="cname"
                      value={formData.cname}
                      onChange={handleChange}
                      className="mt-4 w-full p-3 rounded-full border border-gray-300 outline-none"
                      required
                    >
                      <option value="" disabled>
                        Select your course
                      </option>
                      {course?.data?.map((item, index) => (
                        <option key={item._id} value={item.course}>
                          {item.course}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm text-red-600 mt-4 px-3">
                      Select Exam Date *
                    </span>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full p-3 rounded-full border border-gray-300 outline-none"
                      placeholder="Date"
                      required
                    />
                  </div>
                  <div className="bg-white rounded-full p-6 flex flex-col mt-4">
                    <div className="flex gap-2">
                      <span>Sub Total :</span>
                      <input
                        type="text"
                        name="sub"
                        value={formData.sub}
                        onChange={handleChange}
                        className="rounded-full outline-none"
                        required
                      />
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="flex flex-col">
                        <span>Total Payable :</span>
                        <span> (incl.10% GST)</span>
                      </div>
                      <input
                        type="text"
                        name="total"
                        value={formData.total}
                        onChange={handleChange}
                        className="rounded-full outline-none"
                        required
                      />
                    </div>
                  </div>
                  <button className="mt-4 w-full text-2xl bg-[#0d1039] text-white py-3 font-garet rounded-md">
                    Proceed
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
export default Form;
