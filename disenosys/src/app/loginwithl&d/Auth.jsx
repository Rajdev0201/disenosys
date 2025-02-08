"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { adminLD } from "../Redux/action/auth";
import { useRouter } from "next/navigation";

const Auth = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSigninLD = async (e) => {
    e.preventDefault();

    const identifier = document.getElementById("identifier").value;
    const password = document.getElementById("password").value;

    const data = {
      identifier: identifier,
      password: password,
    };

    dispatch(adminLD(data, router));
  };

  return (
    <div className="flex flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-semibold font-garet text-center text-gray-800 mb-6">
        Welcome, Log into your L&D account
      </h2>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg font-garet">
        <p className="text-center text-gray-600 mb-6">
          It is our great pleasure to have you on board!
        </p>
        <form className="p-4" onSubmit={handleSigninLD}>
          <div className="mb-4">
            <label
              htmlFor="school"
              className="block text-sm font-medium text-gray-700"
            >
              User Name
            </label>
            <input
              type="text"
              id="identifier"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              User Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Powered by <span className="font-semibold">Disenosys</span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
