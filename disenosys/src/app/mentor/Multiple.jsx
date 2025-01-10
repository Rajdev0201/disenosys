"use client"
import React, { useState } from "react";

const MultiSelectDropdown = ({ label, options, selectedOptions, setSelectedOptions }) => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle dropdown

  const handleSelectionChange = (option) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option) // Remove if already selected
        : [...prevSelected, option] // Add if not selected
    );
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev); // Toggle dropdown open/close
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown} // Toggle dropdown on click
        className="w-full rounded-lg p-3 text-gray-700 text-base border-2 border-blue-500 focus:outline-purple-500"
      >
        {label}
      </button>
      {isOpen && ( // Only show dropdown if `isOpen` is true
        <div className="absolute z-10 bg-white border-2 border-gray-300 rounded-md shadow-md mt-1 w-full max-h-60 overflow-y-auto">
          {options.map((option, index) => (
            <label
              key={index}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => handleSelectionChange(option)}
                className="form-checkbox text-blue-500"
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
