"use client";

import "../home/Home.css";
import brand from "../assests/brand-1.png"; 
import Image from "next/image";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
      <Image
        src={brand} 
        alt="Loading..." 
        className="w-24 h-24 border-4 border-[#182073] border-t-transparent rounded-full animate-spin" 
      />
    </div>
  );
};

export default LoadingSpinner;
