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
import "../home/Home.css";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-multi-date-picker";
import { useRouter } from "next/navigation";

const CareerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: new Date(),
    gender: "",
    experience: "",
    expmonths:"",
    employee: "",
    current: "",
    cinr:"",
    expected: "",
    einr:"",
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
  const router = useRouter();

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
    "Raipur",
    "Ranchi",
    "Gwalior",
    "Agartala",
    "Varanasi",
    "Bikaner",
    "Aligarh",
    "Ajmer",
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
    "Nanded",
    "Sonipat",
    "Nellore",
    "Chennai",
    "Ludhiana",
    "Ambala",
    "Udaipur",
    "Navi Mumbai",
    "Bareilly",
    "Panaji",
    "Kozhikode",
    "Karnal",
    "Meerut",
    "Hosur",
    "Vijayawada",
    "Mysore",
    "Rishikesh",
    "Kollam",
    "Siliguri",
    "Jalgaon",
    "Jalandhar",
    "Kurnool",
  ];
  
  const exp = [
    { label: "Fresher", value: 0 },
    { label: "1 Year", value: 1 },
    { label: "2 Years", value: 2 },
    { label: "3 Years", value: 3 },
    { label: "4 Years", value: 4 },
    { label: "5 Years", value: 5 },
    { label: "6 Years", value: 6 },
    { label: "7 Years", value: 7 },
    { label: "8 Years", value: 8 },
    { label: "9 Years", value: 9 },
    { label: "10 Years", value: 10 },
    { label: "11 Years", value: 11 },
    { label: "12 Years", value: 12 },
    { label: "13 Years", value: 13 },
    { label: "14 Years", value: 14 },
    { label: "15 Years", value: 15 },
    { label: "16 Years", value: 16 },
    { label: "17 Years", value: 17 },
    { label: "18 Years", value: 18 },
    { label: "19 Years", value: 19 },
    { label: "20 Years", value: 20 },
    { label: "21 Years", value: 21 },
    { label: "22 Years", value: 22 },
    { label: "23 Years", value: 23 },
    { label: "24 Years", value: 24 },
    { label: "25 Years", value: 25 },
    { label: "26 Years", value: 26 },
    { label: "27 Years", value: 27 },
    { label: "28 Years", value: 28 },
    { label: "29 Years", value: 29 },
    { label: "30 Years", value: 30 },
  ];
   
  const lpa = [
    "1 Lakh",
    "2 Lakh",
    "3 Lakh",
    "4 Lakh",
    "5 Lakh",
    "6 Lakh",
    "7 Lakh",
    "8 Lakh",
    "9 Lakh",
    "10 Lakh",
    "11 Lakh",
    "12 Lakh",
    "13 Lakh",
    "14 Lakh",
    "15 Lakh",
    "16 Lakh",
    "17 Lakh",
    "18 Lakh",
    "19 Lakh",
    "20 Lakh",
    "21 Lakh",
    "22 Lakh",
    "23 Lakh",
    "24 Lakh",
    "25 Lakh",
    "26 Lakh",
    "27 Lakh",
    "28 Lakh",
    "29 Lakh",
    "30 Lakh",
    "31 Lakh",
    "32 Lakh",
    "33 Lakh",
    "34 Lakh",
    "35 Lakh",
    "36 Lakh",
    "37 Lakh",
    "38 Lakh",
    "39 Lakh",
    "40 Lakh",
    "41 Lakh",
    "42 Lakh",
    "43 Lakh",
    "44 Lakh",
    "45 Lakh",
    "46 Lakh",
    "47 Lakh",
    "48 Lakh",
    "49 Lakh",
    "50 Lakh",
  ];
  const sortedCities = importantCities.sort();

  // const [skillInput, setSkillInput] = useState("");
  const [load, setLoad] = useState(false);
  const handleChange = (e) => {
    if (e.target) {
      const { name, value, files } = e.target;
      setFormData({
        ...formData,
        [name]: files ? files[0] : value,
      });
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        dob: e,
      }));
    }
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
    const name = "";
      // text.match(/(?:Name|Full Name)[\s:]*([^\n]+)/i)?.[1]?.trim() || "";
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
    form.append("expmonths", formData.expmonths); 
    form.append("employee", formData.employee);
    form.append("current", formData.current);
    form.append("cinr", formData.cinr);
    form.append("expected", formData.expected);
    form.append("einr", formData.einr);
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
      router.push("/applied");
       setFormData({
    name: "",
    email: "",
    phone: "",
    dob: new Date(),
    gender: "",
    experience: "",
    expmonths: "",
    employee: "",
    current: "",
    cinr: "",
    expected: "",
    einr: "",
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
    } catch (error) {
      console.error("Error submitting career:", error);
      alert("An error occurred. Please try again later.");
    }
    setLoad(false);
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

  const [errors, setErrors] = useState({
    from: "",
    to: "",
  }); 

  const handleInputChange = (companyIndex, field, value) => {
    const updatedCompanies = [...formData.companies];
    updatedCompanies[companyIndex][field] = value;

    if (field === "from" || field === "to") {
      validateField(field, value);
      return;
    }

    setFormData({
      ...formData,
      companies: updatedCompanies,
    });
  };

  const validateField = (field, value) => {
    const regex = /^\d{4}\/(0[1-9]|1[0-2])$/;
    if (value && !regex.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: `Invalid format for ${field}. Please enter in YYYY/MM format with a valid month (01-12).`,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "",
      }));
    }
  };

 

  const handleRowInputChange = (companyIndex, rowIndex, field, value) => {
    const updatedCompanies = [...formData.companies];
    updatedCompanies[companyIndex].rows[rowIndex][field] = value;
    // validateRowField(updatedCompanies, companyIndex, rowIndex, field, value);
    setFormData({
      ...formData,
      companies: updatedCompanies,
    });
  };

  // const validateRowField = (companies,companyIndex, rowIndex, field, value) => {
  //   const from = companies[companyIndex].from;
  //   const to = companies[companyIndex].to;
  
  //   if (from && to) {
  //     const fromDate = new Date(from.split("/")[0], from.split("/")[1] - 1);
  //     const toDate = new Date(to.split("/")[0], to.split("/")[1] - 1);
  //     const totalMonths = (toDate.getFullYear() - fromDate.getFullYear()) * 12 + (toDate.getMonth() - fromDate.getMonth());
  
  //     if (parseInt(value) > totalMonths) {
  //       setErrors((prevErrors) => ({
  //         ...prevErrors,
  //         [`row-${companyIndex}-${rowIndex}`]: `Your month experience should not exceed ${totalMonths} months.`,
  //       }));
  //     } else {
  //       setErrors((prevErrors) => ({
  //         ...prevErrors,
  //         [`row-${companyIndex}-${rowIndex}`]: "",
  //       }));
  //     }
  //   }
  // };

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
                <div className="w-full rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus-within:border-none focus-within:outline-purple-500">
                  <DatePicker
                    selected={formData.dob}
                    onChange={handleChange}
                    dateFormat="MM/dd/yyyy"
                    placeholder="yyyy/MM/dd"
                    className="w-full border-none focus:outline-none text-base px-4 py-2 rounded-lg"
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                  />
                  {/* <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                  required
                /> */}
                </div>
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
              <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-gray-700 font-bold mb-2 text-sm">
                  Experience in Years
                </label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full  rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                  required
                >
                  <option value="">Total Experience</option>
                  {exp?.map((experience, index) => (
                    <option
                      key={index}
                      value={experience.value}
                      aria-labelledby="dropdownHoverButton"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      {experience.label}
                    </option>
                  ))}
                </select>
              </div>
               
              <div>
                <label className="block text-gray-700 font-bold mb-2 text-sm">
                Experience in Months
                </label>
                <select
                  name="expmonths"
                  value={formData.expmonths}
                  onChange={handleChange}
                  className="w-full  rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                  required
                >
                  <option
                      value="0 months"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      0 months
                    </option>
                  <option
                    value="1 month"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    1 month
                  </option>
                  <option
                    value="2 months"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    2 months
                  </option>
                  <option
                    value="3 months"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    3 months
                  </option>
                  <option
                    value="4 months"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    4 months
                  </option>
                  <option
                    value="5 months"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    5 months
                  </option>
                  <option
                    value="6 months"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    6 months
                  </option>
                  <option
                    value="7 months"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    7 months
                  </option>
                  <option
                    value="8 months"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    8 months
                  </option>
                  <option
                    value="9 months"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    9 months
                  </option>
                  <option
                    value="10 months"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    10 months
                  </option>
                  <option
                    value="11 months"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    11 months
                  </option>

                  <option
                    value="12 months"
                    className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    12 months
                  </option>
        
                </select>
              </div>
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
                    {lpa?.map((lpa, index) => (
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
                <div>
                 
                  <select
                    name="cinr"
                    value={formData.cinr}
                    onChange={handleChange}
                    className="w-full rounded-lg p-3 text-gray-700 mt-7 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                    required
                  >
                    
                    <option
                      value="Not Applicable"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      Not Applicable
                    </option>
                    <option
                      value="10,000"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      10,000
                    </option>
                    <option
                      value="20,000"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      20,000
                    </option>
                    <option
                      value="30,000"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      30,000
                    </option>
                    <option
                      value="40,000"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      40,000
                    </option>
                    <option
                      value="50,000"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                     50,000
                    </option>
                    <option
                      value="60,000"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      60,000
                    </option>
                    <option
                      value="70,000"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      70,000
                    </option>
                    <option
                      value="80,000"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      80,000
                    </option>
                    <option
                      value="90,000"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      90,000
                    </option>
                   
                  </select>
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
                    {lpa?.map((lpa, index) => (
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
                <div>
                  {/* <label className="block text-gray-700 font-bold mb-2 text-sm">
                    INR
                  </label> */}
                  <select
                    name="einr"
                    value={formData.einr}
                    onChange={handleChange}
                    className="w-full rounded-lg p-3 text-gray-700 mt-7 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                    required
                  >
                    <option
                      value="Not Applicable"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      Not Applicable
                    </option>
                    <option
                      value="10,000"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      10,000
                    </option>
                    <option
                      value="20,000"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      20,000
                    </option>
                    <option
                      value="30,000"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      30,000
                    </option>
                    <option
                      value="40,000"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      40,000
                    </option>
                    <option
                      value="50,000"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                     50,0000
                    </option>
                    <option
                      value="60,000"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      60,0000
                    </option>
                    <option
                      value="70,000"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      70,000
                    </option>
                    <option
                      value="80,000"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      80,000
                    </option>
                    <option
                      value="90,000"
                      className="bg-white text-gray-500 hover:bg-[#182073] active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      90,000
                    </option>
                   
                  </select>
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
                        required
                      />
                      <div>
                      <input
                        type="text"
                        placeholder="From ex:2024/05"
                        value={company.from}
                        onChange={(e) =>
                          handleInputChange(
                            companyIndex,
                            "from",
                            e.target.value
                          )
                        }
                        className="w-full rounded-lg p-3 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                        required
                      />
                      </div>
                      {errors.from && (
              <p className="text-red-500 text-sm mt-1">{errors.from}</p>
            )}
            
                      <input
                        type="text"
                        placeholder="To ex:2025/08"
                        value={company.to}
                        onChange={(e) =>
                          handleInputChange(companyIndex, "to", e.target.value)
                        }
                        className="w-full rounded-lg p-3 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                        required
                     />
                          {errors.to && (
              <p className="text-red-500 text-sm mt-1">{errors.to}</p>
            )}
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

                  {/* {errors[`row-${companyIndex}-${rowIndex}`] && (
                <p className="text-red-500 text-sm -mt-0 w-full">
                  {errors[`row-${companyIndex}-${rowIndex}`]}
                </p>
              )}  */}
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
                <select
                  name="city"
                  value={formData.city}
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
