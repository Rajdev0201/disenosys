"use client";
import React from "react";
import "../home/Home.css"
import Link from "next/link";
const Scholarship = () => {
  return (
    <div className="">
      <div className="bg-sch p-64 mt-16 lg:mt-32"></div>
      <div className="flex flex-col px-2 lg:px-24 space-y-6">
        <h1 className="lg:text-4xl text-xl font-bold font-garet text-center lg:text-start mt-8 text-[#0d1039]">
          Disenosys Scholarship Program
        </h1>
        <p className="font-garet font-medium text-sm lg:text-xl text-[#0d1039]">
          At Disenosys, we are committed to fostering the next generation of
          engineers, designers, and technology experts. Our Scholarship Program
          aims to support students by offering financial assistance and skill
          development opportunities based on their performance in our
          scholarship exam.
        </p>
      </div>
      <div className="bg-[#0d1039] flex flex-col justify-center items-start px-2 lg:px-24 lg:py-12 py-2 space-y-6 mt-12">
        <h1 className="lg:text-3xl text-xl font-semibold font-garet text-center lg:text-start text-white">
          Who Can Apply?
        </h1>
        <h4 className="lg:text-xl text-md font-medium font-garet text-start mt-8 text-white">
          This scholarship is open to:
        </h4>
        <li className="lg:text-lg text-md font-medium font-garet text-start mt-8 text-white">
          {" "}
          Students pursuing Mechanical, Automobile, Electrical, or Industrial
          Design fields.
        </li>
        <li className="lg:text-lg text-md font-medium font-garet text-start mt-8 text-white">
          Candidates passionate about innovation, product development, and
          technology.
        </li>
        <li className="lg:text-lg text-md font-medium font-garet text-start mt-8 text-white">
          Applicants with a strong academic background or exceptional project
          work.
        </li>
      </div>

      <div className="flex flex-col justify-center items-start px-2 lg:px-24 lg:py-12 py-2 space-y-6 mt-12">
        <h1 className="lg:text-3xl text-xl font-semibold font-garet text-center lg:text-start text-[#0d1039]">
          Scholarship Benefits
        </h1>
        <li className="lg:text-lg text-md font-medium font-garet text-start mt-8 text-[#0d1039]">
          {" "}
          Tuition Fee Assistance - Financial aid based on exam performance.
        </li>
        <li className="lg:text-lg text-md font-medium font-garet text-start mt-8 text-[#0d1039]">
          Exclusive Learning Resources - Access to specialized courses,
          workshops, and mentorship.
        </li>
        <li className="lg:text-lg text-md font-medium font-garet text-start mt-8 text-[#0d1039]">
          Internship Opportunities - Gain real-world experience with Disenosys
          experts.
        </li>
      </div>

      <h1 className="lg:text-3xl text-lg font-semibold font-garet text-center mb-2 text-[#0d1039] mt-20">
        Scholarship Eligibility & Percentage Table
      </h1>
      <div className="flex justify-center mx-auto container font-garet mb-6">
        <table className="lg:w-3/4 text-left ">
          <thead className="bg-[#6497e6]/80 border-gray-200 shadow-inner">
            <tr>
              <th className="border border-gray-200 px-4 py-2 text-white font-medium text-2xl">
                Exam Score
              </th>
              <th className="border border-gray-200  px-4 py-2 text-white font-medium text-2xl">
                Scholarship Percentage
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-200  px-4 py-2">
                90% and above
              </td>
              <td className="border border-gray-200 px-4 py-2">
                100% Scholarship(Full Coverage)
              </td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">80% - 89%</td>
              <td className="border border-gray-200  px-4 py-2">
                75% Scholarship
              </td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">70% - 79%</td>
              <td className="border border-gray-200  px-4 py-2">
                50% Scholarship
              </td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">60% - 69%</td>
              <td className="border border-gray-200  px-4 py-2">
                25% Scholarship
              </td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Below 60%</td>
              <td className="border border-gray-200  px-4 py-2">
                Eligible for discounts on training program
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-[#0d1039] flex flex-col justify-center items-start px-2 lg:px-24 lg:py-12 py-2 space-y-6 mt-12">
        <h1 className="lg:text-3xl text-md font-semibold font-garet text-start text-white">
          How to Apply?
        </h1>
        <li className="lg:text-lg text-md font-medium font-garet text-start mt-8 text-white">
          Register for the Disenosys Scholarship Exam.
        </li>
        <li className="lg:text-lg text-md font-medium font-garet text-start mt-8 text-white">
          Take the online/offline test on the scheduled date.
        </li>
        <li className="lg:text-lg text-md font-medium font-garet text-start mt-8 text-white">
          Score high to avail maximum benefits.
        </li>
        <li className="lg:text-lg text-md font-medium font-garet text-start mt-8 text-white">
          Shortlisted candidates will undergo a final verification process.
        </li>
      </div>

      <div className="flex flex-col justify-center items-start px-2 lg:px-24 lg:py-12 py-2 space-y-6 mt-12">
        <h1 className="lg:text-3xl text-md font-semibold font-garet text-start text-[#0d1039]">
          Important Dates
        </h1>
        <li className="lg:text-lg text-md font-medium font-garet text-start mt-8 text-[#0d1039]">
          Application Opens: [Start Date]
        </li>
        <li className="lg:text-lg text-md font-medium font-garet text-start mt-8 text-[#0d1039]">
          Exam Date: [Exam Date]
        </li>
        <li className="lg:text-lg text-md font-medium font-garet text-start mt-8 text-[#0d1039]">
          Results Announcement: [Result Date]
        </li>
      </div>
      <div className="flex flex-col justify-center items-start px-2 lg:px-24 lg:py-12 py-2">
        <Link href="/scholarship-form" className="px-5 py-3 text-white bg-[#0d1039] rounded-md shadow-inner mb-5">
          Apply Now
        </Link>
        <h4 className="text-md text-[#0d1039] font-garet">
          For any queries, contact us at{" "}
          <span className="text-blue-600">support@disenosys.com</span>
        </h4>
      </div>
    </div>
  );
};

export default Scholarship;
