import React from "react";
import "./Course.css";
import Image from "next/image";
import g from "../assests/Group.jpg";
import { FaPlayCircle } from "react-icons/fa";
import hand from "../assests/hans.jpg";
import { FaMedal } from "react-icons/fa";
import { GrUserExpert } from "react-icons/gr";
import { BiSolidInstitution } from "react-icons/bi";
import { IoLogoYoutube } from "react-icons/io5";
import { GiRibbonMedal } from "react-icons/gi";
import { ImPriceTag } from "react-icons/im";
import h from "../assests/100.svg";

export const Course = () => {
  return (
    <>
      <div className="bg-white px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 2xl:px-44 mx-auto p-12 mt-6 font-poppins">
        <div className="grid grid-cols-1 md:grid-cols-2 my-6 gap-6 md:gap-8">
          <div>
            <h1 className="text-blue-800 text-lg sm:text-xl md:text-xl lg:text-xl xl:text-4xl font-poppins">
              Let&apos;s <span className="font-bold">Begin</span>
            </h1>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold py-2 md:py-4 font-poppins">
              Lets Find The
            </h1>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold py-2 md:py-4 font-poppins">
              Right<span className="text-blue-800 px-2 md:px-4">Course</span>For{" "}
            </h1>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold py-2 md:py-4 font-poppins">
              You
            </h1>
            <button className="bg-blue-800 text-lg font-bold rounded-lg text-white px-6 sm:px-7 md:px-8 lg:px-9 py-2 my-2 md:my-4">
              Register
            </button>
            <button className=" rounded-lg font-semibold text-slate-900 px-6 sm:px-7 md:px-8 lg:px-9 py-2 my-2 md:my-4">
              <FaPlayCircle
                className="bg-yellow-600 rounded-full inline-flex "
                size={20}
              />{" "}
              Play vedio
            </button>
          </div>
          <div className="flex justify-center">
            <Image src={g} className="w-full bg-none sm:w-4/5" />
          </div>
        </div>
      </div>
      <div className="p-6 sm:p-12 lg:p-24 bg-[#182073]">
        <h1 className='text-2xl font-semibold font-poppins text-white text-center md:text-3xl lg:text-4xl'>
        Why <span className='text-white'>Consult</span> with us?
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 sm:p-12">
          <div className="handshake shadow-border-shadow p-5 flex justify-center items-center bg-white">
            <Image
              src={hand}
              width={"50px"}
              height={"50px"}
              alt="Handshake Icon"
            />
          </div>
          <div className="handshake shadow-border-shadow p-4 bg-white">
            <div className="border-b border-gray-300 py-3">
              <h2 className="px-6 sm:px-12 text-lg sm:text-xl font-semibold font-poppins">
                <FaMedal className="inline-flex mr-2" />
                Quality Training Materials and Content
              </h2>
            </div>
            <div className="border-b border-gray-300 py-3">
              <h2 className="px-6 sm:px-12 text-lg sm:text-xl font-semibold font-poppins">
                <GrUserExpert className="inline-flex mr-2" />
                Industry Experts as Instructors
              </h2>
            </div>
            <div className="border-b border-gray-300 py-3">
              <h2 className="px-6 sm:px-12 text-lg sm:text-xl font-semibold font-poppins">
                <BiSolidInstitution className="inline-flex mr-2" />
                Collaboration with Research Labs and Industries
              </h2>
            </div>
            <div className="border-b border-gray-300 py-3">
              <h2 className="px-6 sm:px-12 text-lg sm:text-xl font-semibold font-poppins">
                <IoLogoYoutube className="inline-flex mr-2" />
                Multiple Options: Learn at Your Pace, Recorded Live Sessions, &
                Mentorship Programs
              </h2>
            </div>
            <div className="border-b border-gray-300 py-3">
              <h2 className="px-6 sm:px-12 text-lg sm:text-xl font-semibold font-poppins">
                <GiRibbonMedal className="inline-flex mr-2" />
                Highly Regarded Professional Certificates
              </h2>
            </div>
            <div className="border-b border-gray-300 py-3">
              <h2 className="px-6 sm:px-12 text-lg sm:text-xl font-semibold font-poppins">
                <ImPriceTag className="inline-flex mr-2" />
                Affordable, Friendly Pricing
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-16 pb-12 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 2xl:px-44">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-7 flex justify-center items-center">
          {/* Image Section */}
          <div className="md:col-span-2 flex justify-center items-center mt-20 md:justify-center">
            <Image
              src={h}
              alt="Risk-Free Image"
              className="w-44 h-44 md:w-52 md:h-52 lg:w-66 lg:h-66"
            />
          </div>

          {/* Text Section */}
          <div className="md:col-span-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mt-12 font-poppins py-3">
              100% Risk Free, We Promise You
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              If you are unsatisfied for any reason for up to 5 days following
              your purchase, contact us for a full refund. No questions asked.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
