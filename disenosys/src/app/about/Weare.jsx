import Image from "next/image";
import React from "react";
import we from "../assests/we.jpg";
import lady from "../assests/lady.jpg";

export const Weare = () => {
  return (
    <div>
    <h1 className='font-bold font-poppins text-center text-[#182073]  text-xl lg:text-5xl'>WHO <span className=''>WE </span> ARE</h1>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 pb-12 mt-12 font-poppins">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 mx-auto">
          <div className="flex justify-center">
            <Image src={we} className="rounded-lg w-full h-auto" alt="We Image" />
          </div>
          <div className="flex items-center">
            <h1 className="text-base text-gray-600 sm:text-sm md:text-base lg:text-lg xl:text-lg leading-relaxed">
              We Are Disenosys, A Well-Established EdTech Platform and A
              Successful Life-Changer for Most Students and Professionals. At
              Disenosys, Industry-Specific Courses Are Designed to Upskill You
              To Cope Up With The New World Job Expectations with ease. Since
              our inception in 2019, we have become the leading edtech training
              platform in Indian Automotive Industry. In our journey of
              eternally empowering engineers, we have trained over 10,000
              engineers with industry-relevant skills in Automotive Product
              Design and assisted over 500 engineers to secure their dream jobs.
              With a well-curated curriculum by industry experts, We provide
              various Post Graduate courses on Automotive Body Design in a range
              of domains such as BIW, Plastic Trims, Seating and many more in a
              variety of automotive CAD software such as CATIA, NX, Creo, and
              more. Our solid partnership with Automotive OEMs enables us to
              extend 100% Placement/job assistance for our trained candidates
              with TOP COMPANIES.
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 py-28 mx-auto">
          <div className="flex flex-col justify-center">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-4xl font-bold pb-3 text-center md:text-left">
              One Platform for Lifting Your Career
            </h1>
            <p className="text-[#182073]  text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl pb-3 text-center md:text-left">
              EMPOWERING ENGINEER
            </p>
            <p className="italic text-gray-600 text-sm sm:text-base md:text-lg lg:text-lg xl:text-md pb-3 text-center md:text-left">
              We Disenosys, Are Working to Bridge This Skill Gap Between Academia
              and The Industry Requirements. We Have a Team of Industry Experts,
              With Over a Decade of Experience Who Empower Our Students to Land
              Their Dream Jobs in Core Automotive Companies.
            </p>
            <p className="text-[#182073]  text-sm sm:text-base md:text-lg lg:text-md xl:text-2xl pb-3 text-center md:text-left">
              “Our Students Are Our Hope. We Are Dedicated to Making Their Dreams
              Into Reality”
            </p>
          </div>
          <div className="flex justify-center">
            <Image
              src={lady}
              className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
              alt="Lady Image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
