"use client"
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const MentorProfile = () => {
    const dispatch = useDispatch();
    const Data = useSelector((state) => state.mentor);
    const data = Data?.data;
    const search = useSearchParams();
    const courseId = search.get("profileId");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-100 p-6">

        {data?.filter((data) => data._id === courseId)?.map((data,i) => (
      <div key={i} className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Header Section */}
        <div className="flex items-center border-b pb-4 mb-6">
          <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-2xl">
            {data.name?.charAt(0).toUpperCase()}
          </div>
          <div className="ml-4">
            <h1 className="text-3xl font-bold text-gray-800">{data.name}</h1>
            <p className="text-gray-600 text-sm">Email: {data.email}</p>
            <p className="text-gray-600 text-sm">Phone: {data.phone}</p>
            <p className="text-gray-600 text-sm">Total Experience: {data.exp}</p>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-500">About Me</h2>
          <p className="text-gray-700 mt-2">{data.bio}</p>
          {/* <p className="text-gray-700 mt-2">{data.brief}</p> */}
        </div>

        {/* Skills Section */}
        {Object.keys(data)
  .filter(key => /^a\d+$/.test(key)) // Match keys like a1, a2, ..., a11
  .map(key => data[key]) // Get the array values
  .flat() // Combine all arrays into one
  .filter(skill => typeof skill === "string" && skill.trim() !== "") // Ensure valid, non-empty strings
  .length > 0 && (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-blue-500">Skills</h2>
      <ul className="flex flex-wrap gap-2 mt-2">
        {Object.keys(data)
          .filter(key => /^a\d+$/.test(key)) // Match keys like a1, a2, ..., a11
          .map(key => data[key]) // Get the array values
          .flat() // Combine all arrays into one
          .filter(skill => typeof skill === "string" && skill.trim() !== "") // Ensure valid, non-empty strings
          .map((skill, index) => (
            <li
              key={index}
              className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm"
            >
              {skill}
            </li>
          ))}
      </ul>
    </div>
  )}


<div className="overflow-x-auto">
  <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg border-collapse">
    <thead className="bg-blue-500 text-white">
      <tr className="divide-x divide-white">
        <th className="text-left px-6 py-3 text-sm font-medium">Field</th>
        <th className="text-left px-6 py-3 text-sm font-medium">Details</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-300">
      <tr>
        <td className="px-6 py-4 text-sm font-medium text-gray-800">Course Name</td>
        <td className="px-6 py-4 text-sm text-gray-600">{data?.course}</td>
      </tr>
      <tr>
        <td className="px-6 py-4 text-sm font-medium text-gray-800">Total Hours</td>
        <td className="px-6 py-4 text-sm text-gray-600">{data?.totalHour} hours</td>
      </tr>
      <tr>
        <td className="px-6 py-4 text-sm font-medium text-gray-800">Commodity</td>
        <td className="px-6 py-4 text-sm text-gray-600">{data?.automotive}</td>
      </tr>
    
      <tr>
        <td className="px-6 py-4 text-sm font-medium text-gray-800">Commodity Experience</td>
        <td className="px-6 py-4 text-sm text-gray-600">{data?.yearexp} years</td>
      </tr>
     
      <tr>
        <td className="px-6 py-4 text-sm font-medium text-gray-800">Commodity Description</td>
        <td className="px-6 py-4 text-sm text-gray-600">{data?.brief}</td>
      </tr>
    </tbody>
  </table>
</div>


        {/* Topics Section */}
        {data.topics && data.topics?.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-blue-500">Topics</h2>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              {data?.topics.map((topic, index) => (
                topic?.rows.map((row,index) => (
                  <li key={index}>{row.topic} - {row.hours} hours</li>
                ))
              ))}
            </ul>
          </div>
        )}

        {/* Additional Links */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-blue-500">Additional Information</h2>
          <p className="mt-2 text-blue-600">
            <a href={data?.link} target="_blank" rel="noopener noreferrer" className="underline">
              LinkedIn Profile
            </a>
          </p>
          
          <div className="flex items-center space-x-4 ">
  
        <button
          className="mt-2 text-white bg-[#182073] px-2 py-1 flex items-center gap-2 rounded-md shadow-inner"
          onClick={openModal}
        >
          View Resume <FaEye className="text-white w-4 h-4"/>
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
              onClick={closeModal}
            >
              Close
            </button>

            {/* Resume Content */}
            <div className="w-11/12 h-5/6 flex justify-center items-center mt-6">
              {data?.filePath.endsWith(".pdf") ? (
                <iframe
                  src={data?.filePath}
                  className="w-full h-full"
                  title="Resume Viewer"
                  frameBorder="0"
                ></iframe>
              ) : (
                <Image
                  src={data?.filePath}
                  alt="Resume"
                  className="object-contain max-h-full max-w-full"
                  width={800}
                  height={800}
                />
              )}
            </div>
          </div>
        </div>
      )}
   
        </div>
      </div>
             ))}
    </div>
  );
};

export default MentorProfile;
