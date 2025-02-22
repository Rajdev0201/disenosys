"use client"
import Link from 'next/link';
import React from 'react'


const SuccessCard = () => {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-2xl p-6 w-80 text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-full mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-sans font-semibold text-blue-600 mt-4">Success</h2>
          <p className="text-gray-500 font-garet text-sm mt-2">
          Great job! Everything went smoothly. Click continue to move forward.
          </p>
          <div className='mt-6'>
          <Link href={"/"} className="font-garet mt-4 px-6 py-2 mt-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
            Continue
          </Link>
          </div>
        </div>
      </div>
    );
  };
  
export default SuccessCard;