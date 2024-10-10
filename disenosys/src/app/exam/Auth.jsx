"use client";
import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { IoMdAlert } from "react-icons/io";
import { studentLogin } from "../Redux/action/auth.js";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation.js";


const Auth = () => {
  const [showAlert, setShowAlert] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
 
  // useEffect(() => {
  //   const storedUser = localStorage.getItem("student");
  //   if (storedUser) {
  //     dispatch(setStudent(JSON.parse(storedUser)));
  //   }
  // }, [dispatch]);
  

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
          className="w-full max-w-md max-h-lg bg-white rounded-lg shadow-lg"
          role="alert"
        >
          <div className="flex items-center justify-between mb-3 p-4 bg-[#182073]">
            <span className="mb-1 text-xl font-semibold font-poppins text-white">
              Welcome
            </span>
            <button>
              <IoMdAlert size={30} className="text-white" />
            </button>
          </div>

          <div className="container mx-auto p-5">
            <h1 className="font-bold text-center text-[#182073] font-poppins text-2xl">
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
                placeholder="Enter Code"
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
      </Transition>
    </div>
  );
};

export default Auth;
