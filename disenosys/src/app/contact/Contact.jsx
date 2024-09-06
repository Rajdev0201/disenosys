import React from "react";
import Image from "next/image";
import side from "../assests/side.jpg";
import "./Contact.css";

export const Contact = () => {
  return (
    <>
      {/* Banner Section */}
      <div className="banner p-20 md:p-12 lg:p-36 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div></div>
          <div className="flex items-center justify-end">
            <h1 className="text-2xl tx md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-800">
              Contact us !.
            </h1>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className=" p-16 font-poppins w-full h-full bg-gradient-to-l from-violet-400 to-[#FFFFFF]  rounded-lg shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Contact Form */}
          <div className="flex items-center justify-center">
            <div className="w-full h-auto max-w-lg p-8 card shadow-lg">
              <h1 className="text-[#ba68c8] font-semibold text-3xl sm:text-4xl pb-3">
                Get in touch
              </h1>
              <p className="pb-6 sm:pb-8 font-normal text-lg sm:text-xl">
                We are here for you! How can we help?
              </p>
              <form>
                <label className="block text-lg sm:text-xl font-normal mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="p-2 mb-4 rounded-lg w-full border-2 outline-none border-[#ba68c8] focus:border-[#ba68c8] transition-colors"
                />
                <label className="block text-lg sm:text-xl font-normal mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="p-2 mb-4 rounded-lg w-full outline-none border-2 border-[#ba68c8] focus:border-[#ba68c8] transition-colors"
                />
                <label className="block text-lg sm:text-xl font-normal mb-2">
                  Message
                </label>
                <textarea
                  className="p-2 mb-4 rounded-lg outline-none w-full border-2 border-[#ba68c8] focus:border-[#ba68c8] transition-colors"
                  rows="5"
                />
                <button className="bg-[#ba68c8] text-white text-2xl w-full flex items-center justify-center mt-4 p-3 rounded-md font-bold shadow-md hover:bg-purple-700 transition-colors">
                  Submit
                </button>
              </form>
            </div>
          </div>

          {/* Contact Image */}
          <div className="flex items-center justify-center">
            <div className="w-full h-auto max-w-lg">
              <Image 
                src={side} 
                layout="responsive" 
                className="rounded-full bg-gray-800 p-4 shadow-md"
                alt="Contact" 
              />
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

