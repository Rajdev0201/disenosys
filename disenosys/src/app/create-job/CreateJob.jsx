'use client';
import React, { useState } from 'react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from 'react-redux';
import {createJob} from "../Redux/action/createJob.js";

const JobForm = () => {
   const dispatch = useDispatch();
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

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    logo: null,
    companyName: '',
    type: '',
    location: '',
    experience: '',
    level: '',
    salary: '',
    jobPosted: '',
    jobExpire: '',
  });

  const [logoPreview, setLogoPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'logo') {
      const file = files[0];
      setFormData({ ...formData, logo: file });
      setLogoPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
     dispatch(createJob(data));
     setFormData({
        title: '',
        description: '',
        logo: null,
        companyName: '',
        type: '',
        location: '',
        experience: '',
        level: '',
        salary: '',
        jobPosted: '',
        jobExpire: '',
     })
  };

  return (
    <div className="max-w-5xl mx-auto py-5 font-garet">
      <h2 className="text-4xl font-medium text-start mb-4 text-gray-800">Create Job</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-tl-3xl rounded-tr-3xl shadow-lg p-10">
        <div className="flex flex-col gap-4">
          <label className="font-semibold">Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className=" border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Design Engineer"
            required
          />

          <label className="font-semibold">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className=" border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. TechCorp"
            required
          />

          <label className="font-semibold">Job Type</label>
          <select name="type" value={formData.type} onChange={handleChange} className=" border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
            <option value="">Select</option>
            <option>Full-Time</option>
            <option>Part-Time</option>
            <option>Internship</option>
            <option>Remote</option>
          </select>

          <label className="font-semibold">Location</label>
          <select
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className=" border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Chennai, India"
            required
          >
            <option value="">Select</option>
            {sortedCities.map((city) => (
                <option key={city} value={city}>
                    {city}
                </option>
            ))}
          </select>

          <label className="font-semibold">Experience</label>
          <select
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className=" border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 2-5 years"
            required
            >
            <option value="">Select</option>
            {exp.map((exp) => (
              <option key={exp.value} value={exp.label}>
                {exp.label}
              </option>
            ))}
          </select>

          <label className="font-semibold">Job Level</label>
          <select name="level" value={formData.level} onChange={handleChange} className=" border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
            <option value="">Select</option>
            <option>Entry</option>
            <option>Mid</option>
            <option>Senior</option>
          </select>

          <label className="font-semibold">Salary Range</label>
          <select
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className=" border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. ₹5LPA - ₹10LPA"
            required
          >
            <option value="">Select</option>
            {lpa.map((lpa) => (
                <option key={lpa} value={lpa}>{lpa}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-4">
          <label className="font-semibold">Job Posted Date</label>
          <input
            type="date"
            name="jobPosted"
            value={formData.jobPosted}
            onChange={handleChange}
            className=" border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <label className="font-semibold">Job Expiry Date</label>
          <input
            type="date"
            name="jobExpire"
            value={formData.jobExpire}
            onChange={handleChange}
            className=" border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <label className="font-semibold">Company Logo</label>
          <input
            type="file"
            name="logo"
            accept="image/*"
            onChange={handleChange}
            className=" border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 p-1"
            required
          />
          {logoPreview && (
            <img src={logoPreview} alt="Logo Preview" className="h-24 w-24 object-contain border rounded mt-2" />
          )}

          <label className="font-semibold">Job Description</label>
          <ReactQuill
              name="description"
              value={formData.description}
              onChange={(value) =>
                setFormData((prevData) => ({ ...prevData, description: value }))
              }
              theme="snow"
              placeholder="Write your blog here..."
              className="mt-1 h-64"
            />
        </div>

        <div className="col-span-1 md:col-span-2 text-center mt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white px-8 py-3 font-medium rounded-xl transition-all duration-300 shadow-md"
          >
           Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
