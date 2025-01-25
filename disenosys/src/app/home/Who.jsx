"use client";
import React from "react";
import who from "../assests/profile/Who.jpg";
import Image from "next/image";
const AboutSection = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-12 lg:px-20 shadow-xl rounded-lg mt-6">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#0d1039] text-center mb-8">
          WHO WE ARE
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <Image src={who} className="rounded-lg shadow-lg" />
          </div>

          <div className="text-[#0d1039] text-lg leading-relaxed">
            <p className="mt-4 text-lg leading-8 text-[#0d1039]">
              We Are Disenosys, A Well-Established EdTech Platform and A
              Successful Life-Changer for Most Students and Professionals. At
              Disenosys, Industry-Specific Courses Are Designed to Upskill You
              To Cope Up With The New World Job Expectations with ease. Since
              our inception in 2019, we have become the leading edtech training
              platform in the Indian Automotive Industry. In our journey of
              eternally empowering engineers, we have trained over 10,000
              engineers with industry-relevant skills in Automotive Product
              Design and assisted over 500 engineers to secure their dream jobs.
              With a well-curated curriculum by industry experts, we provide
              various Post Graduate courses on Automotive Body Design in a range
              of domains such as BIW, Plastic Trims, Seating, and many more in a
              variety of automotive CAD software such as CATIA, NX, Creo, and
              more. Our solid partnership with Automotive OEMs enables us to
              extend 100% Placement/job assistance for our trained candidates
              with TOP COMPANIES.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
