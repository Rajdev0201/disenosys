"use client";
import React from "react";
import "./Online.css";

const Online = () => {
  return (
    <div className="flex justify-center items-center mt-44 mb-20 bg">
      <div className="w-full max-w-md bg-[#182073] text-white rounded-lg shadow-lg p-8 mx-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Course Enrollment</h2>
        <form className="text-white" action="" method="post">
          {/* Name Input */}
          <label className="text-sm font-semibold block mb-2 after:content-['*'] after:ml-0.5 after:text-red-500">
            Name
          </label>
          <input
            className="w-full p-3 mb-4 rounded-md bg-gray-100 text-black outline-none ring-none focus:ring-2 focus:ring-sky-500"
            type="text"
            placeholder="Enter your Name"
            required
          />

          {/* Email Input */}
          <label className="text-sm font-semibold block mb-2 after:content-['*'] after:ml-0.5 after:text-red-500">
            Email
          </label>
          <input
            className="w-full p-3 mb-4 rounded-md bg-gray-100 text-black outline-none ring-none focus:ring-2 focus:ring-sky-500"
            type="email"
            placeholder="Enter your Email"
            required
          />

          {/* Phone Input */}
          <label className="text-sm font-semibold block mb-2 after:content-['*'] after:ml-0.5 after:text-red-500">
            Phone
          </label>
          <input
            className="w-full p-3 mb-4 rounded-md bg-gray-100 text-black outline-none ring-none focus:ring-2 focus:ring-sky-500"
            type="text"
            placeholder="Enter your Phone Number"
            required
          />

          {/* Course Input */}
          <label className="text-sm font-semibold block mb-2 after:content-['*'] after:ml-0.5 after:text-red-500">
            Your Course
          </label>
          <input
            className="w-full p-3 mb-4 rounded-md bg-gray-100 text-black outline-none ring-none focus:ring-2 focus:ring-sky-500"
            type="text"
            placeholder="Enter the Course Name"
            required
          />

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              className="w-full bg-sky-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-400 transition-colors"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Online;
