"use client";

import React from "react";
import { MdCastForEducation } from "react-icons/md";

const Workshop = () => {
  return (
    <div className="bg-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-[#182073] text-center mb-8">
          Bonuses worth ₹45,000
        </h2>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="bg-blue-100 p-6 rounded-md mb-4 flex justify-center items-center">
            <MdCastForEducation className="object-cover w-28 h-28 text-[#182073]" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Course Notes</h3>
            <p className="text-gray-700 text-sm">
              Stressed about balancing learning and taking notes? No worries,
              I&apos;ve got your back.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="bg-blue-100 p-6 rounded-md mb-4 flex justify-center items-center">
            <MdCastForEducation className="object-cover w-28 h-28 text-[#182073]" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Course Notes</h3>
            <p className="text-gray-700 text-sm">
              Stressed about balancing learning and taking notes? No worries,
              I&apos;ve got your back.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
       
            <div className="bg-blue-100 p-6 rounded-md mb-4 flex justify-center items-center">
            <MdCastForEducation className="object-cover w-28 h-28 text-[#182073]" />
       
            </div>
            <h3 className="text-lg font-semibold mb-2">Certificate</h3>
            <p className="text-gray-700 text-sm">
              Want to certify your learnings?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workshop;
