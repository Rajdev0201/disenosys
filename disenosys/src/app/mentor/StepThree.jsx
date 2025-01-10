"use client"

import React from 'react';

const StepThree = ({ formData, setFormData, prevStep, handleSubmit }) => {
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
      <h2 className="text-2xl font-semibold mb-4">Section 3: Experience Validation</h2>
      <div className='mb-4'>
                  <label className="block text-sm font-medium mb-2">
                  Select Component Name
                  </label>
                  <select
                    name="component"
                    value={formData.component}
                    onChange={(e) => setFormData({ ...formData, component: e.target.value })}
                    className="w-full rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                    required
                  >
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

     <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Years Of Experience
        </label>
        <input
          type="text"
          value={formData.exp}
          placeholder="A minimum of 3 years of experience is required"
          onChange={(e) => setFormData({ ...formData, exp: e.target.value })}
          className="w-full rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
          required
        />
      </div>

     <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Brief Introduction/Bio
        </label>
        <textarea
          type="text"
          value={formData.brief}
          placeholder="Example: Worked on designing B-Pillar trims for 3 years, focusing on Class A surface remastering, feature creation, and draft analysis."
          onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
          className="w-full rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
          required
        />
      </div>
      <div className='mb-4'>
                <label className="block text-sm font-medium mb-2">
                  Upload Resume
                </label>
                <input
                  type="file"
                  name="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setFormData({ ...formData, file: e.target.value })}
                  className="w-full rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                  required
                />
              </div>
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default StepThree;
