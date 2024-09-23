"use client"
import React, { useEffect, useState } from 'react';

const BlinkingAlert = () => {
//   const [isVisible, setIsVisible] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsVisible(false);
//     }, 3000); // Show the alert for 3 seconds

//     return () => clearTimeout(timer);
//   }, []);

  return (
    <div className="fixed top-0 right-0 p-4">
      
        <div className="flex items-center space-x-0 ">
          <div className="w-4 h-4 bg-[#057FE3] ring-2 ring-white shadow-xl  rounded-full animate-pulse" />
          <span className="text-white w-32 p-2 text-sm">
            We are still working on it!.
          </span>
        </div>
      
    </div>
  );
};

export default BlinkingAlert;

