"use client";
import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
// import { IoMdAlert } from "react-icons/io";
import {  studentLoginBIW } from "../Redux/action/auth.js";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation.js";
import Image from "next/image.js";
import icon from "../assests/brand-1.png";

const Auth = () => {
  const [showAlert, setShowAlert] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");

  const handleSignin = async (e) => {
    e.preventDefault();
    dispatch(studentLoginBIW({ name, email, code,mobile }, router));
    setName("");
    setEmail("");
    setCode("");
    setMobile("");
  };

  return (
    <div className="lg:fixed inset-0 flex justify-center items-center z-50 bg-gray-200">
      <Transition
        show={showAlert}
        enter="transform transition duration-300 ease-out"
        enterFrom="scale-75 opacity-0 translate-y-5"
        enterTo="scale-100 opacity-100 translate-y-0"
        leave="transform transition duration-300 ease-in"
        leaveFrom="scale-100 opacity-100 translate-y-0"
        leaveTo="scale-75 opacity-0 translate-y-5"
      >
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
                <li><b>Time Limit: </b> You have a 30-minute time limit to complete the quiz.</li>
                <li><b>Answer Submission:</b> Select your preferred option for each question and submit your answer.</li>
                <li><b>Status Indicators:</b>
                    <ul className="list-disc pl-5">
                      <li><span className="text-green-500 font-bold">Green</span> for correct answers</li>
                      <li><span className="text-red-500 font-bold">Red</span> for incorrect answers</li>
                      <li><span className="text-yellow-500 font-bold">Yellow</span> for skipped questions.</li>
                    </ul>
                </li>
                <li><b>Completion:</b> Once you have answered all questions, click the <span className="text-blue-500 font-bold">&quot;Finish&quot;</span>  button to review your results. A pop-up will display your performance, and an email with your results will also be sent to you.</li>
                <li><b>Important Note:</b> Ensure you stay on the quiz page for the entire duration of the exam, as leaving the page will get you <b>DISQUALIFIED</b>.</li>
              </ol>
            </div>

    
            <div className="p-6">
              <h1 className="font-bold text-center text-[#182073] font-poppins text-2xl mb-4">
                Exam Login
              </h1>
              <form onSubmit={handleSignin} className="p-6">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Name"
                  className="w-full border-2 p-2 text-[#182073] border-gray-400 bg-gray-200 rounded outline-none focus:border-[#182073] transition-colors required:border-red-500"
                  required
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  className="w-full border-2 p-2 mt-4 text-[#182073] border-gray-400 bg-gray-200 rounded outline-none focus:border-[#182073] transition-colors required:border-red-500"
                  required
                />

                  <input
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Enter Mobile Number"
                  className="w-full border-2 p-2 mt-4 text-[#182073] border-gray-400 bg-gray-200 rounded outline-none focus:border-[#182073] transition-colors required:border-red-500"
                  required
                />

                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter access Code"
                  className="w-full border-2 p-2 mt-4 text-[#182073] border-gray-400 bg-gray-200 rounded outline-none focus:border-[#182073] transition-colors required:border-red-500"
                  required
                />
                 
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#182073] w-28 mt-4 p-2 text-xl font-semibold text-white flex items-center justify-center rounded"
                  >
                    Continue
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default Auth;
