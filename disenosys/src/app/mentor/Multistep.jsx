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
    phone: "",
    link:"",
    exp:"",
    bio:"",
    a1:"",
    a2:"",
    a3:"",
    a4:"",
    a5:"",
    a6:"",
    a7:"",
    a8:"",
    a9:"",
    a10:"",
    a11:"",
    course:"",
    automotive:"",
    totalHour:"",
    topics: [
        {
          rows: [{   topic: "",
            hours:""
        }],
        },
      ],
      component:"",
      yearexp:'',
      brief:'',
      file: null,
  });

  const nextStep = () => {

    setCurrentStep((prev) => prev + 1);
  }
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = () => {
    const {
      name,
      email,
      phone,
      link,
      exp,
      bio,
      course,
      automotive,
      totalHour,
      topics,
      component,
      yearexp,
      brief,
      file,
    } = formData;
  
    // Validation checks
    if (!name.trim()) {
      alert("Error: Name is required.");
      return;
    }
  
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      alert("Error: Please enter a valid email address.");
      return;
    }
  
    if (!phone.trim() || !/^\d{10}$/.test(phone)) {
      alert("Error: Please enter a valid 10-digit phone number.");
      return;
    }
  
    if (!link.trim()) {
      alert("Error: Link is required.");
      return;
    }
  
    if (!exp.trim()) {
      alert("Error: Experience is required.");
      return;
    }
  
    if (!bio.trim()) {
      alert("Error: Bio is required.");
      return;
    }
  
    if (!course.trim()) {
      alert("Error: Course is required.");
      return;
    }
  
    if (!automotive.trim()) {
      alert("Error: Automotive field is required.");
      return;
    }
  
    if (!totalHour.trim() || parseInt(totalHour) > 16) {
      alert("Error: Total hours are required and cannot exceed 16.");
      return;
    }
  
    if (!topics[0].rows.every((row) => row.topic.trim() && row.hours.trim())) {
      alert("Error: All topics and hours must be filled.");
      return;
    }
  
    if (!component.trim()) {
      alert("Error: Component field is required.");
      return;
    }
  
    if (!yearexp.trim()) {
      alert("Error: Year of experience is required.");
      return;
    }
  
    if (!brief.trim()) {
      alert("Error: Brief is required.");
      return;
    }
  
    if (!file) {
      alert("Error: Please upload a file.");
      return;
    }
  
    // If all validations pass
    console.log("Form Submitted:", formData);
    alert("Form Submitted Successfully!");
  };
  

  return (
    <div className="lg:max-w-2xl mx-auto lg:mt-3 lg:mb-10 border rounded-lg shadow-lg bg-white">
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
      className={`h-1 w-[50px] lg:w-[240px] ${
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
      className={`h-1 w-[50px] lg:w-[240px] ${
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
