"use client";
import React from "react";
import img from "../assests/models/CATIA.png";
import Image from "next/image";
const Bootcamp = () => {
  return (
    <div>
      <div className="bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-800 text-white px-4 sm:px-6 md:px-10 lg:px-32 xl:px-32 2xl:px-44 mx-auto p-12 mt-20 font-poppins rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 my-6 gap-6 md:gap-8 mx-auto container px-2 py-12">
          <div className="">
            <h1 className="text-xl sm:text-2xl md:text-xl lg:text-6xl font-bold">
              Master Automotive Design with{" "}
              <span className="text-yellow-400">CATIA</span>
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-xl xl:text-xl font-bold py-4">
              Join Our <span className="text-yellow-400">Intensive </span>
              Bootcamp
            </h2>
            <p className="text-lg sm:text-xl md:text-xl lg:text-lg mt-4 font-light">
              Accelerate your career with hands-on training in CATIA, the
              leading software for automotive design. This bootcamp covers
              everything from design fundamentals to advanced modeling
              techniques, guided by industry experts.
            </p>
            {/* <ul className="list-disc list-inside mt-6 space-y-2 text-lg sm:text-xl md:text-2xl lg:text-xl">
            <li>Learn the essentials of CATIA for automotive engineering.</li>
            <li>Develop real-world skills with practical, project-based learning.</li>
            <li>Network with professionals and enhance your career prospects.</li>
          </ul> */}
            <button className="bg-yellow-500 hover:bg-yellow-600 text-lg font-bold font-poppins rounded-lg text-white px-6 sm:px-7 md:px-8 lg:px-9 py-2 my-4 md:my-6"
              onClick={() => document.getElementById('form-section').scrollIntoView({ behavior: 'smooth' })}
            >
              Register for the Bootcamp
            </button>
          </div>

          <div className="flex justify-center">
            <Image
              src={img}
              alt="CATIA Design"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
      
      <section className="py-16 px-6 md:px-12 text-center bg-blue-50 rounded shadow-lg">
  <h2 className="font-bold font-poppins text-[#182073] text-3xl lg:text-5xl mb-8">
    Why Our Bootcamp?
  </h2>

  <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-12 ">
    <div className="hover:-translate-y-2 group bg-neutral-50 duration-500 w-52 h-52 flex text-neutral-600 flex-col justify-center items-center relative rounded-xl overflow-hidden shadow-md">
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute blur z-10 fill-[#182073] duration-500 group-hover:blur-none group-hover:scale-105"
      >
        <path
          transform="translate(100 100)"
          d="M39.5,-49.6C54.8,-43.2,73.2,-36.5,78.2,-24.6C83.2,-12.7,74.8,4.4,69,22.5C63.3,40.6,60.2,59.6,49.1,64.8C38.1,70,19,61.5,0.6,60.7C-17.9,59.9,-35.9,67,-47.2,61.9C-58.6,56.7,-63.4,39.5,-70,22.1C-76.6,4.7,-84.9,-12.8,-81.9,-28.1C-79,-43.3,-64.6,-56.3,-49.1,-62.5C-33.6,-68.8,-16.8,-68.3,-2.3,-65.1C12.1,-61.9,24.2,-55.9,39.5,-49.6Z"
        ></path>
      </svg>

      <div className="z-20 flex flex-col justify-center items-center">
        <span className="font-bold text-4xl text-white lg:text-5xl">34+</span>
        <p className="font-bold text-lg  text-white lg:text-xl">Projects</p>
      </div>
    </div>

    <div className="hover:-translate-y-2 group bg-neutral-50 duration-500 w-52 h-52 flex text-neutral-600 flex-col justify-center items-center relative rounded-xl overflow-hidden shadow-md">
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute blur z-10 fill-[#182073] duration-500 group-hover:blur-none group-hover:scale-105"
      >
        <path
          transform="translate(100 100)"
          d="M39.5,-49.6C54.8,-43.2,73.2,-36.5,78.2,-24.6C83.2,-12.7,74.8,4.4,69,22.5C63.3,40.6,60.2,59.6,49.1,64.8C38.1,70,19,61.5,0.6,60.7C-17.9,59.9,-35.9,67,-47.2,61.9C-58.6,56.7,-63.4,39.5,-70,22.1C-76.6,4.7,-84.9,-12.8,-81.9,-28.1C-79,-43.3,-64.6,-56.3,-49.1,-62.5C-33.6,-68.8,-16.8,-68.3,-2.3,-65.1C12.1,-61.9,24.2,-55.9,39.5,-49.6Z"
        ></path>
      </svg>

      <div className="z-20 flex flex-col justify-center items-center">
        <span className="font-bold text-4xl text-white lg:text-5xl">100%</span>
        <p className="font-bold text-lg  text-white lg:text-xl">Job Placement</p>
      </div>
    </div>

    <div className="hover:-translate-y-2 group bg-neutral-50 duration-500 w-52 h-52 flex text-neutral-600 flex-col justify-center items-center relative rounded-xl overflow-hidden shadow-md">
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute blur z-10 fill-[#182073] duration-500 group-hover:blur-none group-hover:scale-105"
      >
        <path
          transform="translate(100 100)"
          d="M39.5,-49.6C54.8,-43.2,73.2,-36.5,78.2,-24.6C83.2,-12.7,74.8,4.4,69,22.5C63.3,40.6,60.2,59.6,49.1,64.8C38.1,70,19,61.5,0.6,60.7C-17.9,59.9,-35.9,67,-47.2,61.9C-58.6,56.7,-63.4,39.5,-70,22.1C-76.6,4.7,-84.9,-12.8,-81.9,-28.1C-79,-43.3,-64.6,-56.3,-49.1,-62.5C-33.6,-68.8,-16.8,-68.3,-2.3,-65.1C12.1,-61.9,24.2,-55.9,39.5,-49.6Z"
        ></path>
      </svg>

      <div className="z-20 flex flex-col justify-center items-center">
        <span className="font-bold text-4xl text-white lg:text-5xl">24/7</span>
        <p className="font-bold text-lg lg:text-xl text-white">Mentorship</p>
      </div>
    </div>
  </div>
</section>


      <section className="bg-white py-16 px-6 md:px-28">
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-12">
            <Image
              src={img}
              alt="Feature 1"
              className="w-full md:w-1/2 rounded-lg shadow-lg"
            />
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-[#182073]">
                Hands-On Learning
              </h3>
              <p className="text-gray-600 mt-3">
                Build projects that simulate real-world scenarios to enhance
                your learning experience and gain practical skills.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center space-y-6 md:space-y-0 md:space-x-12">
            <Image
              src={img}
              alt="Feature 2"
              className="w-full md:w-1/2 rounded-lg shadow-lg"
            />
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-[#182073]">
                Expert Mentorship
              </h3>
              <p className="text-gray-600 mt-3">
                Learn from professionals who are actively working in the
                industry, providing guidance on best practices and career
                growth.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-12">
            <Image
              src={img}
              alt="Feature 3"
              className="w-full md:w-1/2 rounded-lg shadow-lg"
            />
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-[#182073]">
                Job Assistance
              </h3>
              <p className="text-gray-600 mt-3">
                We help you with job placements and offer interview coaching to
                help you land your dream job in tech.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="form-section" className="bg-blue-50 py-16 px-6 md:px-12">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-[#182073] text-center mb-6">
            Fill the Form to Join
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-600 text-sm mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>
            {/* <div>
              <label className="block text-gray-600 text-sm mb-2">
                Message
              </label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-600"
                rows="4"
              ></textarea>
            </div> */}
            <button
              type="submit"
              className="w-full bg-[#182073] hover:bg-[#182073] text-white py-3 font-poppins rounded-lg font-semibold"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Bootcamp;
