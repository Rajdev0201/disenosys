"use client";
import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { CheckOut } from "../Redux/action/bootcamp.js";


const Enroll = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [cartItems, setCartItems] = useState([
    { coursename: "Automotive design Bootcamp", price: 199},
  ]);

  const [price, setPrice] = useState(199); 
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { userData, cartItems };
    dispatch(CheckOut(data));
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex justify-center items-center mt-28">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
        <div className="text-center">
          <div className="bg-[#182073] text-white text-lg font-bold py-2 px-8 inline-block rounded-lg relative -top-16 shadow-md">
            <span className="text-2xl">₹{price}</span>{" "}
            <span className="line-through text-gray-300 text-sm">₹1999</span>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 sm:grid-cols-3 gap-10 mt-6">
          <Feature icon="🎥" text="5-Day Recorded Content" />
          <Feature icon="🖥️" text="3-Hour Mega Webinar" />
          <Feature icon="🎁" text="Bonuses worth ₹45,000" />
          <Feature icon="❓" text="Q&A with Vaibhav" />
          <Feature icon="💎" text="Instant Access to Foundational Module" />
          <Feature icon="📅" text="Content Access" />
          <Feature icon="⬆️" text="Content Upgrade" />
          <Feature icon="📘" text="Course Notes" />
          <Feature icon="📜" text="Certificate" />
        </div>
        <div className="mt-12 text-center">
          <button className="bg-gradient-to-r from-blue-600 to-blue-400 text-white relative -bottom-6 font-bold py-3 px-8 rounded-lg shadow-lg hover:scale-105 transition transform"  onClick={toggleModal}>
            ENROLL NOW
          </button> 
        </div>
        {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={toggleModal}
            >
               <FiX
                              size={28}
                              onClick={toggleModal}
                              className="absolute -top-5  ring-2 bg-red-500 font-bold text-xl p-1 ring-white rounded-full -right-3 cursor-pointer text-white"
                            />
            </button>
            
            {/* Modal Content */}
            <h2 className="text-2xl font-bold mb-4">Enroll in the Workshop</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-600 text-sm mb-2">Full Name<span className="text-red-500 mx-1">*</span></label>
              <input
                type="text"
                name="name"
                value={userData.name}
                placeholder="Enter your full name"
                onChange={handleInputChange}
                className="w-full px-4 py-2 text-gray-400 border rounded-lg focus:outline-none focus:border-blue-600"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-2">Email Address<span className="text-red-500 mx-1">*</span></label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={userData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 text-gray-400 border rounded-lg focus:outline-none focus:border-blue-600"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-2">Phone Number<span className="text-red-500 mx-1">*</span></label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={userData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 text-gray-400 border rounded-lg focus:outline-none focus:border-blue-600"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#182073] hover:bg-[#182073] text-white py-3 font-poppins rounded-lg font-semibold"
            >
              Submit
            </button>
          </form>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

const Feature = ({ icon, text }) => (
  <div className="flex items-center space-x-3">
    <span className="text-2xl">{icon}</span>
    <span className="text-gray-700 font-medium">{text}</span>
  </div>
);

export default Enroll;
