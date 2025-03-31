"use client"
import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { IoMdAlert } from "react-icons/io";
import { admin } from "../Redux/action/auth.js";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation.js";
import Image from "next/image.js";
import logo from "../assests/profile/logo.jpg"

const Auth = () => {
  const [showAlert, setShowAlert] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignin = async (e) => {
    e.preventDefault();

    const identifier = document.getElementById("identifier").value;
    const password = document.getElementById("password").value;

    const data = {
      identifier: identifier,
      password: password,
    };

    dispatch(admin(data, router));
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
          className="w-full max-w-md max-h-lg bg-white rounded-lg shadow-lg font-garet"
          role="alert"
        >
          <div className="flex items-center justify-between mb-3 p-4 bg-[#182073]">
            <span className="mb-1 text-xl font-semibold text-white">
             Disenosys
            </span>
            {/* <Image src={logo} alt="admin-logo" className="object-cover"/> */}
            <button>
              <IoMdAlert size={30} className="text-white" />
            </button>
          </div>

          <div className="container mx-auto p-5">
            <h1 className="font-medium text-center text-[#182073]  text-2xl">
              Admin Login
            </h1>
            <form onSubmit={handleSignin} className="p-6">
              <input
                type="text"
                id="identifier"
                placeholder="Enter Username or Email"
                className="w-full border-2 p-2 text-[#182073] border-gray-400 bg-gray-200 rounded outline-none focus:border-[#182073] transition-colors"
              />
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                className="w-full border-2 p-2 mt-4 text-[#182073] border-gray-400 bg-gray-200 rounded outline-none focus:border-[#182073] transition-colors"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#182073]  mt-4 px-4 py-2 text-xl font-medium text-white flex items-center justify-center rounded"
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
