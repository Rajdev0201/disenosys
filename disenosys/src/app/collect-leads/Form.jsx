// components/LeadCaptureForm.jsx
"use client";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LeadCaptureForm = () => {
const initialFormData = {
  fullName: "",
  phone: "",
  email: "",
  linkedin: "",
  resume: null, // file input
  currentCompany: "",
  currentDesignation: "",
  currentCTC: "",
  expectedCTC: "",
  noticePeriod: "",
  noticeNegotiable: "No",
  currentLocation: "",
  willingToRelocate: "No",
  preferredLocation: "",
  experience: "",
  engagementType: "",
  urgency: "",
  message: "",
};

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };



const handleSubmit = async (e) => {
  e.preventDefault();

  const {
    fullName,
    phone,
    email,
    resume,
    engagementType,
    urgency,
  } = formData;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9]\d{9}$/;

  // Basic validation
  if (!fullName.trim()) {
    return toast.error("Please enter your full name");
  }

  if (!phone.trim() || !phoneRegex.test(phone)) {
    return toast.error("Please enter a valid 10-digit phone number");
  }

  if (!email.trim() || !emailRegex.test(email)) {
    return toast.error("Please enter a valid email address");
  }

  if (!resume) {
    return toast.error("Please upload your resume (PDF or DOCX)");
  }

  if (!engagementType) {
    return toast.error("Please select an Engagement Type");
  }

  if (!urgency) {
    return toast.error("Please select your urgency to join/switch");
  }

  // Prepare FormData for API (especially for file upload)
  const data = new FormData();
  for (const key in formData) {
    data.append(key, formData[key]);
  }


  // Call your API here
  await axios.post("http://localhost:8000/leads-post",data,{
     headers: {
          "Content-Type": "multipart/form-data",
        },
  })
    .then((res) => {
      if (res.ok) {
        toast.success("Form submitted successfully!");
        setFormData(initialFormData);
      } else {
        toast.error("Submission failed. Try again.");
      }
    })
    .catch((err) => {
      console.error(err);
      toast.error("Something went wrong");
    });
};


  return (

    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto p-6 rounded-xl shadow-inner font-poppins border mt-2 border-blue-100"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-500">
        Job Seeker / Student <span className="">Form</span>
      </h2>

      {/* Personal Information */}
      <h3 className="text-lg font-semibold mt-8 mb-4 text-gray-700">
        Personal Information
      </h3>
      <div className="grid md:grid-cols-2 gap-4">

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
          className="input-style"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          className="input-style"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          className="input-style"
        />
        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn Profile URL"
          onChange={handleChange}
          className="input-style"
        />
        <div className="flex flex-col">
        <span className="text-sm text-gray-500">Upload resume</span>
        <input
          type="file"
          name="resume"
          accept=".pdf,.doc,.docx"
          onChange={handleChange}
          className="file-input w-full"
        />
        </div>
      </div>

      {/* Job Details */}
      <h3 className="text-lg font-semibold mt-8 mb-4 text-gray-700">Job Details</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          name="currentCompany"
          placeholder="Current Company"
          onChange={handleChange}
          className="input-style"
        />
        <input
          type="text"
          name="currentDesignation"
          placeholder="Current Designation"
          onChange={handleChange}
          className="input-style"
        />
        <input
          type="number"
          name="currentCTC"
          placeholder="Current CTC (LPA)"
          onChange={handleChange}
          className="input-style"
        />
        <input
          type="number"
          name="expectedCTC"
          placeholder="Expected CTC (LPA)"
          onChange={handleChange}
          className="input-style"
        />
        <input
          type="number"
          name="noticePeriod"
          placeholder="Notice Period (in days)"
          onChange={handleChange}
          className="input-style"
        />
        <select
          name="noticeNegotiable"
          onChange={handleChange}
          className="input-style"
        >
          <option value="" className="input-style" disabled>Notice Period Negotiable?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <input
          type="text"
          name="currentLocation"
          placeholder="Current Location"
          onChange={handleChange}
          className="input-style"
        />
        <select
          name="willingToRelocate"
          onChange={handleChange}
          className="input-style"
        >
          <option value="" disabled>Willing to Relocate?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <input
          type="text"
          name="preferredLocation"
          placeholder="Preferred Location (Optional)"
          onChange={handleChange}
          className="input-style"
        />
        <input
          type="number"
          name="experience"
          placeholder="Years of Experience"
          onChange={handleChange}
          className="input-style"
        />
      </div>

      {/* Engagement Type */}
      <h3 className="text-lg font-semibold mt-8 mb-4 text-gray-700">
        Engagement Type
      </h3>
      <div className="flex flex-wrap gap-4">
        {["Job Referral Only", "Training + Job", "Guidance/Call"].map((type) => (
          <label key={type} className="flex items-center gap-2">
            <input
              type="radio"
              name="engagementType"
              value={type}
              onChange={handleChange}
            />
            {type}
          </label>
        ))}
      </div>

      {/* Additional Info */}
      <h3 className="text-lg font-semibold mt-8 mb-4 text-gray-700">
        Additional Info
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        <select
          name="urgency"
          onChange={handleChange}
          className="outline-none input-style"
        >
          <option value="" disabled>Urgency to Join/Switch</option>
          <option value="Immediate">Immediate</option>
          <option value="Within 30 Days">Within 30 Days</option>
          <option value="Just Exploring">Just Exploring</option>
        </select>
        <textarea
          name="message"
          placeholder="Any Message (Optional)"
          rows={3}
          onChange={handleChange}
          className="input-style"
        />
      </div>

      <button
        type="submit"
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>

  );
};

export default LeadCaptureForm;
