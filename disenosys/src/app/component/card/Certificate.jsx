"use client";
import React from "react";
import "../../home/Home.css";
import Image from "next/image";
import logo from "../../assests/profile/l.jpg";
import s from "../../assests/profile/Signature.png";
import "../../globals.css";
const CertificateComponent = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col  w-[1000px]  rounded relative overflow-hidden h-[1200px] bg-center hover:cursor-pointer c">
        <div className="ml-8 text-center flex flex-col items-center">
          <div className="w-64 h-24 mr-12 mb-16">
            <Image src={logo} className="text-blue-600" />
          </div>
          <h2 className="text-[#cc1919] font-medium text-8xl font-berlin ml-40 b-4 ">
            Certificate
          </h2>
          <p className="text-6xl font-medium font-berlin text-gray-700 mr-2 ml-16">
            of Internship
          </p>
        </div>

        <div className="mt-8 ml-8 ">
          <p className="text-3xl font-berlin font-light text-gray-800 mr-16 mb-4 text-center">This certifies that</p>
          <h3 className="text-[#cc1919]  font-medium text-7xl font-sans ml-56 mb-4 text-center font-brush cname">Saim Wajid Qureshi</h3>
      </div>
      <div className="mt-2 ml-16">
      <p className="text-md mt-4 text-gray-700 ml-80 w-[580px] ">
        has completed the <span className="font-semibold">CATIA V5 Surface Design Internship</span> at Diseñosys from <span className="font-semibold">17th December 2023</span> to <span className="font-semibold">17th January 2024</span>.
      </p>
      <p className="text-lg mt-4 text-gray-700 ml-80 w-[600px]">
        We found him/her sincere, hardworking, dedicated, and result-oriented. He/She worked well as part of the team during his/her tenure.
      </p>
      <p className="text-lg mt-4 text-gray-700 ml-80 w-[600px]">
        We take this opportunity to thank and wish him/her 
         all the best for his/her future.
      </p>
      <p className="text-lg mt-4 text-gray-700 ml-80 w-[600px]">Awarded on<span className="font-semibold"> 31st January 2024.</span></p>
      </div>
      <div className="flex flex-col justify-end items-end  mt-24 mr-16 ">
      <Image src={s} className="text-blue-600 w-44 h-20 " />
      <div className="border border-b-2 border-gray-900 w-44 mb-3"></div>
      <p className="text-lg font-bold text-blue-900">PRAVEEN KUMAR S</p>
      <p className="text-gray-700 text-center mr-5">CEO, Disenosys</p>
      </div>
      </div>
    </div>
  );
};

export default CertificateComponent;
