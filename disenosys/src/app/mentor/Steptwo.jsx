"use client"

import React, { useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { MdCancel } from 'react-icons/md';

const StepTwo = ({ formData, setFormData, nextStep,prevStep}) => {
 
  const [totalHours, setTotalHours] = useState(0);
  const [totalTopics, setTotalTopics] = useState(0);
  const [error, setError] = useState("");

    const addRow = (TopicIndex) => {
        const updatedTopic = [...formData.topics];
        updatedTopic[TopicIndex].rows.push({
          topic: "",
          hours:""
        });
    
        setFormData({
          ...formData,
           topics: updatedTopic,
        });
      };
    
      const removeRow = (topicIndex, rowIndex) => {
        const updatedTopic = [...formData.topics];
        const removedRow = updatedTopic[topicIndex].rows[rowIndex];
      
        // Remove the row
        updatedTopic[topicIndex].rows.splice(rowIndex, 1);
      
        // Recalculate total hours and topics
        const updatedTotalHours = updatedTopic.reduce((total, topicGroup) => {
          return total + topicGroup.rows.reduce((groupTotal, row) => {
            return groupTotal + (parseInt(row.hours) || 0);
          }, 0);
        }, 0);
      
        const updatedTotalTopics = updatedTopic.reduce((count, topicGroup) => {
          return count + topicGroup.rows.filter(row => row.topic.trim() !== "").length;
        }, 0);
      
        // Update state
        setTotalHours(updatedTotalHours);
        setTotalTopics(updatedTotalTopics);
        setFormData({
          ...formData,
          topics: updatedTopic,
        });
      };
      
   
      const handleRowInputChange = (companyIndex, rowIndex, field, value) => {
        const updatedTopic = [...formData.topics];
        const currentRow = updatedTopic[companyIndex].rows[rowIndex];
      
        if (field === "hours" || field === "topic") {
          if (field === "hours") {
            const hoursValue = parseInt(value) || 0;
            const previousHours = parseInt(currentRow.hours) || 0;
      
            const newTotal = totalHours - previousHours + hoursValue;
      
            if (newTotal > 16) {
              setError("Total hours cannot exceed 16.");
              return;
            } else {
              setError("");
              setTotalHours(newTotal);
            }
          }
      
          if (field === "topic") {
            const totalTopics = formData.topics.reduce((count, topicGroup) => {
              return count + topicGroup.rows.filter(row => row.topic.trim() !== "").length;
            }, 0);
            setTotalTopics(totalTopics);
          }
        }
      
        // Update the specific field
        updatedTopic[companyIndex].rows[rowIndex][field] = value;
      
        // Update state
        setFormData({
          ...formData,
          topics: updatedTopic,
        });
      };
      

    const auto = [
        "Exterior Components",
        "Interior Components",
        "Lighting Systems",
        "Chassis and Suspension Components",
        "Powertrain Components",
        "Electrical and Electronics",
        "Body-in-White (BIW)",
        "Plastics and Trims",
        "HVAC and Thermal Systems",
        "Safety Systems",
        "Electric Vehicle (EV) Specific Components"
    ]
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-[#182073] font-poppins">Section 2: Course Creation Instructions</h2>

      <p className='text-sm text-gray-500'>
      Please create a course focusing on a specific automotive component or system, ensuring the total duration is exactly <b>16 hours.</b> Break down the course into detailed topics, specifying the name of each topic and the duration (in hours) it will take to cover. Each topic must be relevant to the chosen component and add value to the learner&apos;s knowledge and skills.
      </p>
      <h3 className='text-md mt-2 font-semibold mb-4 text-[#182073] font-poppins'>Course Name: Design of B-Pillar Trims</h3>

      <ul className='text-sm text-gray-600 mx-6 -mt-3' >
        <li className='list-disc'>
        <b className='text-gray-800'>Topic 1</b>: B-Pillar Trims Introduction, Purpose, Parameters - 1 hour
        </li>
        <li className='list-disc'>
        <b className='text-gray-800'>Topic 2</b>: Close Volume, Class A, B, and C Creation - 7 hours
        </li>
        <li className='list-disc'>
        <b className='text-gray-800'>Topic 3</b>: Master Section Creation - 2 hours
        </li>
        <li className='list-disc'>
        <b className='text-gray-800'>Topic 4</b>: Draft Analysis - 1 hour
        </li>
        <li className='list-disc'>
        <b className='text-gray-800'>Topic 5</b>: Mounting Features Introduction - 1 hour
        </li>
        <li className='list-disc'>
        <b className='text-gray-800'>Topic 6</b>: Mounting Features Creation - 2 hours
        </li>
        <li className='list-disc'>
        <b className='text-gray-800'>Topic 7</b>: Assembly and 2D Drawings - 1 hour
        </li>
        <li className='list-disc'>
        <b className='text-gray-800'>Topic 8</b>: Parting Line - 1 hour
        </li>
      </ul>

      <h3 className='text-md mt-2 font-semibold mb-4 text-[#182073] font-poppins'>Important Notes:</h3>
     
      <ul className='text-sm text-gray-600 mx-6 -mt-3'>
        <li className='list-decimal'>
        Ensure the total of all topic durations equals 16 hours.
        </li>
        <li className='list-decimal'>
        Only propose courses in areas where you have at least <b>3+ years of project experience.</b> 
        </li>
        <li className='list-decimal'>Provide practical and theoretical content to give students industry-relevant skills.</li>
        <li className='list-decimal'> Avoid general or non-specific topics. Focus on automotive design intricacies.</li>
      </ul>
       <div className='text-red-500 text-sm mt-2 bg-gray-200 p-1 rounded-md shadow-inner'>Use the form below to add your course details, breakdown, and relevant experience.</div>
      <div className="mb-4 mt-5">
        <label className="block text-sm font-medium mb-2">Course Name</label>
        <input
          value={formData.course}
          onChange={(e) => setFormData({ ...formData, course: e.target.value })}
          placeholder="Example: Design of Dashboard"
          className="w-full rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
          required
        />
      </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                  Select Automotive Component
                  </label>
                  <select
              
                    value={formData.automotive}
                    onChange={(e) => setFormData({ ...formData, automotive: e.target.value })}
                    className="w-full rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                    required
                  >
                     <option value="">-None-</option>
                    {auto?.map((lpa, index) => (
                      <option
                      key={index}
                      value={lpa}
                      aria-labelledby="dropdownHoverButton"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      {lpa}
                    </option>
                  ))}
                  </select>
                </div>
      
                <div className="mb-4 mt-2">
  <label className="block text-sm font-medium mb-2">Total Duration (hours)</label>
  <input
    type="number"
    value={formData.totalHour}
    placeholder="Number Field, Max: 16"
    onChange={(e) => {
      const value = e.target.value;
      setFormData({ ...formData, totalHour: value });
    }}
    className={`w-full rounded-lg p-3 text-gray-700 text-base border-2 ${
      formData.totalHour > 16 ? "border-red-500" : "border-blue-500"
    } focus:border-none outline-none focus:outline-purple-500`}
    required
  />
  {formData.totalHour > 16 && (
    <p className="text-red-500 text-sm mt-1">Total hours cannot exceed 16.</p>
  )}
</div>
         

<div>
      <label className="block text-sm font-medium mb-2">Add Topics</label>
      {formData?.topics?.map((company, companyIndex) => (
        <div key={companyIndex} className="border-2 p-3 rounded-lg shadow-sm mb-6">
          {company.rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-2 mt-2"
            >
              <input
                type="text"
                placeholder="Topic Name"
                value={row.topic}
                onChange={(e) =>
                  handleRowInputChange(companyIndex, rowIndex, "topic", e.target.value)
                }
                className="w-full rounded-lg px-3 py-1 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                required
              />

              <input
                type="number"
                placeholder="Topic hours"
                value={row.hours}
                onChange={(e) =>
                  handleRowInputChange(companyIndex, rowIndex, "hours", e.target.value)
                }
                className="w-full rounded-lg px-3 py-1 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                required
              />

              <div className="flex justify-start items-center">
                <button
                  type="button"
                  onClick={() => addRow(companyIndex)}
                  className="text-blue-600"
                >
                  <IoIosAddCircleOutline className="w-8 h-8 text-blue-800 ring-2 ring-blue-100 rounded-full" />
                </button>
                <div className="flex justify-start items-center mx-6">
                  <button
                    type="button"
                    onClick={() => {
                      if (rowIndex !== 0) {
                        removeRow(companyIndex, rowIndex);
                      }
                    }}
                    className={`${
                      rowIndex === 0
                        ? "cursor-not-allowed opacity-50"
                        : "text-red-600"
                    }`}
                    disabled={rowIndex === 0}
                  >
                    <MdCancel
                      className={`w-8 h-8 ${
                        rowIndex === 0
                          ? "text-gray-400 bg-gray-200"
                          : "text-white bg-red-500 ring-2 ring-blue-100"
                      } rounded-full`}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
             {error && <p className="text-red-600 mt-2">{error}</p>}
           <div className='flex gap-2'>
          <p className="mt-4 bg-gray-500 rounded-md shadow-inner p-1 text-sm text-white lg:font-bold">Total Topics: {totalTopics}</p>
          <p className="mt-4 bg-gray-500 rounded-md shadow-inner p-1 text-sm text-white lg:font-bold">Total Hours: {totalHours}</p>
          </div>
        </div>
      ))}
    </div>

    
       <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
         Back
        </button>
        <button
          onClick={nextStep} 
        className="-mt-0 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepTwo;
