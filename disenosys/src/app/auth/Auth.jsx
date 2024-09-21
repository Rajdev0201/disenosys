import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { SignupData ,  login} from "../Redux/action/auth.js";
import { useRouter } from 'next/navigation'

const Authentication = () => {
  const [show, setShow] = useState(false);
  const [forgotshow, setForgotshow] = useState(true);
  const [activeTab, setActiveTab] = useState("login");
  const dispatch = useDispatch();
  const nav = useRouter();

  const handleLogin = () => {
    setShow(false);
    setActiveTab("login");
  };

  const handleRegister = () => {
    setShow(true);
    setActiveTab("register");
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
      userEmail:userMail,
      userName:userName,
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
  
    dispatch(login(data,nav));
  };
  

  return (
    <div className="container mx-auto">
      <div className="container flex justify-around pb-12">
        <h1
          className={`text-xl font-semibold cursor-pointer ${activeTab === "login" ? "" : "text-[#38c3e2]"}`}
          onClick={handleRegister}
        >
          Login
        </h1>
        <h1
          className={`text-xl font-semibold cursor-pointer ${activeTab === "register" ? "" : "text-[#38c3e2]"}`}
          onClick={handleLogin}
        >
          Register
        </h1>
      </div>
      {show ? (
        forgotshow ? (
          <>
            <div className="container mx-auto pt-5">
              <h1 className="text-3xl font-bold text-center">Signin</h1>
              <form onSubmit={handleSignin}>
                <input
                  type="text"
                  id="identifier"
                  placeholder="Enter Username or Email"
                  className="border border-gray-400 mt-9 p-3 w-full rounded"
                />
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  className="border border-gray-400 mt-4 p-3 w-full rounded"
                />
                <div className="flex justify-between mt-4 flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-1 mt-1 sm:mt-0" />
                    <label className="text-md font-normal">
                      keep me signed in
                    </label>
                  </div>
                  <div className="flex">
                    <span
                      className="mt-2 sm:mt-0 text-md hover:text-blue-900 hover:underline underline-offset-2 text-right cursor-pointer"
                      onClick={handleForgotshow}
                    >
                      lost your password?
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-[#38c3e2] w-full p-4 mt-6 text-xl font-semibold text-white rounded-md"
                >
                  Login
                </button>
                <h1 className="text-center text-lg mt-6 font-light mb-6 hover:text-[#38c3e2]"onClick={handleLogin}>
                  Don&apos;t have an account?
                </h1>
              </form>
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
          <ToastContainer />
          <div className="container mx-auto pt-5">
            <h1 className="text-3xl font-bold text-center">Register</h1>
            <form action="" onSubmit={(e) => handleSignup(e)}>
              <input
                type="text"
                id="userName"
                placeholder="Enter Username"
                className="border border-gray-400 mt-9 p-3 w-full rounded"
              />
              <input
                type="text"
                id="userEmail"
                placeholder="Enter Email"
                className="border border-gray-400 mt-4 p-3 w-full rounded"
              />
              <input
                type="password"
                placeholder="Enter Password"
                id="password"
                className="border border-gray-400 mt-4 p-3 w-full rounded"
              />
              <input
                type="password"
                id="confirmpassword"
                placeholder="Enter confirm Password"
                className="border border-gray-400 mt-4 p-3 w-full rounded"
              />
              <button
                type="submit"
                className="bg-[#38c3e2] w-full p-4 mt-5 text-xl font-semibold text-white rounded-md"
              >
                Register Now
              </button>
              <h1
                className="text-center text-lg mt-6 font-light mb-6 hover:text-[#38c3e2] cursor-pointer"
                onClick={handleRegister}
              >
                Already have an account?
              </h1>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Authentication;