"use client";
import React, { useState } from "react";
import "../home/Home.css";
import Image from "next/image";
import d from "../assests/brand-1.png";
import { TbHandClick } from "react-icons/tb";
import axios from "axios";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import * as pdfjsLib from "pdfjs-dist/webpack";

const CareerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    experience: "",
    employee: "",
    current: "",
    expected: "",
    notice: "Immediate",
    city: "",
    relocate: "",
    location: "",
    companies: [
      {
        companyName: "",
        from: "",
        to: "",
        rows: [{ industry: "", domain: "", software: "", months: "" }],
      },
    ],
    file: null,
  });

  const [error, setError] = useState(null);
  const [resumeData, setResumeData] = useState(null);

  const [skills, setSkills] = useState([]);
  const importantCities = [
    "Delhi",
    "Mumbai",
    "Bengaluru",
    "Hyderabad",
    "Kolkata",
    "Ahmedabad",
    "Pune",
    "Jaipur",
    "Surat",
    "Chandigarh",
    "Lucknow",
    "Indore",
    "Coimbatore",
    "Vadodara",
    "Nagpur",
    "Madurai",
    "Visakhapatnam",
    "Kanpur",
    "Patna",
    "Agra",
    "Vijayawada",
    "Bhopal",
    "Gurugram",
    "Noida",
    "Rajkot",
    "Udaipur",
    "Aurangabad",
    "Jammu",
    "Guwahati",
    "Bhubaneswar",
    "Thane",
    "Faridabad",
    "Nashik",
    "Kolhapur",
    "Tirunelveli",
    "Dehradun",
    "Shimla",
    "Imphal",
    "Itanagar",
    "Gangtok",
    "Port Blair",
    "Dibrugarh",
    "Kochi",
    "Vellore",
    "Mangalore",
    "Rajahmundry",
    "Jamshedpur",
    "Bareilly",
    "Patiala",
    "Haridwar",
    "Chandrapur",
    "Navi Mumbai",
    "Raipur",
    "Ranchi",
    "Gwalior",
    "Agartala",
    "Varanasi",
    "Bikaner",
    "Jammu",
    "Aligarh",
    "Ajmer",
    "Bhubaneshwar",
    "Haldwani",
    "Dhanbad",
    "Srinagar",
    "Shimoga",
    "Kottayam",
    "Thiruvananthapuram",
    "Tiruchirappalli",
    "Chandrapur",
    "Jodhpur",
    "Kochi",
    "Patiala",
    "Nanded",
    "Sonipat",
    "Nellore",
    "Chennai",
    "Bhubaneswar",
    "Ludhiana",
    "Ambala",
    "Kolkata",
    "Udaipur",
    "Navi Mumbai",
    "Bareilly",
    "Rajkot",
    "Panaji",
    "Kozhikode",
    "Karnal",
    "Meerut",
    "Hosur",
    "Vijayawada",
    "Mysore",
    "Rishikesh",
    "Kollam",
    "Thane",
    "Siliguri",
    "Jalgaon",
    "Jalandhar",
    "Bhopal",
    "Kurnool",
    "Nanded",
  ];
  const sortedCities = importantCities.sort();

  // const [skillInput, setSkillInput] = useState("");
  const [load, setLoad] = useState(false);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // const handleSkillChange = (e) => {
  //   setSkillInput(e.target.value);
  // };

  // const handleSkillAdd = (e) => {
  //   e.preventDefault();
  //   if (skillInput && !skills.includes(skillInput.trim())) {
  //     setSkills([...skills, skillInput.trim()]);
  //     setSkillInput("");
  //   }
  // };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileType = file.type;
    if (fileType === "application/pdf") {
      parsePdf(file);
      setFormData((prev) => ({ ...prev, file }));
    } else {
      setError("Unsupported file type. Please upload a PDF file.");
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const parsePdf = async (file) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const typedArray = new Uint8Array(reader.result);
      try {
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        let extractedText = "";

        for (let i = 0; i < pdf.numPages; i++) {
          const page = await pdf.getPage(i + 1);
          const textContent = await page.getTextContent();
          extractedText += textContent.items.map((item) => item.str).join(" ");
        }

        extractDetails(extractedText);
      } catch (err) {
        console.error("Error parsing PDF:", err);
        setError("Failed to parse PDF file.");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const extractDetails = (text) => {
    const name =
      text.match(/(?:Name|Full Name)[\s:]*([^\n]+)/i)?.[1]?.trim() || "";
    const email =
      text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)?.[0] ||
      "N/A";
    const phone =
      text.match(
        /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/
      )?.[0] || "N/A";

    setResumeData({ name, email, phone });
    setFormData((prev) => ({
      ...prev,
      name,
      email,
      phone,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append("dob", formData.dob);
    form.append("gender", formData.gender);
    form.append("experience", formData.experience);
    form.append("employee", formData.employee);
    form.append("current", formData.current);
    form.append("expected", formData.expected);
    form.append("notice", formData.notice);
    form.append("city", formData.city);
    form.append("relocate", formData.relocate);
    form.append("location", formData.location);
    // form.append("skills", skills.join(", "));
    form.append("file", formData.file);
    if (Array.isArray(formData.companies)) {
      form.append("companies", JSON.stringify(formData.companies));
    }

    try {
      await axios.post("https://disenosys-dkhj.onrender.com/career", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting career:", error);
      alert("An error occurred. Please try again later.");
    }
    setLoad(false);
  };

  const calculateINR = (lpa) => {
    const conversionRate = 100000;
    if (lpa !== "-None-" && lpa !== "Not Applicable") {
      return parseInt(lpa) * conversionRate;
    }
    return 0;
  };

  const addRow = (companyIndex) => {
    const updatedCompanies = [...formData.companies];
    updatedCompanies[companyIndex].rows.push({
      industry: "",
      domain: "",
      software: "",
      months: "",
    });

    setFormData({
      ...formData,
      companies: updatedCompanies,
    });
  };

  const removeRow = (companyIndex, rowIndex) => {
    const updatedCompanies = [...formData.companies];
    updatedCompanies[companyIndex].rows.splice(rowIndex, 1);

    setFormData({
      ...formData,
      companies: updatedCompanies,
    });
  };

  const addCompany = () => {
    const newCompany = {
      companyName: "",
      from: "",
      to: "",
      rows: [{ industry: "", domain: "", software: "", months: "" }],
    };
    setFormData({
      ...formData,
      companies: [...formData.companies, newCompany],
    });
  };

  const handleInputChange = (companyIndex, field, value) => {
    const updatedCompanies = [...formData.companies];
    updatedCompanies[companyIndex][field] = value;

    setFormData({
      ...formData,
      companies: updatedCompanies,
    });
  };

  const handleRowInputChange = (companyIndex, rowIndex, field, value) => {
    const updatedCompanies = [...formData.companies];
    updatedCompanies[companyIndex].rows[rowIndex][field] = value;

    setFormData({
      ...formData,
      companies: updatedCompanies,
    });
  };

  return (
    <div className="bg-[182073] font-poopins">
      <div className="career top-0 p-44">
        <span className="text-center font-bold text-4xl font-poopins text-white flex justify-center">
          Job Application
        </span>
      </div>
      <div className="flex flex-col lg:flex-row gap-12 px-4 sm:px-6 lg:px-24 py-6 bg-gray-50 h-full">
        {/* Sidebar */}
        <div className="lg:w-1/4 w-full order-1 lg:order-1 -mt-28">
          <div className="bg-white shadow-lg rounded-2xl">
            <div className="flex flex-col text-center justify-center items-center p-6">
              <Image
                src={d}
                alt="Profile"
                className="object-cover w-32 h-32 ring-2 ring-blue-700 rounded-full"
              />
              <h1 className="font-bold font-poppins text-xl mt-3">
                Automotive Design
              </h1>
              <h4 className="font-medium text-gray-500 text-md">Company</h4>
            </div>
            <p className="text-center px-2 text-sm leading-relaxed text-gray-600">
              Automotive design plays a crucial role in shaping the future of
              the industry. It blends creativity with engineering to create
              innovative vehicles.
            </p>
          </div>
        </div>

        <div className="lg:w-3/4 w-full order-2 lg:order-2 -mt-28">
          <div className="bg-white p-8 shadow-lg rounded-2xl">
            <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
              <h1 className="text-sm lg:text-2xl font-semibold text-gray-800">
                Welcome Design Engineer!
              </h1>
              <button className="bg-purple-100  flex items-center gap-2 text-purple-800 rounded-2xl px-6 py-2 font-bold text-lg hover:bg-purple-200">
                Apply Today <TbHandClick className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2 text-sm">
                  Upload Resume
                </label>
                <input
                  type="file"
                  name="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="w-full rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2 text-sm">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full  rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2 text-sm">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Enter your Email"
                  onChange={handleChange}
                  className="w-full rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2 text-sm">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  placeholder="Enter your Mobile"
                  onChange={handleChange}
                  className="w-full rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2 text-sm">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2 text-sm">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                  required
                >
                  <option value="">-None-</option>
                  <option
                    value="male"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    Male
                  </option>
                  <option
                    value="female"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md mt-1"
                  >
                    Female
                  </option>
                  <option
                    value="other"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md mt-1"
                  >
                    Other
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2 text-sm">
                  Experience
                </label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full  rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                  required
                >
                  <option value="">Total Experience</option>
                  <option
                    value="fresher"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    Fresher
                  </option>
                  <option
                    value="0-1"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    0-1 Years
                  </option>
                  <option
                    value="1-2"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    1-2 Years
                  </option>
                  <option
                    value="2-3"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    2-3 Years
                  </option>
                  <option
                    value="3-4"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    3-4 Years
                  </option>
                  <option
                    value="4-5"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    4-5 Years
                  </option>
                  <option
                    value="5-6"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    5-6 Years
                  </option>
                  <option
                    value="6-7"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    6-7 Years
                  </option>
                  <option
                    value="7-8"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    7-8 Years
                  </option>
                  <option
                    value="8-9"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    8-9 Years
                  </option>
                  <option
                    value="9-10"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    9-10 Years
                  </option>
                  <option
                    value="10+"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    10+ Years
                  </option>
                  <option
                    value="11+"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    11+ Years
                  </option>
                  <option
                    value="12+"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    12+ Years
                  </option>
                  <option
                    value="13+"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    13+ Years
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2 text-sm">
                  Current Employer
                </label>
                <input
                  type="text"
                  name="employee"
                  value={formData.employee}
                  onChange={handleChange}
                  placeholder="Enter your current company"
                  className="w-full rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-gray-700 font-bold mb-2 text-sm">
                    Current CTC (In LPA)
                  </label>
                  <select
                    name="current"
                    value={formData.current}
                    onChange={handleChange}
                    className="w-full rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                    required
                  >
                    <option value="-None-">-None-</option>
                    <option
                      value="Not Applicable"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      Not Applicable
                    </option>
                    <option
                      value="1 LPA"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      1 LPA
                    </option>
                    <option
                      value="2 LPA"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      2 LPA
                    </option>
                    <option
                      value="3 LPA"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      3 LPA
                    </option>
                    <option
                      value="4 LPA"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      4 LPA
                    </option>
                    <option
                      value="5 LPA"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      5 LPA
                    </option>
                    <option
                      value="6 LPA"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      6 LPA
                    </option>
                    <option
                      value="7 LPA"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      7 LPA
                    </option>
                    <option
                      value="8 LPA"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      8 LPA
                    </option>
                    <option
                      value="9 LPA"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      9 LPA
                    </option>
                    <option
                      value="10 LPA"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      10 LPA
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2 text-sm">
                    INR Equivalent
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={calculateINR(formData.current.split(" ")[0])}
                    className="w-full rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-gray-700 font-bold mb-2 text-sm">
                    Expected CTC (In LPA)
                  </label>
                  <select
                    name="expected"
                    value={formData.expected}
                    onChange={handleChange}
                    className="w-full rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                    required
                  >
                    <option value="-None-">-None-</option>
                    <option
                      value="Not Applicable"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      Not Applicable
                    </option>
                    <option
                      value="1 LPA"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      1 LPA
                    </option>
                    <option
                      value="2 LPA"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      2 LPA
                    </option>
                    <option
                      value="3 LPA"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      3 LPA
                    </option>
                    <option
                      value="4 LPA"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      4 LPA
                    </option>
                    <option
                      value="5 LPA"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      5 LPA
                    </option>
                    <option
                      value="6 LPA"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      6 LPA
                    </option>
                    <option
                      value="7 LPA"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      7 LPA
                    </option>
                    <option
                      value="8 LPA"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      8 LPA
                    </option>
                    <option
                      value="9 LPA"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      9 LPA
                    </option>
                    <option
                      value="10 LPA"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      10 LPA
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2 text-sm">
                    INR Equivalent
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={calculateINR(formData.expected.split(" ")[0])}
                    className="w-full rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2 text-sm">
                  Notice Period
                </label>
                <select
                  name="notice"
                  value={formData.notice}
                  onChange={handleChange}
                  className="w-full rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                  required
                >
                  <option
                    value="Immediate"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    Immediate
                  </option>
                  <option
                    value="7 Days"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    7 Days
                  </option>
                  <option
                    value="15 Days"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    15 Days
                  </option>
                  <option
                    value="30 Days"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    30 Days
                  </option>
                  <option
                    value="45 Days"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    45 Days
                  </option>
                  <option
                    value="60 Days"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    60 Days
                  </option>
                  <option
                    value="90 Days"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    90 Days
                  </option>
                  <option
                    value="Others"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    Others
                  </option>
                </select>
              </div>

              {/* <div>
                <label className="block text-gray-700 font-bold mb-2 text-sm">
                  Skills
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={handleSkillChange}
                    placeholder="Type a skill and Enter add icon"
                    className="w-full rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                  />
                  <button onClick={handleSkillAdd} className="">
                    <IoIosAddCircleOutline className="w-12 h-12 text-blue-800 ring-2 ring-blue-100 rounded-full" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="bg-gray-200 text-gray-700 font-bold font-poppins text-md px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                      {skill}
                      <button
                        onClick={() => handleSkillRemove(skill)}
                        className=""
                      >
                        <MdCancel className="w-6 h-6 text-white bg-red-500 ring-2 ring-blue-100 rounded-full" />
                      </button>
                    </div>
                  ))}
                </div>
              </div> */}
              <label className="block text-gray-700 font-bold text-sm">
                Experience Details
              </label>
              {formData.companies.map((company, companyIndex) => (
                <>
                  <div
                    key={companyIndex}
                    className="border-2 p-6 rounded-lg shadow-sm"
                  >
                    {/* <label className="block text-gray-700 font-bold mb-2 text-sm">
                  {company.companyName}
                </label> */}
                    {/* 1st Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Company Name"
                        value={company.companyName || ""}
                        onChange={(e) =>
                          handleInputChange(
                            companyIndex,
                            "companyName",
                            e.target.value
                          )
                        }
                        className="w-full rounded-lg p-3 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                      />
                      <input
                        type="text"
                        placeholder="From"
                        value={company.from}
                        onChange={(e) =>
                          handleInputChange(
                            companyIndex,
                            "from",
                            e.target.value
                          )
                        }
                        className="w-full rounded-lg p-3 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                      />
                      <input
                        type="text"
                        placeholder="To"
                        value={company.to}
                        onChange={(e) =>
                          handleInputChange(companyIndex, "to", e.target.value)
                        }
                        className="w-full rounded-lg p-3 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                      />
                    </div>

                    {/* 2nd Row */}
                    {company.rows.map((row, rowIndex) => (
                      <div
                        key={rowIndex}
                        className="flex flex-col lg:flex-row gap-2 mb-2 "
                      >
                        <input
                          type="text"
                          placeholder="Industry"
                          value={row.industry}
                          onChange={(e) =>
                            handleRowInputChange(
                              companyIndex,
                              rowIndex,
                              "industry",
                              e.target.value
                            )
                          }
                          className="w-full rounded-lg p-3 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                        />
                        <input
                          type="text"
                          placeholder="Domain"
                          value={row.domain}
                          onChange={(e) =>
                            handleRowInputChange(
                              companyIndex,
                              rowIndex,
                              "domain",
                              e.target.value
                            )
                          }
                          className="w-full rounded-lg p-3 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                        />
                        <input
                          type="text"
                          placeholder="Software"
                          value={row.software}
                          onChange={(e) =>
                            handleRowInputChange(
                              companyIndex,
                              rowIndex,
                              "software",
                              e.target.value
                            )
                          }
                          className="w-full rounded-lg p-3 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                        />
                        <input
                          type="text"
                          placeholder="month of experience "
                          value={row.months}
                          onChange={(e) =>
                            handleRowInputChange(
                              companyIndex,
                              rowIndex,
                              "months",
                              e.target.value
                            )
                          }
                          className="w-full rounded-lg p-3 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                        />
                        <div className="flex gap-2">
                          {/* Add Row Icon */}
                          <button
                            type="button"
                            onClick={() => addRow(companyIndex)}
                            className="text-blue-600"
                          >
                            <IoIosAddCircleOutline className="w-8 h-8 text-blue-800 ring-2 ring-blue-100 rounded-full" />
                          </button>

                          {/* Cancel Row Icon */}
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
                    ))}
                  </div>
                </>
              ))}
              {/* Add Company Button */}
              <button
                type="button"
                onClick={addCompany}
                className="text-blue-600 text-lg flex items-center gap-2"
              >
                <IoIosAddCircleOutline className="w-6 h-6" />
                Add Company
              </button>

              <div>
                <label className="block text-gray-700 font-bold mb-2 text-sm">
                  Current Location
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your current city"
                  className="w-full rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2 text-sm">
                  Willing to reloacte
                </label>
                <select
                  name="relocate"
                  value={formData.relocate}
                  onChange={handleChange}
                  className="w-full rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                  required
                >
                  <option value="-None-">-None-</option>
                  <option
                    value="yes"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    Yes
                  </option>
                  <option
                    value="no"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    No
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2 text-sm">
                  Preferred Location
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  id="dropdownHover"
                  className="w-full rounded-lg p-3 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                  required
                >
                  <option value="">-None-</option>
                  {sortedCities?.map((city, index) => (
                    <option
                      key={index}
                      value={city}
                      aria-labelledby="dropdownHoverButton"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#182073] text-white active:bg-blue-100 cursor-pointer rounded-md py-3 px-4 rounded-lg text-2xl font-semibold hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {load ? (
                  <div class="flex flex-row items-center justify-center gap-2">
                    Processing
                    <div class="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:.7s]"></div>
                    <div class="w-4 h-4 rounded-full bg-yellow-400 animate-bounce [animation-delay:.3s]"></div>
                    <div class="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:.7s]"></div>
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerForm;
