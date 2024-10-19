"use client";
import React, { useState } from "react";
import "./Online.css";
import form from "../assests/profile/onlineform.jpg";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const Online = () => {
   
    const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);

    const name = formData.get("name");
    const email = formData.get("email");
    const mobile = formData.get("mobile");
    const cname = formData.get("cname");
    if (!name || !email || !mobile || !cname) {
      setResult("Please fill out all fields.");
      setLoading(false);
      return;
    }

    formData.append("access_key", "6c016ccc-be7f-4c75-be4c-56e74e4671fa");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        event.target.reset();
        setTimeout(() => {
          setResult("");
        }, 2000);
      } else {
        setResult(data.message);
      }
    } catch (error) {
      console.error("Error submitting the form", error);
      setResult("An error occurred. Please try again.");
    }
    setLoading(false);
  };

    const search = useSearchParams();
    const courseName = search.get("courseName");
  return (
    <div className="flex justify-center items-center py-40 bg-gray-50">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Form Section */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-[#182073] mb-6 text-center md:text-left">
            Course Enrollment
          </h2>
          <form className="text-[#182073]" onSubmit={onSubmit}>
            {/* Name Input */}
            <label className="text-sm font-semibold block mb-2 after:content-['*'] after:ml-0.5 after:text-red-500">
              Name
            </label>
            <input
              className="w-full p-3 mb-4 rounded-md bg-gray-100 text-black outline-none ring-none focus:ring-2 focus:ring-sky-500"
              type="text"
              name="name"
              placeholder="Enter your Name"
              id="name"
              required
            />

            {/* Email Input */}
            <label className="text-sm font-semibold block mb-2 after:content-['*'] after:ml-0.5 after:text-red-500">
              Email
            </label>
            <input
              className="w-full p-3 mb-4 rounded-md bg-gray-100 text-black outline-none ring-none focus:ring-2 focus:ring-sky-500"
              type="email"
              name="email"
              placeholder="Enter your Email"
              id="email"
              required
            />

            {/* Phone Input */}
            <label className="text-sm font-semibold block mb-2 after:content-['*'] after:ml-0.5 after:text-red-500">
              Phone
            </label>
            <input
              className="w-full p-3 mb-4 rounded-md bg-gray-100 text-black outline-none ring-none focus:ring-2 focus:ring-sky-500"
              type="text"
              name="mobile"
              placeholder="Enter your Phone Number"
              id="mobile"
              required
            />

            {/* Course Input */}
            <label className="text-sm font-semibold block mb-2 after:content-['*'] after:ml-0.5 after:text-red-500">
              Your Course
            </label>
            <input
              className="w-full p-3 mb-4 rounded-md bg-gray-100 text-black outline-none ring-none focus:ring-2 focus:ring-sky-500"
              type="text"
                name="cname"
              placeholder="Enter the Course Name"
              defaultValue={courseName}
               id="cname"
              required
            />

            {/* Submit Button */}
            <div className="flex justify-center md:justify-start mt-6">
              <button
                className="w-full md:w-auto bg-[#182073] text-white font-bold py-3 px-6 rounded-sm hover:bg-sky-400 transition-colors"
                type="submit"
                disabled={loading}
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </div>
            {result && <p className={`mt-4 ${result.includes("error") ? "text-red-500" : "text-green-500"}`}>{result}</p>}
          </form>
        </div>
          

        {/* Image Section */}
        <div className="flex justify-center items-center">
          <Image
            src={form}
            alt="Enrollment Image"
            className="rounded-lg object-cover"
            width={400}
            height={400}
          />
        </div>
      </div>
    </div>
  );
};

export default Online;
