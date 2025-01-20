"use client";

import Image from 'next/image';
import React from 'react';
import { FaTag } from 'react-icons/fa'; 
import mentor from '../assests/profile/mentor.png';
import { FaSquarePhone } from 'react-icons/fa6';

const CardComponent = ({ name, designation, institute, tags, contact }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white shadow-inner rounded-lg p-6 m-4 w-80 hover:shadow-2xl transition-shadow duration-300 border-b-4 border-b-blue-500">
      {/* Profile Image */}
      <div className="bg-blue-300 w-full h-24 rounded-t-lg flex items-center justify-center text-white font-bold text-xl">
        <Image
          src={mentor}
          className="object-cover w-24 h-24 rounded-full shadow-inner ring-2 ring-white"
          alt="Mentor Profile"
        />
      </div>

      {/* Mentor Info */}
      <div className="flex flex-col items-center justify-center space-y-1 w-full mt-4">
        <p className="bg-clip-text text-transparent bg-gradient-to-l from-[#005BC4] to-[#27272A] text-lg font-bold">
          {name}
        </p>
        <p className="text-gray-600 font-semibold text-sm">{designation}</p>
        <p className="text-gray-600 font-semibold text-sm">{institute}</p>
        {/* Contact Info */}
      <div className="flex items-center mt-4 space-x-2">
      <FaSquarePhone className="text-blue-500 w-4 h-4" />
        <span className="text-gray-700 font-medium text-sm">{contact}</span>
      </div>
      </div>

      

      {/* Tags Section */}
      <div className="flex flex-col gap-1 justify-center items-start w-[280px] bg-white dark:bg-transparent px-4 py-4 shadow-xl rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <FaTag className="text-blue-500" />
          <p className="font-semibold text-gray-600">Tags</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm bg-gray-200 rounded-full font-semibold text-gray-600"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
