"use client";
import React, { useState } from "react";
import "../home/Home.css";
import Image from "next/image";
import d from "../assests/brand-1.png";
import { TbHandClick } from "react-icons/tb";
import axios from "axios";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdCancel } from "react-icons/md";

const CareerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    experience: "",
    employee:"",
    current:"",
    expected:"",
    notice:"",
    city: "",
    relocate:"",
    location:"",
    file: null,
  });
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [load, setLoad] = useState(false);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSkillChange = (e) => {
    setSkillInput(e.target.value);
  };

  const handleSkillAdd = (e) => {
    e.preventDefault();
    if (skillInput && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = async (e) => {
    setLoad(true);
    e.preventDefault();
  
    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append("dob", formData.dob);
    form.append("gender", formData.gender);
    form.append("experience",formData.experience);
    form.append("employee",formData.employee);
    form.append("current",formData.current);
    form.append("expected",formData.expected);
    form.append("notice",formData.notice);
    form.append("city",formData.city);
    form.append("relocate",formData.relocate);
    form.append("location",formData.location);
    form.append("skills", skills.join(", "));
    form.append("file", formData.file);
    console.log(formData.file)

    try {
      await axios.post("http://localhost:8000/career", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("form submitted successfully!");
    } catch (error) {
      console.error("Error submitting career:", error);
      alert("An error occurred. Please try again later.");
    }
    setLoad(false);
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam,
              consectetur iste? Dignissimos blanditiis perferendis modi
              exercitationem odio quos.
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
                Apply Today <TbHandClick className="w-6 h-6"/>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  <option value="male" className="bg-[#182073] text-white">Male</option>
                  <option value="female" className="bg-[#182073] text-white mt-1">Female</option>
                  <option value="other" className="bg-[#182073] text-white mt-1">Other</option>
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
                   <option value="">Experience</option>
                  <option value="fresher" className="bg-[#182073] text-white">Fresher</option>
                  <option value="0-1" className="bg-[#182073] text-white">0-1 Years</option>
                  <option value="1-2" className="bg-[#182073] text-white">1-2 Years</option>
                  <option value="2-3" className="bg-[#182073] text-white">2-3 Years</option>
                  <option value="3-4" className="bg-[#182073] text-white">3-4 Years</option>
                  <option value="4-5" className="bg-[#182073] text-white">4-5 Years</option>
                  <option value="5-6" className="bg-[#182073] text-white">5-6 Years</option>
                  <option value="6-7" className="bg-[#182073] text-white">6-7 Years</option>
                  <option value="7-8" className="bg-[#182073] text-white">7-8 Years</option>
                  <option value="8-9" className="bg-[#182073] text-white">8-9 Years</option>
                  <option value="9-10" className="bg-[#182073] text-white">9-10 Years</option>
                  <option value="10+" className="bg-[#182073] text-white">10+ Years</option>
                  <option value="11+" className="bg-[#182073] text-white">11+ Years</option>
                  <option value="12+" className="bg-[#182073] text-white">12+ Years</option>
                  <option value="13+" className="bg-[#182073] text-white">13+ Years</option>
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
                  <option value="Not Applicable" className="bg-[#182073] text-white">Not Applicable</option>
                  <option value="1-3" className="bg-[#182073] text-white">1-3</option>
                  <option value="3-5" className="bg-[#182073] text-white">3-5</option>
                  <option value="5-7" className="bg-[#182073] text-white">5-7</option>
                  <option value="7-9" className="bg-[#182073] text-white">7-9</option>
                  <option value="9-10" className="bg-[#182073] text-white">9-10</option>
                  <option value="10+" className="bg-[#182073] text-white">10+</option>
                </select>
              </div>
             
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
                  <option value="Not Applicable" className="bg-[#182073] text-white">Not Applicable</option>
                  <option value="1-3" className="bg-[#182073] text-white">1-3</option>
                  <option value="3-5" className="bg-[#182073] text-white">3-5</option>
                  <option value="5-7" className="bg-[#182073] text-white">5-7</option>
                  <option value="7-9" className="bg-[#182073] text-white">7-9</option>
                  <option value="9-10" className="bg-[#182073] text-white">9-10</option>
                  <option value="10+" className="bg-[#182073] text-white">10+</option>
                </select>
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
                  <option value="-None-">-None-</option>
                  <option value="Immediate" className="bg-[#182073] text-white">Immediate</option>
                  <option value="Not Applicable" className="bg-[#182073] text-white mt-1">Not Applicable</option>
                  <option value="1 month" className="bg-[#182073] text-white mt-1">1 month</option>
                  <option value="2 months" className="bg-[#182073] text-white mt-1">2 months</option>
                  <option value="3 months" className="bg-[#182073] text-white mt-1">3 months</option>
                </select>
              </div>


              <div>
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
          <button
            onClick={handleSkillAdd}
            className=""
          >
           <IoIosAddCircleOutline className="w-12 h-12 text-blue-800 ring-2 ring-blue-100 rounded-full"/>
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
                <MdCancel className="w-6 h-6 text-white bg-red-500 ring-2 ring-blue-100 rounded-full"/>
              </button>
            </div>
          ))}
        </div>
      </div>

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
                  <option value="yes" className="bg-[#182073] text-white">Yes</option>
                  <option value="no" className="bg-[#182073] text-white mt-1">No</option>
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
    className="w-full rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
    required
  >
    <option value="">-None-</option>
    <option value="JAMMU AND KASHMIR" className="bg-[#182073] text-white">JAMMU AND KASHMIR</option>
    <option value="HIMACHAL PRADESH" className="bg-[#182073] text-white">HIMACHAL PRADESH</option>
    <option value="PUNJAB" className="bg-[#182073] text-white">PUNJAB</option>
    <option value="CHANDIGARH" className="bg-[#182073] text-white">CHANDIGARH</option>
    <option value="UTTARAKHAND" className="bg-[#182073] text-white">UTTARAKHAND</option>
    <option value="HARYANA" className="bg-[#182073] text-white">HARYANA</option>
    <option value="DELHI" className="bg-[#182073] text-white">DELHI</option>
    <option value="RAJASTHAN" className="bg-[#182073] text-white">RAJASTHAN</option>
    <option value="UTTAR PRADESH" className="bg-[#182073] text-white">UTTAR PRADESH</option>
    <option value="BIHAR" className="bg-[#182073] text-white">BIHAR</option>
    <option value="SIKKIM" className="bg-[#182073] text-white">SIKKIM</option>
    <option value="ARUNACHAL PRADESH" className="bg-[#182073] text-white">ARUNACHAL PRADESH</option>
    <option value="NAGALAND" className="bg-[#182073] text-white">NAGALAND</option>
    <option value="MANIPUR" className="bg-[#182073] text-white">MANIPUR</option>
    <option value="MIZORAM" className="bg-[#182073] text-white">MIZORAM</option>
    <option value="TRIPURA" className="bg-[#182073] text-white">TRIPURA</option>
    <option value="TAMILNADU" className="bg-[#182073] text-white">TAMILNADU</option>
    <option value="MEGHALAYA" className="bg-[#182073] text-white">MEGHALAYA</option>
    <option value="ASSAM" className="bg-[#182073] text-white">ASSAM</option>
    <option value="WEST BENGAL" className="bg-[#182073] text-white">WEST BENGAL</option>
    <option value="JHARKHAND" className="bg-[#182073] text-white">JHARKHAND</option>
    <option value="ORISSA" className="bg-[#182073] text-white">ORISSA</option>
    <option value="CHHATTISGARH" className="bg-[#182073] text-white">CHHATTISGARH</option>
    <option value="MADHYA PRADESH" className="bg-[#182073] text-white">MADHYA PRADESH</option>
    <option value="GUJARAT" className="bg-[#182073] text-white">GUJARAT</option>
  </select>
              </div>


              <div>
                <label className="block text-gray-700 font-bold mb-2 text-sm">
                  Upload Resume
                </label>
                <input
                  type="file"
                  name="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleChange}
                  className="w-full rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:border-none outline-none focus:outline-purple-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#182073] text-white py-3 px-4 rounded-lg text-lg font-semibold hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                   {load ? "Loading..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerForm;
