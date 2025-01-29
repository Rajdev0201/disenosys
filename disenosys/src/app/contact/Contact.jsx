import React from "react";
import Image from "next/image";
import side from "../assests/profile/brand-white.png";
import "./Contact.css";
import sub from "../assests/profile/contact-sub.jpg"
import { FaInstagram, FaLinkedin, FaMapMarkerAlt } from "react-icons/fa";
import { MdCall, MdOutlineMail } from "react-icons/md";
import { FaSquareFacebook } from "react-icons/fa6";

export const Contact = () => {
  return (
    <>
{/* 
<div className="mt-28 py-24">
      <div className="banner-contact p-20 md:p-12 lg:p-80 flex flex-col items-center justify-start -mt-72 mb-6">
        <Image src={side} className="w-[300px] h-[63px]" alt="brand" />
        <h4 className="text-xl text-white font-medium">Connect With Us</h4>
      </div>
      <div className="p-16 font-poppins container mx-auto -mt-96">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white rounded-2xl shadow-2xl p-10 relative">
          <div className="w-full max-w-lg">
            <h1 className="text-[#0d1039] font-semibold text-3xl sm:text-4xl pb-3">
              Get in touch
            </h1>
            <p className="pb-6 text-gray-500 text-base sm:text-md">
              We are here for you! How can we help?
            </p>
            <form>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  className="w-full p-2 border border-gray-200 rounded-md bg-[#F5F5FF] outline-none focus:border-yellow-600 transition-colors"
                />
              </div>

              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-2 border border-gray-200 rounded-md bg-[#F5F5FF] outline-none focus:border-yellow-600 transition-colors"
                />
              </div>

              <div className="mb-4">
                <textarea
                  placeholder="Your Message"
                  className="w-full p-2 border border-gray-200 rounded-md bg-[#F5F5FF] outline-none focus:border-yellow-600 transition-colors"
                  rows="5"
                />
              </div>

              <button className="text-white bg-[#0d1039] font-semibold p-3 text-lg rounded-md w-full transition-all hover:bg-[#FFC857]">
                Submit
              </button>
            </form>
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-6 w-full max-w-sm">
              <Image src={sub} className="object-cover rounded-md" alt="sub" />
            </div>


            <div className="space-y-6 w-full max-w-lg">
              <p className="text-gray-600 flex items-center gap-2">
                <FaMapMarkerAlt className="text-[#0d1039] w-6 h-6 ring-2 ring-[#6F65FA] rounded-full p-1" />
                <span>11, VOC St, Ranga Colony, Rajakilpakam, Tamilnadu 60073</span>
              </p>
              <p className="text-gray-600 flex items-center gap-2">
                <MdCall className="text-[#0d1039] w-6 h-6 ring-2 ring-[#6F65FA] rounded-full p-1" />
                <span>+91 90803 68892</span>
              </p>
              <p className="text-gray-600 flex items-center gap-2">
                <MdOutlineMail className="text-[#0d1039] w-6 h-6 ring-2 ring-[#6F65FA] rounded-full p-1" />
                <span>info@Disenosys.com</span>
              </p>
            </div>
            <div className="absolute bottom-12 -right-12 ml-1 z-40 flex flex-col items-center space-y-3 p-4 rounded-br-full rounded-tr-xl  bg-[#0d1039] before:absolute before:inset-0 before:rounded-br-full before:rounded-tr-xl before:bg-[#0d1039]  before:-z-50">
  <FaLinkedin className="text-white hover:text-gray-400 cursor-pointer" size={18} />
  <FaSquareFacebook className="text-white hover:text-gray-400 cursor-pointer" size={18} />
  <FaInstagram className="text-white hover:text-gray-400 cursor-pointer" size={18} />
</div>

          </div>
        </div>
      </div>
    </div> */}
    <div className="banner-contact p-20 md:p-12 lg:p-80 mt-20 ">
          <div className="flex flex-col items-center justify-start lg:-mt-44">
            <Image src={side} className="w-[300px] h-[63px] " alt="brand"/>
            <h4 className="font-garet text-xl  text-white font-medium">Connect With Us</h4>
          </div>
        </div>

      <div className="lg:p-16 font-poppins lg:container lg:mx-auto lg:-mt-96">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white rounded-2xl shadow-2xl relative">
          <div className="flex items-center justify-center">
            <div className="w-full h-auto max-w-lg p-8">
              <h1 className="  text-[#0d1039] font-semibold font-garet text-3xl sm:text-4xl pb-3">
                Get in touch
              </h1>
              <p className="pb-6 text-gray-500 font-normal sm:pb-8 font-sans text-base sm:text-md">
                We are here for you! How can we help?
              </p>
              <form>
                <div className="mb-8">
    
                  <input
                    type="text"
                    placeholder="Enter Your Name"
                    className="w-full p-2 border text-white border-gray-200 rounded-md bg-[#F5F5FF] outline-none focus:border-yellow-600 transition-colors"
                  />
                </div>

                <div className="mb-8">
                  {/* <label
                    className="block text-base sm:text-xl mb-2 text-gray-50"
                    htmlFor="email"
                  >
                    Email
                  </label> */}
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    className="w-full p-2 border text-white border-gray-200 rounded-md bg-[#F5F5FF] outline-none focus:border-yellow-600 transition-colors"
                  />
                </div>

                <div className="mb-8">
                  {/* <label
                    className="block text-base sm:text-xl mb-2 text-gray-50"
                    htmlFor="message"
                  >
                    Message
                  </label> */}
                  <textarea
                    placeholder="Enter Your Message"
                    className="w-full p-2 border text-white border-gray-200 rounded-md bg-[#F5F5FF] outline-none focus:border-yellow-600 transition-colors"
                    rows="5"
                  />
                </div>

                <button className="text-white bg-[#0d1039] font-semibold font-garet p-3 text-lg rounded-md w-full transition-all hover:bg-[#FFC857]">
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div className="flex items-center justify-center flex flex-col -mt-10">
              <div className="mb-6 p-20">
               <Image src={sub} className="object-cover" alt="sub"/>
              </div>
              <div className="space-y-6 p-6 lg:p-0 -mt-16 lg:-mt-20">
                <p className="text-base font-medium text-gray-600 font-garet flex items-center justify-start gap-2 transition-colors duration-300 cursor-pointer">
                    <FaMapMarkerAlt className="text-[#0d1039] w-6 h-6 ring-2 ring-[#6F65FA] rounded-full p-1" />
                    <span>11, VOC St, Ranga Colony, Rajakilpakam, Tamilnadu 60073</span>
                  </p>
                  <p className="text-base  font-medium text-gray-600   font-garet flex items-center justify-start gap-2transition-colors duration-300 cursor-pointer">
                    <MdCall className="text-[#0d1039] w-6 h-6  ring-2 ring-[#6F65FA] rounded-full p-1" />
                    <span className="mx-1">  +91 90803 68892</span>
                  </p>
                  <p className="text-base  font-medium text-gray-600  font-garet flex items-center justify-start gap-2 transition-colors duration-300 cursor-pointer">
                  <MdOutlineMail className="text-[#0d1039] w-6 h-6  ring-2 ring-[#6F65FA] rounded-full p-1" />
                    <span>info@Disenosys.com</span>
                  </p>
              </div>
              <div className="absolute bottom-8 -right-0 lg:-right-12 ml-1 z-40 flex flex-col items-center space-y-3 py-7 px-4 rounded-br-full rounded-tr-xl  bg-[#0d1039] before:absolute before:inset-0 before:rounded-br-full before:rounded-tr-xl before:bg-[#0d1039]  before:-z-50">
  <FaLinkedin className="text-white hover:text-gray-400 cursor-pointer" size={20} />
  <FaSquareFacebook className="text-white hover:text-gray-400 cursor-pointer" size={20} />
  <FaInstagram className="text-white hover:text-gray-400 cursor-pointer" size={20} />
</div>

          
          </div>
        </div>
      </div>
    
    </>
  );
};
