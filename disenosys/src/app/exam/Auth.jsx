"use client";
import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
// import { IoMdAlert } from "react-icons/io";
import { studentLogin } from "../Redux/action/auth.js";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation.js";
import Image from "next/image.js";
import icon from "../assests/brand-1.png";

const Auth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");
  const [load,setLoad] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    // Mobile validation
    if (!mobile) {
      newErrors.mobile = "Mobile number is required";
    }else if (!/^[6-9]\d{9}$/.test(mobile)) {
  newErrors.mobile = "Enter a valid 10-digit Indian mobile number";
}
 
    // Exam code validation
    if (!code.trim()) {
      newErrors.code = "Exam code is required";
    } else if (code.length < 4) {
      newErrors.code = "Exam code must be at least 4 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  const handleSignin = async (e) => {
    setLoad(true)
    e.preventDefault();
    if(validate()) {
      dispatch(studentLogin({ name, email, code,mobile }, router));
    }
    setName("");
    setEmail("");
    setCode("");
    setMobile("");
    setLoad(false)
  };

  return (
    <div className="flex items-center justify-center bg-gray-200 p-2">
    
        <div
          id="toast-notification"
          className="w-full max-w-4xl bg-white rounded-sm shadow-md rounded-b-lg border-b-8 border-[#182073]"
          role="alert"
        >
          <div className="flex items-center justify-between mb-3 p-3 bg-[#182073]">
            <span className="mb-1 text-xl font-semibold font-poppins text-white">
              Welcome
            </span>
            {/* <button>
              <IoMdAlert size={30} className="text-white" />
            </button> */}
            <Image src={icon} className="w-16 h-16 ring-2 ring-white rounded-full"/>
          </div>

          <div className="container mx-auto p-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-gray-100 rounded-lg">
              <h1 className="font-bold text-center text-[#182073] font-poppins text-2xl mb-4">
              Certification Exam Instructions:
              </h1>
              <ol className="list-decimal pl-5 text-[#182073] font-poppins">
  <li><b>Sign-In:</b> Begin by signing in using your details and the provided access code.</li>
  <li><b>Quiz Access:</b> Once signed in, you will gain access to the quiz, which consists of 50 multiple-choice questions.</li>
  <li><b>Time Limit:</b> You have a 30-minute time limit to complete the quiz.</li>
  <li><b>Answer Submission:</b> Select your preferred option for each question and submit your answer.</li>
  
  <li><b>Proctoring & Camera Rules:</b>
    <ul className="list-disc pl-5">
      <li>Your <b>webcam must remain ON</b> throughout the exam.</li>
      <li>Ensure your <b>face is clearly visible</b> in the camera. Sitting in a <b>well-lit area</b> is mandatory.</li>
      <li>If your face is <b>not detected</b>, you will receive a warning.</li>
      <li>If you look <b>left, right, or down</b> repeatedly, the system will mark it as <b>Suspicious Activity</b>.</li>
      <li>Multiple faces in the camera will <b>terminate</b> your exam immediately.</li>
      <li>Your <b>Proctor Status</b> will be shown on the right side of the screen while your camera feed is visible on the left.</li>
      <li>Any suspicious activity (moving away, covering face, poor lighting) will be <b>recorded</b> and may lead to <b>termination</b>.</li>
    </ul>
  </li>

  <li><b>Status Indicators:</b>
    <ul className="list-disc pl-5">
      <li><span className="text-green-500 font-bold">Green</span> – Correct answers</li>
      <li><span className="text-red-500 font-bold">Red</span> – Incorrect answers</li>
      <li><span className="text-yellow-500 font-bold">Yellow</span> – Skipped questions</li>
    </ul>
  </li>

  <li><b>Completion:</b> Once you have answered all questions, click the 
    <span className="text-blue-500 font-bold"> "Finish"</span> button to review your results. 
    A pop-up will display your performance, and an email with your results will also be sent to you.
  </li>

  <li><b>Important Note:</b> Ensure you stay on the quiz page for the entire duration of the exam, as leaving the page will get you <b>DISQUALIFIED</b>.</li>
</ol>

            </div>

                    <div className="p-6 sticky top-4 bg-white shadow-lg rounded-lg border border-gray-200 h-fit">
  <h1 className="font-bold text-center text-[#182073] font-poppins text-2xl mb-4">
    Exam Login
  </h1>

  <form onSubmit={handleSignin} className="space-y-5">
    {/* Name */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Full Name
      </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your full name"
        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#182073] focus:outline-none"
        
      />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
    </div>

    {/* Email */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Email Address
      </label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#182073] focus:outline-none"
    
      />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
    </div>

    {/* Mobile */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Mobile Number
      </label>
      <input
        type="tel"
        pattern="[0-9]{10}"
        title="Enter 10 digit mobile number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        placeholder="Enter mobile number"
        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#182073] focus:outline-none"
      
      />
        {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
    </div>

    {/* Access Code */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Access Code
      </label>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter access code"
        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#182073] focus:outline-none"
       
      />
        {errors.code && <p className="text-red-500 text-sm">{errors.code}</p>}
    </div>

    {/* Button */}
    <div className="flex justify-center">
      <button
        type="submit"
        className="bg-[#182073] w-full py-2 text-lg font-semibold text-white rounded-lg hover:bg-[#0f154a] transition-all duration-300"
      >
        {load ? "Loading..." : "Continue"}
      </button>
    </div>
  </form>
</div>
 
          </div>
        </div>
    </div>
  );
};

export default Auth;
