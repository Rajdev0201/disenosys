"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "India",
    dob: "",
  });

  const [load, setLoad] = useState(false);
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "",
    }));
  };

  const handlePhoneChange = (phone) => {
    setFormData({ ...formData, phone });
    setErrors((prevErrors) => ({
      ...prevErrors,
      phone: "",
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim())
      newErrors.lastName = "Last name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    else if (!/^\d{10,15}$/.test(formData.phone))
      newErrors.phone = "Invalid phone number format. Enter 10-15 digits.";
    if (!formData.dob.trim()) newErrors.dob = "Year of birth is required.";
    else if (!/^\d{4}$/.test(formData.dob))
      newErrors.dob = "Enter a valid year (YYYY).";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        setLoad(true);
        const catiaScore = localStorage.getItem("totalScoreCatia") || 0;
        const catiaPercentage = localStorage.getItem("catiaPercentage") || 0;
        const productScore = localStorage.getItem("totalScoreProduct") || 0;
        const productPercentage =
          localStorage.getItem("productPercentage") || 0;

        const response = await axios.post(
          "https://disenosys-1.onrender.com/exam/details",
          {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            country: formData.country,
            dob: formData.dob,
            catiaScore,
            catiaPercentage,
            productScore,
            productPercentage,
          }
        );
        localStorage.setItem("name",formData.name);
        localStorage.setItem("name",formData.email);
        localStorage.setItem("name",formData.phone);

        localStorage.removeItem("totalScoreCatia");
        // localStorage.removeItem("catiaPercentage");
        localStorage.removeItem("totalScoreProduct");
        // localStorage.removeItem("productPercentage");
        localStorage.removeItem("answers0");
        localStorage.removeItem("startTime0");
        localStorage.removeItem("answers1");
        localStorage.removeItem("startTime1");
        localStorage.removeItem("currentQuestionIndex1");
        localStorage.removeItem("currentQuestionIndex0");
        localStorage.removeItem("activeSection", "PRODUCT"); 

        // router.push(`results?catia=${catiaScore}&product=${productScore}`);
        router.push("/results");
        console.log("Result submitted successfully:", response.data);
      } catch (error) {
        console.error("Error submitting result:", error);
      } finally {
        setLoad(false); // Reset the load state regardless of success or failure
      }
    }
  };

  return (
    <div className="bg-blue-100 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6">
        {load ? 
            <div className="flex justify-center items-center h-screen">
            <div className="flex-col gap-4 w-full flex items-center justify-center">
              <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-[#182073] rounded-full">
                <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
              </div>
            </div>
          </div>
          :(
         <>
        <h1 className="text-2xl font-bold text-center mb-2">
          You&apos;re almost there...
        </h1>
        <p className="text-gray-600 text-center mb-6">Confirm your details</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="firstName"
            >
              * First name(s)
            </label>
            <input
              type="text"
              id="firstName"
              className={`w-full border ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 focus:outline-none focus:ring-1 ${
                errors.firstName ? "focus:ring-red-500" : "focus:ring-blue-500"
              }`}
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="lastName"
            >
              * Last name(s)
            </label>
            <input
              type="text"
              id="lastName"
              className={`w-full border ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 focus:outline-none focus:ring-1 ${
                errors.lastName ? "focus:ring-red-500" : "focus:ring-blue-500"
              }`}
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="email"
            >
              * Email address
            </label>
            <input
              type="email"
              id="email"
              className={`w-full border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 focus:outline-none focus:ring-1 ${
                errors.email ? "focus:ring-red-500" : "focus:ring-blue-500"
              }`}
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="phone"
            >
              * Phone
            </label>
            <div className="flex">
              <PhoneInput
                country={"in"}
                id="phone"
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="Enter your number"
                inputProps={{
                  name: "phone",
                  required: true,
                  autoFocus: true,
                  className: `w-[250px] md:w-[350px] border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } p-2 ml-12 rounded-md`,
                }}
              />
            </div>
            {errors.phone && (
              <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="country"
            >
              * Country of residence
            </label>
            <select
              id="country"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Australia">Australia</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Japan">Japan</option>
              <option value="China">China</option>
              <option value="Brazil">Brazil</option>
              <option value="South Africa">South Africa</option>
              <option value="Russia">Russia</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="dob"
            >
              * Year of birth (YYYY)
            </label>
            <input
              type="text"
              id="dob"
              className={`w-full border ${
                errors.dob ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 focus:outline-none focus:ring-1 ${
                errors.dob ? "focus:ring-red-500" : "focus:ring-blue-500"
              }`}
              value={formData.dob}
              onChange={handleChange}
              placeholder="Enter your year of birth"
            />
            {errors.dob && (
              <p className="text-sm text-red-500 mt-1">{errors.dob}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-bold text-xl ${
              !load
                ? "bg-[#182073] text-white hover:bg-blue-400"
                : "bg-blue-50 hover:bg-gray-200"
            }`}
          >
            {load ? (
              <div class="flex flex-row gap-2 items-center justify-center">
                <div class="w-4 h-4 rounded-full bg-blue-500 animate-bounce [animation-delay:.7s]"></div>
                <div class="w-4 h-4 rounded-full bg-green-500 animate-bounce [animation-delay:.3s]"></div>
                <div class="w-4 h-4 rounded-full bg-purple-500 animate-bounce [animation-delay:.7s]"></div>
              </div>
            ) : (
              "View Score"
            )}
          </button>
        </form>
        </>
         )}
      </div>
    </div>
  );
};

export default Form;
