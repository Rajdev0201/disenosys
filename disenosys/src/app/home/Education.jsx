"use client";
import React from "react";
import "./Home.css";
import Link from "next/link";

const Education = () => {
  return (
    <div className="w-full mt-6 bg-red-800">
      <div className="bg-edu p-12 lg:p-40 xl:p-44">
        <div className="flex flex-col">
          <h1 className="font-garet text-2xl lg:text-7xl leading-0 font-medium w-1/2 lg:w-2/4 xl:w-1/4 text-white my-4">
            EDUCATION IS THE GREAT EQUALIZER
          </h1>
          {/* <Link href="/scholarship" className="w-44 lg:w-80 bg-white  hover:bg-blue-200 text-sm lg:text-lg font-garet flex justify-center items-center gap-2 text-[#0d1039] rounded-md shadow-inner px-2 py-4">APPLY FOR A SCHOLARSHIP
          <FiArrowRight className="transition-transform hover:-rotate-45 group-active:-rotate-12 text-xl" />
          </Link> */}
          <Link href="/scholarship" class="relative bg-[#4b48ff] font-garet w-40 lg:w-64  text-white font-medium text-sm lg:text-2xl px-4 py-[0.35em] pl-5 h-[2.8em] rounded-[0.9em] flex items-center overflow-hidden cursor-pointer shadow-[inset_0_0_1.6em_-0.6em_#714da6] group">
            <span class="mr-10">Get started</span>
            <div class="absolute right-[0.3em] bg-white h-[2.2em] w-[2.2em] rounded-[0.7em] flex items-center justify-center transition-all duration-300 group-hover:w-[calc(100%-0.6em)] shadow-[0.1em_0.1em_0.6em_0.2em_#7b52b9] active:scale-95">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                class="w-[1.1em] transition-transform duration-300 text-[#7b52b9] group-hover:translate-x-[0.1em]"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  fill="currentColor"
                  d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                ></path>
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Education;
