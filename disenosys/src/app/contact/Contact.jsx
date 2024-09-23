import React from "react";
import Image from "next/image";
import side from "../assests/brand.png";
import "./Contact.css";

export const Contact = () => {
  return (
    <>

      <div className="banner p-20 md:p-12 lg:p-48 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div></div>
          <div className="flex items-center justify-end">
            <h1 className="text-2xl tx md:text-6xl font-bold text-transparent bg-clip-text bg-[#182073]">
              Contact us !.
            </h1>
          </div>
        </div>
      </div>


      <div className=" p-16 font-poppins w-full h-full bg-white  rounded-lg shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 items-center">
   
          <div className="flex items-center justify-center">
            <div className="w-full h-auto max-w-lg">
              <Image
                src={side}
                layout="responsive"
                className="rounded-full bg-[#182073] p-4 shadow-md"
                alt="Contact"
              />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full h-auto max-w-lg p-8 bg-[#182073] rounded-lg shadow-lg">
              <h1 className="text-white font-semibold font-poppins text-3xl sm:text-4xl pb-3">
                Get in touch
              </h1>
              <p className="pb-6 text-gray-50 font-poppins sm:pb-8 font-normal text-base sm:text-xl">
                We are here for you! How can we help?
              </p>
              <form>
                <div className="mb-4">
                  <label
                    className="block text-base sm:text-xl mb-2 text-gray-50"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-2 border-b-2 text-white border-yellow-400 bg-transparent outline-none focus:border-yellow-600 transition-colors"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-base sm:text-xl mb-2 text-gray-50"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-2 border-b-2 text-white border-yellow-400 bg-transparent outline-none focus:border-yellow-600 transition-colors"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-base sm:text-xl mb-2 text-gray-50"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    placeholder="Your Message"
                    className="w-full p-2 border-b-2 text-white border-yellow-400 bg-transparent outline-none focus:border-yellow-600 transition-colors"
                    rows="5"
                  />
                </div>

                <button className="bg-white text-[#182073] font-semibold p-3 text-lg rounded-md w-full transition-all hover:bg-[#FFC857]">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
