"use client";
import React from "react";
import "./Home.css";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";

const Education = () => {
  return (
    <div className="w-full mt-0 lg:mt-8">
      <div className="bg-edu p-12 lg:p-44">
        <div className="flex flex-col">
          <h1 className="font-garet text-2xl lg:text-7xl leading-0 font-medium w-1/2 lg:w-1/4 text-white my-4">
            EDUCATION IS THE GREAT EQUALIZER
          </h1>
          <Link href="/scholarship" className="w-44 lg:w-80 bg-white  hover:bg-blue-200 text-sm lg:text-lg font-garet flex justify-center items-center gap-2 text-[#0d1039] rounded-md shadow-inner px-2 py-4">APPLY FOR A SCHOLARSHIP
          
          <FiArrowRight className="transition-transform hover:-rotate-45 group-active:-rotate-12 text-xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Education;
