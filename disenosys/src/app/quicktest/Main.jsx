"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const Main = () => {
   const router = useRouter();
   
  const onClick = () => {
      localStorage.removeItem("catiaPercentage");
      localStorage.removeItem("productPercentage");
      router.push('/launch')
  }
  return (
    <div className="bg-[#D0D2E3] min-h-screen flex flex-col items-center justify-center mt-20 lg:mt-12">
      <h1 className="text-2xl md:text-5xl font-bold mb-4 mt-10 text-center text-[#182073]">
         Automotive Product Design quiz
      </h1>

    
      <div className="bg-white shadow-lg rounded-lg mt-4 flex flex-col md:flex-row items-center w-full sm:w-11/12 md:w-3/4 lg:w-2/3 px-6 sm:px-10 lg:px-20 py-6 sm:py-10 lg:py-16 space-y-6 md:space-y-0">
        
        <div className="flex items-start lg:items-center justify-start lg:justify-center text-green-500 font-bold text-6xl md:text-7xl mr-4">
          <div className="flex justify-center items-center mt-3 lg:mt-1 gap-2">
            <span className='text-[#182073]'>15</span>
            <div className="text-sm md:text-base font-medium text-gray-700">
              <span className="block text-sm font-light">MIN</span>
              <span className="block text-lg">QUICK</span>
              <span className="block text-lg">CHECK</span>
            </div>
          </div>
        </div>
  
  <div className='border-2 lg:border-b-gray-200 lg:border-2 lg:border-r-gray-200 w-full lg:w-0 lg:h-48'></div>

        <div className="flex flex-col text-gray-600 text-md space-y-6 mt-2 lg:mt-0 font-semibold md:ml-6">
          <p>
          This quick quiz assesses your Automotive Product Design skills in just 15 minutes, covering CATIA V5 proficiency and key product design concepts.
          </p>
          <ul className="list-disc pl-5">
            <li>Test your proficiency in design fundamentals and advanced techniques.</li>
            <li>Get an Estimate of Your Level: Beginner, Intermediate, or Advanced in CATIA V5 and Automotive Product Design.</li>
            <li>
            Share your scores on social media and connect with peers.
            </li>
            <li>
            Take the quiz as many times as you like to track your improvement.
            </li>
          </ul>
          <button onClick={onClick} className="bg-[#182073] text-white font-medium py-2 px-4 rounded-md mt-4 self-start hover:bg-blue-300 transition duration-300">
            Start 15 min test
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
