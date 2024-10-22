"use client"
import React, { useEffect, useState } from 'react';

const BlinkingAlert = () => {


  return (
    <div className="fixed top-0 right-0 w-full z-50 animate-pulse">
    <div className="flex items-center justify-center space-x-4 bg-[#057FE3] text-center px-2 lg:px-0 py-2 lg:py-2">
    <div className="w-4 h-4 md:w-6 md:h-6 bg-[#182073] ring-1 lg:ring-2 ring-white shadow-xl rounded-full flex justify-center items-center">
    <div className="w-1 h-1 lg:w-2 lg:h-2 bg-red-500 animate-pulse rounded-full"></div>
    </div>


    
         <span className="font-semibold font-poppins text-xs lg:text-base text-white">
         Exciting changes ahead! Our basics are live—stay tuned for more!
      </span>
    </div>
  </div>
  
  );
};

export default BlinkingAlert;

