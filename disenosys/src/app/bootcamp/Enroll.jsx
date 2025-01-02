"use client";
import React from "react";

const Enroll = () => {
  return (
    <div className="flex justify-center items-center mt-28">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
        <div className="text-center">
          <div className="bg-[#182073] text-white text-lg font-bold py-2 px-8 inline-block rounded-lg relative -top-16 shadow-md">
            <span className="text-2xl">₹199</span>{" "}
            <span className="line-through text-gray-300 text-sm">₹1999</span>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-6">
          <Feature icon="🎥" text="5-Day Recorded Content" />
          <Feature icon="🖥️" text="3-Hour Mega Webinar" />
          <Feature icon="🎁" text="Bonuses worth ₹45,000" />
          <Feature icon="❓" text="Q&A with Vaibhav" />
          <Feature icon="💎" text="Instant Access to Foundational Module" />
          <Feature icon="📅" text="Content Access" />
          <Feature icon="⬆️" text="Content Upgrade" />
          <Feature icon="📘" text="Course Notes" />
          <Feature icon="📜" text="Certificate" />
        </div>
        <div className="mt-6 text-center">
          <button className="bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:scale-105 transition transform">
            ENROLL NOW
          </button>
        </div>
      </div>
    </div>
  );
};

const Feature = ({ icon, text }) => (
  <div className="flex items-center space-x-3">
    <span className="text-2xl">{icon}</span>
    <span className="text-gray-700 font-medium">{text}</span>
  </div>
);

export default Enroll;
