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
      <h2 className="text-2xl font-semibold mb-4 text-[#182073] font-poppins">Section 3: Experience Validation</h2>
      
      <p className='text-sm text-gray-500'>
      Provide detailed information about your project experience related to the automotive component or system you are proposing a course for. This section ensures that only mentors with sufficient expertise and hands-on experience can create courses, maintaining the quality of our training programs.
       </p>
      <h3 className='text-md mt-2 font-semibold mb-4 text-[#182073] font-poppins'>What to Include:</h3>
     
      <ul className='text-sm text-gray-600 mx-6 -mt-3'>
        <li className='list-decimal'>
        <b>Component Name:</b> Specify the automotive component or system (e.g., Dashboard, B-Pillar, Front Light).
        </li>
        <li className='list-decimal'>
        <b>Years of Experience:</b> Indicate how many years you have worked on this component. A minimum of <b>3 years</b> of experience is required for each proposed course.  
        </li>
        <li className='list-decimal'><b>Project Description:</b> Provide a brief but detailed overview of the projects you&apos;ve worked on involving this component. Mention key tasks, deliverables, and technical challenges handled (e.g., Class A surface remastering, mounting features, GD&T application).</li>
        <li className='list-decimal'><b>Supporting Documents:</b> Upload documents (if available) like your resume, portfolio, certifications, or project references to validate your expertise.</li>
      </ul>
        
      <h3 className='text-md mt-2 font-semibold mb-4 text-[#182073] font-poppins'>Example</h3>

<ul className='text-sm text-gray-600 mx-6 -mt-3' >
  <li className='list-disc'>
  <b className='text-gray-800'>Component Name:</b> B-Pillar Trims
  </li>
  <li className='list-disc'>
  <b className='text-gray-800'>Years of Experience:</b> 4 years
  </li>
  <li className='list-disc'>
  <b className='text-gray-800'>Project Description:</b> Worked on Class A to B conversion for B-Pillar trims, including close volume creation, master section design, draft analysis, and mounting feature development. Delivered final assembly drawings and performed quality checks for manufacturability.
  </li>
</ul>
 
<h3 className='text-md mt-2 font-semibold mb-4 text-[#182073] font-poppins'>Important Notes</h3>

<ul className='text-sm text-gray-600 mx-6 -mt-3 mb-3' >
  <li className='list-disc'>
 Ensure the component expertise aligns with the proposed course.
  </li>
  <li className='list-disc'>
   Be concise but comprehensive in describing your experience.
  </li>
  <li className='list-disc'>
  Uploading supporting documents is optional but highly recommended.
  </li>
</ul>



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
          value={formData.yearexp}
          placeholder="A minimum of 3 years of experience is required"
          onChange={(e) => setFormData({ ...formData, yearexp: e.target.value })}
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
          className="px-6 py-2 bg-[#182073] text-white rounded-md hover:bg-blue-400"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default StepThree;
