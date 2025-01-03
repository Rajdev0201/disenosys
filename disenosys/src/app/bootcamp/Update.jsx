"use client"
import Image from "next/image";
import React from "react";
import { BsClockHistory } from "react-icons/bs";
import { CiCalendarDate } from "react-icons/ci";
import CEO from "../assests/profile/f.png";
import Testimonials from "../home/Testimonials";
import "../home/Home.css"
import { FaGraduationCap } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { MdStars } from "react-icons/md";
import MarqueeView from "../home/Marquee";
import Partner from "../home/Partner";
import Testi from "./Testi";
import Learn from "./Learn";
import Box from "./Box";
import Cards from "./Cards";
import Enroll from "./Enroll";
import Workshop from "./Workshop";
import FAQ from "./FAQ";


const Update = () => {
  return (
    <div className="bg-white">
      <div className="px-4 py-28 sm:px-8 sm:py-28 md:px-12 md:py-28 lg:px-32 lg:py-36 xl:px-44 xl:py-40">
  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center">
    Skyrocket Your <span className="text-[#182073]">LinkedIn Growth</span> in 5 Days
  </h1>
  <h4 className="text-base sm:text-lg md:text-xl mt-4 sm:mt-5 md:mt-6 font-medium text-center">
    Build a personal brand, generate high-ticket leads & get inbound job offers
  </h4>
</div>

      <div className="flex flex-col lg:flex-row lg:px-44 gap-12 mx-auto -mt-10">
        <div className="flex flex-col justify-center items-center border-2 border-gray-200 rounded-xl shadow-inner">
          <div className="flex flex-row p-6 ">
            <div className="text-[#182073] border-r-2 border-gray-700 sm:px-2 py-2 lg:px-2 flex items-center gap-2">
              <CiCalendarDate size={30} className="" />
              <h2 className="text-[#182073]  text-md md:text-xl lg:text-xl xl:text-xl font-bold">
                starts at january 7,2024
              </h2>
            </div>
            <div className=" text-[#182073] px-2 sm:px-2 lg:px-2 py-2 flex items-center gap-2 rounded">
              <BsClockHistory size={25} className="" />
              <h2 className=" text-[#182073] text-md  md:text-xl lg:text-xl xl:text-xl font-bold">
                5 Day Workshop
              </h2>
            </div>
          </div>

          <div className="px-12 mb-6">
            <p className="text-lg px-6 py-2 mb-4font-medium border-4 border-[#182073] rounded-2xl shadow-inner">
              Learn the exact strategies that won me <b>400K+ followers</b> and
              monthly <b>leads worth thousands of dollars</b> for free!
            </p>
          </div>

          <div className="flex justify-center">
            <button class="relative group border-none bg-transparent p-0 outline-none cursor-pointer font-mono font-light uppercase text-base">
              <span class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-25 rounded-lg transform translate-y-0.5 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:translate-y-1 group-hover:duration-[250ms] group-active:translate-y-px"></span>

              <span class="absolute top-0 left-0 w-full h-full rounded-lg bg-gradient-to-l from-[hsl(217,33%,16%)] via-[hsl(217,33%,32%)] to-[hsl(217,33%,16%)]"></span>

              <div class="relative flex items-center justify-between py-3 px-6 text-lg text-white rounded-lg transform -translate-y-1 bg-gradient-to-r from-[#f27121] via-[#e94057] to-[#8a2387] gap-3 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:-translate-y-1.5 group-hover:duration-[250ms] group-active:-translate-y-0.5 brightness-100 group-hover:brightness-110">
                <span class="select-none"  onClick={() =>
                document
                  .getElementById("form-section")
                  .scrollIntoView({ behavior: "smooth" })
              }>Start session</span>

                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-5 h-5 ml-2 -mr-1 transition duration-250 group-hover:translate-x-1"
                >
                  <path
                    clip-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
        </div>

        <div className="px-6 lg:px-2">
           <Image src={CEO} className="object-cover rounded-full ring-4 ring-blue-300 w-68 h-68"/>
           <div className="flex flex-col justify-center -mt-10 absolute px-2 py-1 ml-20 lg:ml-10 items-center w-44 bg-blue-100 rounded-lg shadow-inner">
               <h1 className="text-xl font-poppins font-bold text-[#182073]">Praveen Kumar</h1>
               <span className="text-sm">Founder, Disenosys</span>
           </div>
        </div>

      </div>


      <div className="mt-28">
          <Testimonials/>
      </div>

      <div className="mt-20">
        <div className="bg-world py-80 rounded-2xl shadow-xl text-center">
            <h1 className=" font-bold text-3xl font-poppins shadow-sm rounded-lg -mt-60 text-[#182073]">I&apos;ll let the numbers talk</h1>
            <div className="flex flex-col lg:flex-row  justify-center items-center gap-5 mt-44">
               <div className="flex justify-center w-60 items-center gap-2 px-2 py-1 bg-white rounded-md shadow-md">
               <FaGraduationCap className="w-10 h-10 text-[#182073]" />
                 <h4> <span className="text-xl lg:text-2xl font-bold font-poppins text-[#182073]">150K+</span> Learners</h4>
               </div>
               <div className="flex justify-center w-60 items-center gap-2 px-2 py-1 bg-white rounded-md shadow-md">
               <TbWorld 
               className="w-10 h-10 text-[#182073]" />
                 <h4> <span className="text-xl lg:text-2xl font-bold font-poppins text-[#182073]">30K+</span> Countries</h4>
               </div>
               <div className="flex justify-center w-60 items-center gap-2 px-2 py-1 bg-white rounded-md shadow-md">
               <MdStars className="w-10 h-10 text-[#182073]" />
                 <h4> <span className="text-xl lg:text-2xl font-bold font-poppins text-[#182073]">4.76/5</span> Ratings </h4>
               </div>
            </div>
        </div>
      </div>

      <div className="mt-20">
        <h1 className="font-bold font-poppins text-[#182073] text-xl lg:text-5xl text-center">Backed by the best</h1>
        <MarqueeView/>
      </div>

      
      <div className="mt-20">
        <Partner/>
      </div>

              
      <div className="mt-20">
      <h1 className="font-bold font-poppins text-[#182073] text-xl lg:text-5xl text-center">This workshop is for those who want to</h1>
         <div className="mt-28 mb-8">
        <Testi/>
        </div>   
      </div>
 

      
      <div className="mt-28 flex flex-col justify-center items-center">
        <h1 className="font-bold font-poppins text-xl lg:text-2xl text-center">And here&apos;s a</h1>
        <h4 className="font-bold font-poppins text-[#182073] text-xl lg:text-5xl text-center mb-12">message for you</h4>

        <iframe  src="https://www.youtube.com/embed/P30aMdOimG8?si=-97Ww_cvRg9PlkxI" className=" mb-12 rounded-lg shadow-inner w-[300px] h-[300px] lg:w-[980px] lg:h-[560px]" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>


      
      <div className="mt-28 bg-[#F4F9FF]">
          <div className="p-10">
        <h1 className="font-bold font-poppins text-[#182073] text-xl lg:text-5xl text-center">What will you learn</h1>
        <h2 className="font-bold font-poppins text-black text-xl lg:text-5xl text-center mt-5">in 5 days?</h2>
           <Learn/>
        </div>
       </div>


       
       <div className="mt-0 rounded-xl bg-gradient-to-r from-white to-blue-600  shadow-xl">
          <div className="p-10">
        <h1 className="font-bold font-poppins text-xl text-white  lg:text-5xl text-center">That was just the beginning,</h1>
        <h2 className="font-bold font-poppins text-black text-xl lg:text-3xl text-center mt-5">you will also learn</h2>
          <div className="mb-6">
           <Box/>
           </div>
        </div>
       </div>


       
        
       <div className="mt-0  bg-gradient-to-r from-blue-600 to-white rounded-xl shadow-xl">
          <div className="p-10">
          <h1 className="font-bold font-poppins text-xl text-white  lg:text-5xl text-center">You will master AI tools like</h1>
          <div>
            <Cards/>
            </div>
          </div>
       </div>

       
       <div id="form-section" className="mt-0 bg-blue-50 p-20 rounded-xl">
       <h1 className="font-bold font-poppins text-3xl text-[#182073] lg:text-5xl text-center lg:mb-10">Pricing</h1>
        <Enroll/>
        </div>

        <div className="mt-10">
          <Workshop/>
        </div>

        
      
        <div className="mt-10">
          <FAQ/>
        </div>

      {/* 

  



 */}
    </div>
  );
};

export default Update;
