"use client"
import React, { useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const DayCards = () => {
  const [activeDay, setActiveDay] = useState("Day 1");

  const dayContent = {
    "Day 1": {
      title: "Day 1: Class A-B Conversion (Plastic Trims)",
      description: "Master the art of converting high-quality Class A surfaces into manufacturable Class B trims.",
      extra: "Key Achievement: Apply this technique to create production-ready designs efficiently.",
    },
    "Day 2": {
      title: "Day 2: Surface Remastering (BIW)",
      description:"Learn how to refine and remaster Body-in-White surfaces to meet industry standards.",
      extra: "Key Achievement: Ensure precision and manufacturability in structural designs.",
    },
    "Day 3": {
      title: "Effective Outreach",
      description: "Design modern automotive lighting and seating systems that balance function and aesthetics.",
      extra: "Key Achievement: Create innovative designs that enhance user experience and style.",
    },
    "Day 4": {
      title: "Day 4: Patch Work",
      description: "Learn patching techniques to repair and refine automotive surfaces seamlessly.",
      extra: "Key Achievement: Achieve superior design quality through precise surface enhancements.",
    },
    "Day 5": {
      title: "Day 5: Solid Remastering",
      description: "Gain expertise in solid model remastering to ensure production-ready accuracy.",
      extra: "Key Achievement: Deliver high-quality, manufacturable solid models for automotive components.",
    },
  };

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      {/* Horizontal Day Buttons */}
      <div className="flex space-x-4 mb-6">
        {Object.keys(dayContent).map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`px-2 py-1 lg:px-4 lg:py-2 border-2 rounded lg:rounded-full ${
              activeDay === day
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-blue-500 border-blue-500"
            } transition duration-300 ease-in-out`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Content Card */}
      <div
  key={activeDay} // Ensures the animation restarts on state change
  className={`w-64 lg:w-96 p-3 lg:p-6 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg shadow-lg transform transition-all duration-500 ease-out ${
    activeDay ? "animate-fade-in" : "opacity-0"
  }`}
>
  <h2 className="text-lg font-bold">{dayContent[activeDay].title}</h2>
  <p className="mt-2">{dayContent[activeDay].description}</p>
  <div className="mt-4 bg-white text-blue-600 p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
    <p>{dayContent[activeDay].extra}</p>
    <IoMdCheckmarkCircleOutline className="w-12 h-12 text-green-600"/>
  </div>
</div>

    </div>
  );
};

export default DayCards;
