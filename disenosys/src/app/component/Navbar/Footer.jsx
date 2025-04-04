"use client";
import React from "react";
import { FaInstagram, FaLinkedin, FaMapMarkerAlt, FaYoutube } from "react-icons/fa";
import { MdCall, MdOutlineCopyright, MdOutlineMail } from "react-icons/md";
import { FaSquareFacebook } from "react-icons/fa6";
import Link from "next/link";

const Footer = () => {
  return (
    <>
    <div className="bg-[#0d1039] font-poppins">
      <div className="container mx-auto px-10 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 space-x-0  space-y-4 md:space-y-0 sm:space-x-0 lg:space-x-12">
          <div className="col-span-1">
            <h1 className="font-bold text-xl md:text-xl text-white mb-4">
              DISENOSYS
            </h1>
            <p className="text-base md:text-md text-white mb-6">
              Welcome to Disenosys, your premier destination for specialized
              computational engineering services and training. Empowering
              innovation through expert engineering solutions.
            </p>
          </div>

          {/* Remaining Columns */}
          <div className="">
            <h1 className="font-bold text-xl md:text-xl text-white mb-4">
              QUICK LINKS
            </h1>
            <div className="space-y-3 flex flex-col">
              <Link href="/about" className="text-base md:text-md text-white hover:text-white transition-colors duration-300 cursor-pointer">
                About Us
              </Link>
              <Link href="/event" className="text-base md:text-md text-white hover:text-white transition-colors duration-300 cursor-pointer">
                Event
              </Link>
              <Link href="/successstory" className="text-base md:text-md text-white hover:text-white transition-colors duration-300 cursor-pointer">
                Success Story
              </Link>
              <Link href="/contact" className="text-base md:text-md text-white hover:text-white transition-colors duration-300 cursor-pointer">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h1 className="font-bold text-xl md:text-xl text-white mb-4">
              POLICY
            </h1>
            <div className="space-y-3 flex flex-col">
              <Link href="/privacyandpolicy" className="text-base md:text-md text-white hover:text-white transition-colors duration-300 cursor-pointer">
                Privacy Policy
              </Link>
              <Link href="/termsandcondition" className="text-base md:text-md text-white hover:text-white transition-colors duration-300 cursor-pointer">
                Terms & Conditions
              </Link>
              <Link href="/faq" className="text-base md:text-md text-white hover:text-white transition-colors duration-300 cursor-pointer">
                FAQ
              </Link>
            </div>
          </div>

          <div>
            <h1 className="font-bold text-xl md:text-xl text-white mb-4">
              SERVICES
            </h1>
            <div className="space-y-3 flex flex-col">
              <Link href="/eng&research" className="text-base md:text-md text-white hover:text-white transition-colors duration-300 cursor-pointer">
                Engineering & Research
              </Link>
              <Link href="/l&d" className="text-base md:text-md text-white hover:text-white transition-colors duration-300 cursor-pointer">
                Learning & Development
              </Link>
              <Link href="/staffing" className="text-base md:text-md text-white hover:text-white transition-colors duration-300 cursor-pointer">
                Staffing
              </Link>
            </div>
          </div>

          <div>
            <h1 className="font-bold text-xl md:text-xl text-white mb-4">
              CONTACT
            </h1>
            <div className="space-y-5  lg:space-y-2">
  <p className="text-base md:text-md text-white flex items-center justify-start gap-4 lg:gap-2 hover:text-white transition-colors duration-300 cursor-pointer">
    <FaMapMarkerAlt className="text-white w-8 h-8 lg:w-10 lg:h-12" />
    <span>11, VOC St, Ranga Colony, Rajakilpakam, Tamilnadu 60073</span>
  </p>
  <p className="text-base md:text-md text-white flex items-center justify-start gap-2 hover:text-white transition-colors duration-300 cursor-pointer">
    <MdCall className="text-white w-6 h-6" />
    <span>+91 90803 68892</span>
  </p>
  <p className="text-base md:text-md text-white flex items-center justify-start gap-2 hover:text-white transition-colors duration-300 cursor-pointer">
  <MdOutlineMail className="text-white w-6 h-6" />
    <span>info@Disenosys.com</span>
  </p>
</div>

          </div>
        </div>
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
      <div className="px-0 lg:px-28 flex flex-col justify-between md:flex-row">
          {/* <Link href="/consultation" className="w-80 mb-6 bg-white hover:bg-blue-200 text-lg font-garet flex justify-center items-center gap-2 text-[#0d1039] rounded shadow-inner px-2 py-4">
         
            <FiArrowRight className="transition-transform hover:-rotate-45 group-active:-rotate-12 text-xl" />
          </Link> */}
          <Link href="/consultation" class="relative bg-[#4b48ff] font-garet w-44 lg:w-80  text-white font-medium text-xl px-4 py-[0.35em] pl-5 h-[2.8em] rounded-[0.9em] flex items-center overflow-hidden cursor-pointer shadow-[inset_0_0_1.6em_-0.6em_#714da6] group mb-5">
            <span class="mr-10"> BOOK A CONSULTATION</span>
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
          {/* <h1 className="text-white font-medium text-sm md:text-sm lg:text-md text-end sm:text-left flex justify-center items-center">
            <MdOutlineCopyright size={20} className="pr-1" /> 2025 Disenosys |
            All rights reserved
          </h1> */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 items-center py-4">
        <div className="flex space-x-4 mt-4 sm:mt-0">
          <a href="https://www.linkedin.com/school/disenosys/">
        <FaLinkedin
            aria-label="Instagram"
            className="text-white hover:text-gray-400 transition-colors duration-300 cursor-pointer"
            size={30}
          />
          </a>
          <a href="https://www.facebook.com/disenosysofficial/">
          <FaSquareFacebook
            aria-label="Facebook"
            className="text-white hover:text-gray-400 transition-colors duration-300 cursor-pointer"
            size={30}
          />
          </a>
          <a href="https://www.instagram.com/disenosys_official/">
          <FaInstagram
            aria-label="Twitter"
            className="text-white hover:text-gray-400 transition-colors duration-300 cursor-pointer"
            size={30}
          />
          </a>
          <a href="https://youtube.com/@disenosysindia?feature=shared"> 
          <FaYoutube 
            aria-label="GitHub"
            className="text-white hover:text-gray-400 transition-colors duration-300 cursor-pointer"
            size={30}
          />
          </a>
        </div>
        </div> 
        {/* <div className="relative flex items-center justify-center mt-4 md:mt-0 mb-6">
          <div className="bg-[#182073] rounded-full w-16 h-16 text-center flex items-center justify-center z-40  ring-white ring-2 shadow-xl bg-gradient-to-r from-[#fffff] to-viloet-500 hover:from-indigo-200 hover:to-blue-800 ">
            <FaFacebookF className="text-lg text-purple-700" color="white" size={25}/>
          </div>
          <div className="bg-[#182073] rounded-full w-16 h-16 text-center flex items-center justify-center z-30  ring-white ring-2 -ml-4 shadow-xl  bg-gradient-to-r from-[#fffff] to-viloet-500 hover:from-indigo-200 hover:to-blue-800 ">
            <AiFillInstagram className="text-lg text-purple-700" color="white" size={25} />
          </div>
          <div className="bg-[#182073]  rounded-full w-16 h-16 text-center flex items-center justify-center z-10  ring-white ring-2 -ml-4 shadow-xl  bg-gradient-to-r from-[#fffff] to-viloet-500 hover:from-indigo-200 hover:to-blue-800 ">
            <BsTwitterX className="text-lg text-purple-700"  color="white" size={25}/>
          </div>
          <div className="bg-[#182073]  rounded-full w-16 h-16 text-center flex items-center justify-center z-0  ring-white ring-2 -ml-4 shadow-xl  bg-gradient-to-r from-[#fffff] to-viloet-500 hover:from-indigo-200 hover:to-blue-800 ">
            <FaWhatsapp className="text-lg text-purple-700"  color="white" size={25}/>
          </div>
        </div> */}
      </div>
    </div>
    <div className="bg-white ">
    <h1 className="text-[#0d1039] p-1 font-semibold font-sans text-sm md:text-sm lg:text-md text-end sm:text-left flex justify-center items-center">
            <MdOutlineCopyright size={20} className="pr-1" /> 2025 Disenosys |
            All rights reserved
          </h1> 
    </div>
    </>
  );
};

export default Footer;
