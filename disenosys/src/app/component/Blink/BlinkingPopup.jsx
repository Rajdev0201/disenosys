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
    <div className="fixed top-0 right-0 w-full z-50 animate-pulse">
    <div className="flex items-center justify-center space-x-4 bg-[#057FE3] text-center py-2">
      <div className="w-6 h-6 bg-[#182073] ring-2 ring-white shadow-xl rounded-full" />
      <span className="text-white text-2xl font-poppins">
        We are still working on it!
      </span>
    </div>
  </div>
  
  );
};

export default BlinkingAlert;

