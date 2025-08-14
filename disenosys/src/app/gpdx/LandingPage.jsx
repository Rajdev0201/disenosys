"use client"

// src/components/GPDXLandingPage.jsx
import React from "react";
import { GiSkills } from "react-icons/gi";
import Testimonials from "../home/Testimonials";
import Partner from "../home/Partner";
import gpdx from "../assests/gpdx2.png"
import Image from "next/image";

const GPDXLandingPage = () => {
    
  const sendWhatsAppMessage = () => {
    if (typeof window !== 'undefined') {
      const phoneNumber = '9150023820';
      const message = 'I want to get gpdx syllabus. Could you please share Syllabus? Thanks!';
      const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="font-sans mt-16 lg:mt-24">
      {/* Top Section */}
      <section className="bg-[#AFC8F4] lg:py-12 font-garet mb-12">
        <div className="grid lg:grid-cols-2">
          <div className="px-10 py-6 lg:px-24 lg:py-16">
            <h2 className="text-xl lg:text-3xl font-bold mb-6 text-gray-800">
              GPDX – Global Product Design Excellence Exam.
            </h2>
            <p className="max-w-2xl text-gray-700 mb-2 text-sm  font-bold lg:text-xl">
              Prove Your Skills. Get Hired.
            </p>
            <p className="max-w-2xl text-gray-700 mb-6 text-sm lg:text-xl">
              The ultimate skill-based screening test for automotive product
              design engineers. Showcase your expertise in CATIA V5 or Siemens
              NX and get direct referrals to top automotive companies.
            </p>
            <div className="flex flex-col lg:flex-row gap-4">
          <button className="bg-white text-blue-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition duration-300">
           <a href="https://rzp.io/rzp/RW7h49BN"
               target="_blank" 
                rel="noopener noreferrer"  
           >Register Now</a>
      </button>
              <button className="bg-[#0d1039] text-white  px-6 py-2 rounded-md hover:bg-gray-500" onClick={sendWhatsAppMessage}>
                View Syllabus
              </button>
            </div>
          </div>
          <div>
          <Image src={gpdx} alt="bg-gpdx" className="object-cover"/>
         </div>
        </div>
      </section>

      {/* About Exam Icons */}
      <section className="px-10 lg:py-10 bg-white font-garet mb-12">
        <div className="mx-auto lg:px-24">
          <h3 className="text-2xl md:text-4xl lg:text-4xl font-medium md:px-12 font-garet lg:px-0 text-[#0d1039] mb-5">
            About the GPDX Exam
          </h3>
          <p className="w-full text-gray-700 mb-12 text-sm lg:text-lg">
            GPDX is a skill-based assessment designed to evaluate your job
            readiness in automotive product design. The exam covers CAD
            modeling, drafting, assembly, surface remastering, BIW and plastics
            fundamentals, GD&T, and basic communication skills. Candidates who
            clear the exam are referred to relevant job openings with our
            partner automotive companies — no extra training required if you
            pass.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <img
                src="https://img.icons8.com/ios/50/000000/engineering.png"
                alt="CAD Tools"
                className="mx-auto mb-2"
              />
              <p className="text">CAD Tools</p>
            </div>
            <div>
              <img
                src="https://img.icons8.com/ios/50/000000/car-roof-box.png"
                alt="BIW / Plastics"
                className="mx-auto mb-2"
              />
              <p>BIW / Plastics</p>
            </div>
            <div>
              <img
                src="https://img.icons8.com/ios/50/000000/measure.png"
                alt="GD&T"
                className="mx-auto mb-2"
              />
              <p>GD&amp;T</p>
            </div>
            <div>
              <img
                src="https://img.icons8.com/ios/50/000000/conference-call.png"
                alt="Job Referrals"
                className="mx-auto mb-2"
              />
              <p>Job Referrals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Take Exam */}
      <section className="bg-blue-50 py-10 font-garet mb-12">
        <div className="container px-10 lg:px-24 py-6 lg:py-12">
          <h3 className="text-2xl md:text-4xl lg:text-4xl font-medium px-4 md:px-12 font-garet lg:px-3 text-[#0d1039] mb-8">
            Why Take the GPDX Exam?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-start md:text-left text-sm lg:text-xl">
            <div className="flex items-center gap-3">
              <span className="text-blue-700 text-xl bg-blue-200 rounded-full p-1">
                ⭐
              </span>
              <p>Direct Job Referrals – Get your profile submitted to leading OEMs and Tier-1 suppliers.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-blue-700 text-xl bg-blue-200 rounded-full p-1">
                💼
              </span>
              <p>Industry-Recognized Assessment – Valid for one year from certification date.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-blue-700 text-xl  bg-blue-200 rounded-full p-1">
                📜
              </span>
              <p>Prove Your Skills – Showcase your CAD and design knowledge to hiring managers.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-blue-700 text-xl  bg-blue-200 rounded-full p-1">
                ✅
              </span>
              <p>Save Time – Skip additional training if you’re already job-ready.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Syllabus */}
      <section className="py-2 lg:py-10 bg-white font-garet">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-medium px-4 md:px-12 font-garet lg:px-3 text-[#0d1039] mb-4 lg:mb-8 text-center">
            Syllabus
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "CAD Modelling in CATIA V5 or Siemens NX",
              "Drafting and Assembly",
              "Surface Remastering",
              "BIW (Body-in-White) Fundamentals",
              "Plastic Trim Fundamentals",
              "GD&T (Geometric Dimensioning & Tolerancing)",
              "Basic Communication Skills"
              
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white border  border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex  justify-center items-center p-5 mt-2"
              >
                {/* Title */}
                <h4 className="text-sm lg:text-md font-medium text-center text-gray-800">{item}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

        <section className="py-10 bg-white font-garet">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-medium px-4 md:px-12 font-garet lg:px-3 text-[#0d1039] mb-8  text-center">
            Exam Details
          </h3>
               <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center p-2">
                   <span className="bg-blue-100 text-blue-700 px-3 py-2 text-md md:text-lg rounded-full font-medium">
                Mode: Online
              </span>
              <span className="bg-green-100 text-green-700 0 px-3 py-2 text-md md:text-lg rounded-full font-medium">
                Duration: 3 hrs
              </span>
              <span className="bg-blue-100 text-blue-700 px-3 py-2 text-md md:text-lg rounded-full font-medium">
                Price: ₹ 4,999
              </span>
              <span className="bg-green-100 text-green-700 px-3 py-2 text-md md:text-lg rounded-full font-medium">
               Validity: 1 Year
              </span>
              </div>
            </div>
      </section>


      <section className="py-12 bg-gray-50 font-garet">
  <div className="container mx-auto px-4 space-y-12">

    {/* How It Works */}
    <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-all duration-300">
      <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium px-4 md:px-12 font-garet lg:px-3 text-[#0d1039] mb-8  text-center">How It Works</h3>
      <div className="grid sm:grid-cols-3 gap-6 text-center">
        {[
          { text: "Register for the GPDX Exam.", icon: "📝" },
          { text: "Attempt the test from anywhere, online.", icon: "💻" },
          { text: "Get Certified and receive job referrals.", icon: "🏆" }
        ].map((item, index) => (
          <div
            key={index}
            className="bg-blue-50 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300"
          >
            <div className="text-3xl mb-3">{item.icon}</div>
            <p className="text-gray-700 font-medium">{item.text}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Who Can Apply */}
    <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-all duration-300">
      <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium px-4 md:px-12 font-garet lg:px-3 text-[#0d1039] mb-8  text-center">Who Can Apply</h3>
      <div className="grid sm:grid-cols-3 gap-6 text-center">
        {[
          "Fresh graduates in Mechanical, Automobile, Aeronautical, or related fields.",
          "Working professionals looking to switch into automotive product design.",
          "Candidates confident in CATIA V5 or Siemens NX skills."
        ].map((item, index) => (
          <div
            key={index}
            className="bg-green-50 relative flex flex-col p-6 items-center rounded-lg shadow-sm hover:shadow-md transition duration-300"
          >
            <p className="text-gray-700 font-medium mb-4">{item}</p>
            <GiSkills size={30} className="absolute bottom-1 rounded-full p-1 bg-blue-500 text-white"/>
          </div>
        ))}
      </div>
    </div>

    {/* Final Call to Action */}
    <div className="bg-blue-900 text-white rounded-xl shadow-lg p-10 text-center">
      <h3 className="text-2xl lg:text-3xl font-medium mb-4">Ready to Prove Your Automotive Design Skills?</h3>
      <p className="mb-6 text-sm text-blue-100">
        Register for the GPDX Exam today and fast-track your career in the automotive industry.
      </p>
      <button className="bg-white text-blue-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition duration-300">
        <a href="https://rzp.io/rzp/RW7h49BN"
         target="_blank" 
         rel="noopener noreferrer"     
        >Register Now</a>
      </button>
    </div>

  </div>
</section>


      {/* Success Stories */}
      <Testimonials />
      <Partner />
    </div>
  );
};

export default GPDXLandingPage;
