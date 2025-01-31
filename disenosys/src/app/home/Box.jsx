"use client"
import Image from 'next/image';
import React from 'react';
import week from "../assests/profile/week.jpg"
import cls from "../assests/profile/cls.jpg"
import job from "../assests/profile/job.jpg"
import hands from "../assests/profile/exp.jpg"
import { FaBriefcase, FaCalendarDay, FaChalkboardTeacher, FaProjectDiagram } from 'react-icons/fa';

const WhyChooseUs = () => {
  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium px-4 md:px-12 font-garet lg:px-24 text-[#0d1039] mb-8">
        WHY CHOOSE US?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        <div className="flex flex-col items-start justify-start h-full shadow-md rounded-xl shadow-inner">
          <Image
            src={cls}
            alt="100% LIVE INTERACTIVE CLASSES"
            className="rounded w-full h-48 object-cover mb-4"
          />
          <div className="px-4 flex items-center justiy-center lg:justify-start text-4xl text-[#0d1039] mb-4">
          <FaChalkboardTeacher size={40} color="#0d1039" className="icon" />
          </div>
          <h3 className="px-4 text-xl font-bold text-start text-[#0d1039] mb-2">
            100% LIVE INTERACTIVE CLASSES
          </h3>
          <p className="px-4 text-start text-gray-600">
            Engage in live sessions with experts for an immersive learning experience.
          </p>
        </div>

        <div className="flex flex-col items-start justify-start h-full shadow-md  rounded-xl shadow-inner">
          <Image
            src={job}
            alt="100% JOB ASSISTANCE"
            className="rounded w-full h-48 object-cover mb-4"
          />
          <div className="px-4 flex items-center lg:justify-start text-4xl text-[#0d1039] mb-4">
          <FaBriefcase size={40} color="#0d1039" className="icon" />
          </div>
          <h3 className="px-4 text-xl font-bold text-start text-[#0d1039] mb-2">
            100% JOB ASSISTANCE
          </h3>
          <p className="px-4 text-start text-gray-600">
            Get job placement support from our expert placement cell to kickstart your career.
          </p>
        </div>

        <div className="flex flex-col  items-start justify-start shadow-md h-full rounded-xl shadow-inner">
          <Image
            src={hands}
            alt="HANDS-ON EXPERIENCE WITH 50+ PROJECTS"
            className="rounded w-full h-48 object-cover mb-4"
          />
          <div className="px-4 flex items-center justify-start text-4xl text-[#0d1039] mb-4">
          <FaProjectDiagram size={40} color="#0d1039" className="icon" />
          </div>
          <h3 className="px-4 text-xl font-bold text-start text-[#0d1039] mb-2">
            HANDS-ON EXPERIENCE WITH 50+ PROJECTS
          </h3>
          <p className=" px-4 text-start text-gray-600">
            Work on industry projects to gain practical experience and build your portfolio.
          </p>
        </div>

        <div className="flex flex-col items-start justify-start h-full shadow-md rounded-xl shadow-inner mb-4">
          <Image
            src={week}
            alt="WEEKEND CLASSES FOR WORKING PROFESSIONALS"
            className="rounded w-full h-48 object-cover mb-4"
          />
          <div className="px-4 flex items-center justify-start text-4xl text-[#0d1039] mb-4">
          <FaCalendarDay size={40} color="#0d1039" className="icon" />
          </div>
          <h3 className="px-4 text-xl font-bold text-start text-[#0d1039] mb-2">
            WEEKEND CLASSES FOR WORKING PROFESSIONALS
          </h3>
          <p className="px-4 text-start text-gray-600">
            Flexible weekend classes to accommodate the schedules of working professionals.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
