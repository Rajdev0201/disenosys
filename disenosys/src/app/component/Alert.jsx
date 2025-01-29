"use client"
import React from 'react'
import { FaTimes } from "react-icons/fa";

const NotificationDropdown = ({ onClose }) => {
  return (
    <div className="absolute  left-0 lg:-left-44 right-0 -top-36 lg:top-10  mt-3 w-60 bg-white shadow-lg rounded-md border border-gray-200 z-50">
      <div className="p-3 border-b font-bold text-gray-800 flex justify-between items-center">
        <span>Notifications</span>
        <FaTimes className="text-gray-500 hover:text-red-600 cursor-pointer" onClick={onClose} />
      </div>
      <div className="p-3 flex items-center justify-between text-gray-700">
        <span>Welcome to Disenosys</span>
        <span className="w-3 h-3 bg-[#0d1039] rounded-full"></span>
      </div>
    </div>
  );
};

export default NotificationDropdown;
