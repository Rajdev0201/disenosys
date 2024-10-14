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
  const [showAlert, setShowAlert] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const handleSignin = async (e) => {
    e.preventDefault();
    dispatch(studentLogin({ name, email, code }, router));
    setName("");
    setEmail("");
    setCode("");
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-200">
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
          <div className="flex items-center justify-between mb-3 p-4 bg-[#182073]">
            <span className="mb-1 text-xl font-semibold font-poppins text-white">
              Welcome
            </span>
            {/* <button>
              <IoMdAlert size={30} className="text-white" />
            </button> */}
            <Image src={icon} className="w-16 h-16"/>
          </div>

          <div className="container mx-auto p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-gray-100 rounded-lg">
              <h1 className="font-bold text-center text-[#182073] font-poppins text-2xl mb-4">
                Quiz Instructions
              </h1>
              <ol className="list-decimal pl-5 text-[#182073] font-poppins">
                <li>First, please sign in with your details and access code.</li>
                <li>Once signed in, you will have access to the quiz application, which consists of 50 questions.</li>
                <li>You have a time limit of 1 hour to complete the quiz.</li>
                <li>Click the option you want and then submit your answer.</li>
                <li>The quiz status will be indicated by three colors: 
                    <ul className="list-disc pl-5">
                      <li><span className="text-green-500 font-bold">Green</span> for correct answers</li>
                      <li><span className="text-red-500 font-bold">Red</span> for incorrect answers</li>
                      <li><span className="text-yellow-500 font-bold">Yellow</span> for skipped questions.</li>
                    </ul>
                </li>
                <li>After completing all the questions, please click the <span className="text-blue-500 font-bold">"Finish"</span> button to view your results. A popup will appear with your results; you can close it afterward.</li>
                <li>You will also receive an email with your results.</li>
                <li>It is essential to click the <span className="text-blue-500 font-bold">"Finish"</span> button to submit your quiz.</li>
              </ol>
            </div>

    
            <div className="p-6">
              <h1 className="font-bold text-center text-[#182073] font-poppins text-2xl mb-4">
                Quiz Login
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
