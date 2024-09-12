"use client";

import React from "react";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { BsTwitterX } from "react-icons/bs";
import { MdOutlineCopyright } from "react-icons/md";

const Footer = () => {
  return (
    <div className="bg-[#182073] font-poppins">
      <div className="container mx-auto px-10 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 space-x-0  space-y-4 md:space-y-0 sm:space-x-0 lg:space-x-12">
          {/* Unique First Column */}
          <div className="col-span-1">
            <h1 className="font-bold text-xl md:text-xl text-white mb-4">DISENOSYS</h1>
            <p className="text-base md:text-md text-gray-300 mb-6">
              Welcome to Disenosys, your premier destination for specialized computational engineering services and training.
              Empowering innovation through expert engineering solutions.
            </p>
          </div>

          {/* Remaining Columns */}
          <div className="">
            <h1 className="font-bold text-xl md:text-xl text-white mb-4">QUICK LINKS</h1>
            <div className="space-y-3">
              <p className="text-base md:text-md text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">
                About Us
              </p>
              <p className="text-base md:text-md text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">
                Event
              </p>
              <p className="text-base md:text-md text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">
                Success Story
              </p>
              <p className="text-base md:text-md text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">
                Contact
              </p>
            </div>
          </div>

          <div>
            <h1 className="font-bold text-xl md:text-xl text-white mb-4">POLICY</h1>
            <div className="space-y-3">
              <p className="text-base md:text-md text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">
                Privacy Policy
              </p>
              <p className="text-base md:text-md text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">
                Terms & Conditions
              </p>
              <p className="text-base md:text-md text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">
                FAQ
              </p>
            </div>
          </div>

          <div>
            <h1 className="font-bold text-xl md:text-xl text-white mb-4">SERVICES</h1>
            <div className="space-y-3">
              <p className="text-base md:text-md text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">
                Engineering & Research
              </p>
              <p className="text-base md:text-md text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">
                Learning & Development
              </p>
              <p className="text-base md:text-md text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">
                Staffing
              </p>
            </div>
          </div>

          <div>
            <h1 className="font-bold text-xl md:text-xl text-white mb-4">CONTACT</h1>
            <div className="space-y-2">
              <p className="text-base md:text-md text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">
                11, VOC St, Ranga Colony,
              </p>
              <p className="text-base md:text-md text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">
                Rajakilpakam, Tamilnadu 60073
              </p>
              <p className="text-base md:text-md text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">
                +91 90803 68892
              </p>
              <p className="text-base md:text-md text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">
                info@Disenosys.com
              </p>
            </div>
          </div>
        </div>

        <hr className="border-gray-500 mt-5" />
      </div>

      {/* <div className="flex flex-col sm:flex-row justify-center gap-6 items-center py-4">
        <h1 className="text-white font-medium text-sm md:text-md lg:text-2xl text-center sm:text-left flex justify-center items-center">
          <MdOutlineCopyright size={20} className="pr-1" /> 2024 Disenosys | All rights reserved
        </h1>
        <div className="flex space-x-4 mt-4 sm:mt-0">
          <FaInstagram
            aria-label="Instagram"
            className="text-white hover:text-gray-400 transition-colors duration-300 cursor-pointer"
            size={20}
          />
          <FaSquareFacebook
            aria-label="Facebook"
            className="text-white hover:text-gray-400 transition-colors duration-300 cursor-pointer"
            size={20}
          />
          <FaXTwitter
            aria-label="Twitter"
            className="text-white hover:text-gray-400 transition-colors duration-300 cursor-pointer"
            size={20}
          />
          <FaGithub
            aria-label="GitHub"
            className="text-white hover:text-gray-400 transition-colors duration-300 cursor-pointer"
            size={20}
          />
        </div>
      </div> */}
      <div className="lg:px-16 flex flex-col justify-between md:flex-row">
        <div>
        <h1 className="text-white font-medium text-sm md:text-md lg:text-2xl text-center sm:text-left flex justify-center items-center">
          <MdOutlineCopyright size={20} className="pr-1" /> 2024 Disenosys | All rights reserved
        </h1>
        </div>

        <div className="relative flex items-center justify-center mt-4 md:mt-0 mb-6">
          <div className="bg-violet-800 rounded-full w-16 h-16 text-center flex items-center justify-center z-40  ring-white ring-2 shadow-xl bg-gradient-to-r from-[#fffff] to-viloet-500 hover:from-indigo-200 hover:to-blue-800 ">
            <FaFacebookF className="text-lg text-purple-700" color="white" size={25}/>
          </div>
          <div className="bg-violet-800 rounded-full w-16 h-16 text-center flex items-center justify-center z-30  ring-white ring-2 -ml-4 shadow-xl  bg-gradient-to-r from-[#fffff] to-viloet-500 hover:from-indigo-200 hover:to-blue-800 ">
            <AiFillInstagram className="text-lg text-purple-700" color="white" size={25} />
          </div>
          <div className="bg-violet-800 rounded-full w-16 h-16 text-center flex items-center justify-center z-10  ring-white ring-2 -ml-4 shadow-xl  bg-gradient-to-r from-[#fffff] to-viloet-500 hover:from-indigo-200 hover:to-blue-800 ">
            <BsTwitterX className="text-lg text-purple-700"  color="white" size={25}/>
          </div>
          <div className="bg-violet-800 rounded-full w-16 h-16 text-center flex items-center justify-center z-0  ring-white ring-2 -ml-4 shadow-xl  bg-gradient-to-r from-[#fffff] to-viloet-500 hover:from-indigo-200 hover:to-blue-800 ">
            <FaWhatsapp className="text-lg text-purple-700"  color="white" size={25}/>
          </div>
        </div>
        </div>
    </div>
  );
};

export default Footer;
