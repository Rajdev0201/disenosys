"use client"
import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { IoMdAlert } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { login, SignupData } from "@/app/Redux/action/auth.js";
import Glogin from "../../auth/Glogin.jsx";
import LinkedInLogin from "../../auth/LinkedIn.jsx"
import Facebook from "../../auth/Facebook.jsx";
import Link from "next/link.js";


const LoginAlert = () => {
  const [showAlert, setShowAlert] = useState(true);
  const [show, setShow] = useState(false);
  const [forgotshow, setForgotshow] = useState(true);
  const dispatch = useDispatch();
  const nav = useRouter();

  const handleLogin = () => {
    setShow(false);
  };

  const handleRegister = () => {
    setShow(true);
  };

  const handleForgotshow = () => {
    setForgotshow(false);
  };

  const handleRegister1 = () => {
    setForgotshow(true);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const userName = document.getElementById("userName").value;
    const userMail = document.getElementById("userEmail").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmpassword").value;

    if (confirmPassword !== password) {
      toast.error("Passwords do not match");
      return;
    }

    const data = {
      userEmail: userMail,
      userName: userName,
      password: password,
    };

    dispatch(SignupData(data));
  };

  const handleSignin = async (e) => {
    e.preventDefault();

    const identifier = document.getElementById("identifier").value;
    const password = document.getElementById("password").value;

    const data = {
      identifier: identifier,
      password: password,
    };

    dispatch(login(data, nav));
  };

  return (
    <div className="fixed inset-x-0 -top-10  mt-0 flex justify-center z-50 ">
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
          class="w-full max-w-md max-h-lg  bg-white rounded-lg shadow "
          role="alert"
        >
          <div class="flex items-center justify-between mb-3 p-4 bg-[#182073] ">
            <span class="mb-1 text-xl font-semibold font-poppins text-white">
              Auth notification
            </span>
            <button>
              <IoMdAlert size={30} className="text-white" />
            </button>
          </div>

          {show ? (
            forgotshow ? (
              <>
                <div className="container mx-auto pt-5">
                  <h1 className="font-bold text-center text-[#182073] font-poppins text-2xl">
                    First login or register!
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
                  className="w-full border-2 p-2 mt-2 text-[#182073] border-gray-400 bg-gray-200 rounded outline-none focus:border-[#182073] transition-colors"
             
                />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-[#182073] w-28 mt-3 p-2 text-xl font-semibold text-white flex items-center justify-center rounded"
                      >
                        Continue
                      </button>
                    </div>
                    <div className="flex justify-end">
                      <h1
                        className=" text-base mt-1 font-light text-[#182073] mb-6 hover:text-blue-300 hover:cursor-pointer"
                        onClick={handleLogin}
                      >
                        Don&apos;t have an account?
                      </h1>
                    </div>
                  </form>
                  <div className="relative flex items-center justify-center w-full">
                    <div className="border-t border-gray-400 w-full mb-4"></div>
                    <span className="absolute bg-[#333978] px-2 text-gray-100 mb-4">
                      OR
                    </span>
                    <div className="border-t border-gray-400 w-full mb-4"></div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="container mx-auto">
                  <h1 className="text-2xl font-bold text-center pb-12">
                    Reset Password
                  </h1>
                  <form onSubmit={handleSignin}>
                    <input
                      type="text"
                      id="name"
                      placeholder="Enter Username or Email"
                      className="border border-gray-400 mb-5 p-3 w-full rounded"
                    />
                    <button
                      type="submit"
                      className="bg-[#38c3e2] w-full p-4 text-xl font-semibold text-white rounded-md"
                    >
                      Get New Password
                    </button>
                    <button
                      type="button"
                      className="bg-[#38c3e2] w-full p-4 mt-2 mb-8 text-xl font-semibold text-white rounded-md"
                      onClick={handleRegister1}
                    >
                      Cancel
                    </button>
                    <span
                      className="mt-3 ps-44 text-center hover:text-[#38c3e2] cursor-pointer"
                      onClick={handleRegister1}
                    >
                      Back to Login
                    </span>
                    <h1
                      className="text-center text-lg pt-1 font-light mb-6 hover:text-[#38c3e2] cursor-pointer"
                      onClick={handleLogin}
                    >
                      Don&apos;t have an account?
                    </h1>
                  </form>
                </div>
              </>
            )
          ) : (
            <>
              <div className="container mx-auto pt-5 ">
              <h1 className="font-bold text-center text-[#182073] font-poppins text-2xl">
                    First login or register!
                  </h1>
                <form action="" onSubmit={(e) => handleSignup(e)}className="p-6">
                  <input
                    type="text"
                    id="userName"
                    placeholder="Enter Username"
                    className="w-full border-2 p-2 text-[#182073] border-gray-400 bg-gray-200 rounded outline-none focus:border-[#182073] transition-colors"
                  />
                  <input
                    type="text"
                    id="userEmail"
                    placeholder="Enter Email"
                    className="w-full border-2 p-2 text-[#182073] border-gray-400 mt-2 bg-gray-200 rounded outline-none focus:border-[#182073] transition-colors"
                  />
                  <input
                    type="password"
                    placeholder="Enter Password"
                    id="password"
                    className="w-full border-2 p-2 text-[#182073] border-gray-400 mt-2 bg-gray-200 rounded outline-none focus:border-[#182073] transition-colors"
                  />
                  <input
                    type="password"
                    id="confirmpassword"
                    placeholder="Enter confirm Password"
                    className="w-full border-2 p-2 text-[#182073] border-gray-400 mt-2 bg-gray-200 rounded outline-none focus:border-[#182073] transition-colors"
                  />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-[#182073] w-28 mt-3 p-2 text-xl font-semibold text-white flex items-center justify-center rounded"
                      >
                        Continue
                      </button>
                    </div>
                    <div className="flex justify-end">
                      <h1
                        className=" text-base mt-1 font-light text-[#182073] mb-6 hover:text-blue-300 hover:cursor-pointer"
                        onClick={handleRegister}
                      >
                        Already have an account?
                      </h1>
                    </div>
                </form>
                <div className="relative flex items-center justify-center w-full">
                    <div className="border-t border-gray-400 w-full mb-4"></div>
                    <span className="absolute bg-[#333978] px-2 text-gray-100 mb-4">
                      OR
                    </span>
                    <div className="border-t border-gray-400 w-full mb-4"></div>
                  </div>
                </div>
            </>
          )}
          <div className="space-y-4 w-full max-w-xs mx-auto p-5">
  {/* Continue with Google */}
  <button className="w-full flex items-center justify-center  text-[#182073] border border-gray-300 rounded-lg px-4 py-2 shadow-sm">
  {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5 mr-2">
      <path fill="#4285F4" d="M44.5 20H24v8.5h11.7c-1 4.3-4.8 7.5-9.7 7.5-5.5 0-10-4.5-10-10s4.5-10 10-10c2.5 0 4.8 0.9 6.6 2.4l6.3-6.3C34.8 7 29.7 5 24 5 13.5 5 5 13.5 5 24s8.5 19 19 19c9.4 0 18-6.9 18-19 0-1.3-.1-2.7-.5-4z"/>
      <path fill="#34A853" d="M10.9 29.1c-1.5-2.4-2.4-5.2-2.4-8.1s.9-5.7 2.4-8.1l-6.3-6.3C3.3 10.2 2 16 2 24s1.3 13.8 3.6 19.2l6.3-6.1z"/>
      <path fill="#FBBC05" d="M24 44c5.2 0 9.9-1.7 13.7-4.8l-6.3-6.3c-2 1.3-4.5 2.1-7.4 2.1-4.9 0-8.7-3.2-9.7-7.5H10.9l-6.3 6.3C11.1 41.9 17.1 44 24 44z"/>
      <path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-.5 2.5-1.9 4.6-3.7 6.1l6.3 6.3C41.3 37.3 44 31.1 44 24c0-1.3-.1-2.7-.5-4z"/>
    </svg> */}
   <Glogin/>
  </button>

  {/* Continue with LinkedIn */}
  {/* <button className="w-full flex items-center justify-center  text-[#182073] border border-gray-300 rounded-lg px-4 py-2 shadow-sm">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
      alt="LinkedIn Logo"
      className="w-5 h-5 mr-2"
    />

    <LinkedInLogin text="Login with LinkedIn" err="linkedin OAuth error please open new tab"/>
  </button> */}

  {/* Continue with Facebook */}
  <button className="w-full flex items-center justify-center  text-[#182073] border border-gray-300 rounded-lg px-4 py-2 shadow-sm">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
      alt="Facebook Logo"
      className="w-5 h-5 mr-2"
    />
   <Facebook/>
  </button>
</div>

        </div>
      </Transition>
    </div>
  );
};

export default LoginAlert;
