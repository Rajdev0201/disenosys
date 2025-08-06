// components/LeadCaptureForm.jsx
"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  CountrySelect,
  StateSelect,
  CitySelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const LeadCaptureForm = () => {
  const initialFormData = {
    fullName: "",
    phone: "",
    wp: "",
    email: "",
    linkedin: "",
    resume: null,
    currentCompany: "",
    currentDesignation: "",
    currentCTC: "",
    expectedCTC: "",
    noticePeriod: "",
    noticeNegotiable: "",
    currentCountry: null,
    currentState: null,
    currentCity: null,
    experience: "",
    relevant: "",
    engagementType: "",
    urgency: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [load,setLoad] = useState(false);
  const router = useRouter();
  const[confirm,setConfirm] = useState(false);


  const handleChange = (e) => {
  const { name, value, files, type } = e.target;

  if (type === "file") {
    const allowedTypes = [
      "application/pdf", // .pdf
      // "application/msword", // .doc
      // "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    ];

    const file = files[0];

    if (file && allowedTypes.includes(file.type)) {
      setFormData({ ...formData, [name]: file });
    } else {
      alert("Only PDF files are allowed.");
      setFormData({ ...formData, [name]: null }); // Optional: clear previous invalid file
    }
  } else {
    setFormData({ ...formData, [name]: value });
  }
};

  const [sameAsPhone, setSameAsPhone] = useState(false);

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      phone: value,
      wp: sameAsPhone ? value : prev.wp, // update wp if checkbox is checked
    }));
  };

  const handleWpChange = (value) => {
    if (!sameAsPhone) {
      setFormData((prev) => ({ ...prev, wp: value }));
    }
  };

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setSameAsPhone(checked);
    if (checked) {
      setFormData((prev) => ({ ...prev, wp: prev.phone }));
    } else {
      setFormData((prev) => ({ ...prev, wp: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, phone, email, resume, engagementType, urgency,currentCity,currentCountry,currentState } =
      formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(?:\+91|91)?[6-9]\d{9}$/;
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

     if (
      formData.engagementType === "Job Referral Only" &&
      !confirm
    ) {
      return toast.error("You must confirm eligibility checkbox before submitting.");
    }
      
    if (!currentCity || !currentState || !currentCountry) {
      return toast.error("Please select city and state,country");
    }
    if (!urgency) {
      return toast.error("Please select your urgency to join/switch");
    }
    setLoad(true)
    // Prepare FormData for API (especially for file upload)
    const data = new FormData();
    for (const key in formData) {
      const value = formData[key];
      // If the value is an object and not a file, stringify it
      if (value && typeof value === "object" && !(value instanceof File)) {
        data.append(key, JSON.stringify(value));
      } else {
        data.append(key, value);
      }
    }

    // Call your API here
    await axios
      .post("https://disenosys-dkhj.onrender.com/leads-post", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res) {
          setLoad(false)
          toast.success("Form submitted successfully!");
          setFormData(initialFormData);
          router.push("/applied");
        }
      })
      .catch((err) => {
        setLoad(false)
        console.error(err);
        toast.error("Something went wrong");
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto p-6 rounded-xl shadow-inner font-poppins border mt-2 border-blue-100"
    >
      <h2 className="text-lg lg:text-3xl font-bold mb-6 text-center text-blue-500">
        Application <span className="">Form</span>
      </h2>

      {/* Personal Information */}
      <h3 className="text-lg font-semibold mt-8 mb-4 text-gray-700">
        Personal Information
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="">
          <label className="text-gray-500">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            // placeholder="Full Name"
            onChange={handleChange}
            className="input-style"
          />
        </div>

        <div>
          <label className="text-gray-500">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            // placeholder="Email Address"
            onChange={handleChange}
            className="input-style"
          />
        </div>

        <div>
          <label className="text-gray-500">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <PhoneInput
            country={"in"}
            value={formData.phone}
            onChange={handlePhoneChange}
            placeholder="Enter your number"
            inputProps={{
              name: "phone",
              required: true,
              autoFocus: true,
              className:
                "w-full border border-gray-300 rounded px-12 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
            }}
          />
        </div>
        <div>
          <div className="md:flex justify-between">
            <label className="text-gray-500">
              Whatsapp Number <span className="text-red-500">*</span>
            </label>
            <div className="">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={sameAsPhone}
                  onChange={handleCheckboxChange}
                  className="form-checkbox w-4 h-4 text-blue-600"
                />
                <span className="ml-2 text-gray-600">Same as Phone Number</span>
              </label>
            </div>
          </div>
          <PhoneInput
            country={"in"}
            value={formData.wp}
            onChange={handleWpChange}
            disabled={sameAsPhone}
            inputProps={{
              name: "wp",
              required: true,
              autoFocus: true,
              className:
                "w-full border border-gray-300 rounded px-12 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
            }}
          />
        </div>

        <div>
          <label className="text-gray-500">
            LinkedIn Profile URL <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="linkedin"
            // placeholder="LinkedIn Profile URL"
            onChange={handleChange}
            className="input-style"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-500">
            Upload Resume <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name="resume"
            accept=".pdf"
            onChange={handleChange}
            className="file-input w-full input-style"
          />
        </div>
      </div>

      {/* Job Details */}
      <h3 className="text-lg font-semibold mt-8 mb-4 text-gray-700">
        Job Details
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-gray-500">
            Total Experience (in Years, Eg.:4.5){" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="experience"
            // placeholder="Years of Experience"
            onChange={handleChange}
            className="input-style"
            required
          />
        </div>
        <div>
          <label className="text-gray-500">
             Relevant Experience in Automotive Design (in Years,Eg.:4.5)
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="relevant"
            // placeholder="Years of Experience"
            onChange={handleChange}
            className="input-style"
            required
          />
        </div>
        <div>
          <label className="text-gray-500">
            Current Company<span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            name="currentCompany"
            // placeholder="Current Company"
            onChange={handleChange}
            className="input-style"
            required
          />
        </div>
        <div>
          <label className="text-gray-500">
            Current Designation <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="currentDesignation"
            // placeholder="Current Designation"
            onChange={handleChange}
            className="input-style"
            required
          />
        </div>

        <div>
          <label className="text-gray-500">
            Current CTC (Lakh Per Annum) <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            name="currentCTC"
            placeholder="Ex:3.5 or 5"
            onChange={handleChange}
            className="input-style"
            required
          />
        </div>

        <div>
          <label className="text-gray-500">
            Expected CTC (Lakh Per Annum){" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="expectedCTC"
            placeholder="Ex:4.6 or 8"
            onChange={handleChange}
            className="input-style"
            required
          />
        </div>

        <div>
          <label className="text-gray-500">
            Notice Period (in days) <span className="text-red-500">*</span>
          </label>
          <select
            name="noticePeriod"
            value={formData.noticePeriod} // assuming you're using state
            onChange={handleChange}
            className="input-style outline-none"
            required
          >
            <option value="" disabled>
              Select Notice Period
            </option>
            <option value="Immediate">Immediate</option>
            <option value="7">7 Days</option>
            <option value="15">15 Days</option>
            <option value="30">30 Days</option>
            <option value="45">45 Days</option>
            <option value="60">60 Days</option>
            <option value="90">90 Days</option>
          </select>
        </div>
        <div>
          <label className="text-gray-500">
            Notice Negotiable <span className="text-red-500">*</span>
          </label>
          <select
            name="noticeNegotiable"
            value={formData.noticeNegotiable}
            onChange={handleChange}
            className="input-style "
            required
          >
            <option value="" className="input-style" disabled>
              Select option
            </option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label className="text-gray-500">
            Current Country <span className="text-red-500">*</span>
          </label>
          {/* <input
          type="text"
          name="currentLocation"
          // placeholder="Current Location"
          onChange={handleChange}
          className="input-style"
            required
        /> */}
          <CountrySelect
            containerClassName="form-group"
            name="currentCountry"
            onChange={(value) =>
              handleChange({ target: { name: "currentCountry", value } })
            }
            placeHolder="Select Country"
          />
        </div>
        <div>
          <label className="text-gray-500">
            Current State <span className="text-red-500">*</span>
          </label>
          <StateSelect
            countryid={formData.currentCountry?.id}
            name="currentState"
            onChange={(value) =>
              handleChange({ target: { name: "currentState", value } })
            }
            placeHolder="Select State"
          />
        </div>
        <div>
          <label className="text-gray-500">
            Current City <span className="text-red-500">*</span>
          </label>
          <CitySelect
            countryid={formData.currentCountry?.id}
            stateid={formData.currentState?.id}
            name="currentCity"
            onChange={(value) =>
              handleChange({ target: { name: "currentCity", value } })
            }
            placeHolder="Select City"
          />
        </div>
      </div>

      {/* Engagement Type */}
      <h3 className="text-lg font-semibold mt-8 mb-4 text-gray-700">
        Engagement Type
      </h3>
      <div className="flex flex-wrap gap-4">
        {["Job Referral Only", "Training + Job", "Guidance/Call"].map(
          (type) => (
            <label key={type} className="flex items-center gap-2">
              <input
                type="radio"
                name="engagementType"
                value={type}
                onChange={handleChange}
                required
              />
              {type}
            </label>
          )
        )}
      </div>
           {formData.engagementType === "Job Referral Only" && (
        <div className="border p-4 rounded-md bg-gray-50 space-y-4">
          <div className="text-gray-700">
            <p className="font-semibold text-md">To be eligible for direct job referrals, you must meet the following criteria:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Minimum 5 years of experience in Automotive OEM or Tier 1 Supplier</li>
              <li>Relevant domain experience in handling the complete product development lifecycle (from RFQ to SOP)</li>
              <li>Must be able to provide valid proof of employment and project involvement</li>
            </ul>
          </div>

          <label className="flex items-start gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              name="confirm"
              checked={confirm}
              onChange={(e) => setConfirm(e.target.checked)}
              className="mt-1"
            />
            I confirm that I meet the above criteria and can provide valid documentation if required.
          </label>
           </div>
      )}
      {/* Additional Info */}
      <h3 className="text-lg font-semibold mt-8 mb-4 text-gray-700">
        Additional Info
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-gray-500">
            Urgency to Join/Switch <span className="text-red-500">*</span>
          </label>

          <select
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
            className="outline-none input-style"
            required
          >
            <option value="" disabled>
              Select option
            </option>
            <option value="Immediate">Immediate</option>
            <option value="Within 30 Days">Within 30 Days</option>
            <option value="Just Exploring">Just Exploring</option>
          </select>
        </div>
        <div>
          <label className="text-gray-500">Any Message (Optional)</label>
          <textarea
            name="message"
            // placeholder="Any Message (Optional)"
            rows={3}
            onChange={handleChange}
            className="input-style"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
       {load ? "Loading ..." : " Submit "}
      </button>
    </form>
  );
};

export default LeadCaptureForm;
