"use client";

import React, { useState } from "react";
import StepOne from "./Stepone";
import StepTwo from "./Steptwo";
import StepThree from "./StepThree"; 

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    topics: [
        {
          rows: [{   topic: "",
            hours:""
        }],
        },
      ],
  });

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = () => {
    console.log("Form Submitted:", formData);
    alert("Form Submitted Successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto mt-4 mb-10 border rounded-lg shadow-lg bg-white">
      {/* Step Indicator */}
      <div className="flex items-center justify-between px-8 py-6">

  {/* Step 1 */}
  <div className="flex items-center w-full">
    <div
      className={`w-12 h-12 flex items-center justify-center rounded-full text-lg font-medium ${
        currentStep >= 1 ? "bg-[#182073] text-white" : "bg-gray-300 text-gray-500"
      }`}
    >
      1
    </div>
    <div
      className={`h-1 w-[240px] ${
        currentStep >= 2 ? "bg-blue-500" : "bg-gray-300"
      }`}
    ></div>
  </div>

  {/* Step 2 */}
  <div className="flex items-center w-full">
    <div
      className={`w-12 h-12 flex items-center justify-center rounded-full text-lg font-medium ${
        currentStep >= 2 ? "bg-[#182073] text-white" : "bg-gray-300 text-gray-500"
      }`}
    >
      2
    </div>
    <div
      className={`h-1 w-[240px] ${
        currentStep >= 3 ? "bg-blue-500" : "bg-gray-300"
      }`}
    ></div>
  </div>

  {/* Step 3 */}
  <div className="flex items-center">
    <div
      className={`w-12 h-12 flex items-center justify-center rounded-full text-lg font-medium ${
        currentStep === 3 ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-500"
      }`}
    >
      3
    </div>
  </div>
</div>


      {/* Form Content */}
      <div className="p-6">
        {currentStep === 1 && (
          <StepOne formData={formData} setFormData={setFormData} nextStep={nextStep} />
        )}
        {currentStep === 2 && (
          <StepTwo
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {currentStep === 3 && (
          <StepThree
            formData={formData}
            setFormData={setFormData}
            prevStep={prevStep}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
