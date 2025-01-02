"use client"
import React, { useState } from "react";

const DayCards = () => {
  const [activeDay, setActiveDay] = useState("Day 1");

  const dayContent = {
    "Day 1": {
      title: "Find your Objective & TG",
      description: "Steal your competitors leads and customers using growth hacking.",
      extra: "Generated my client 40M in revenue using this technique.",
    },
    "Day 2": {
      title: "Build a Winning Strategy",
      description: "Discover powerful tactics to outpace your competitors.",
      extra: "Learned advanced strategies for scaling.",
    },
    "Day 3": {
      title: "Effective Outreach",
      description: "Master the art of cold outreach that converts.",
      extra: "Achieved a 60% conversion rate using this technique.",
    },
    // Add content for Day 4, Day 5...
  };

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      {/* Horizontal Day Buttons */}
      <div className="flex space-x-4 mb-6">
        {Object.keys(dayContent).map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`px-4 py-2 border-2 rounded-full ${
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
  className={`w-96 p-6 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg shadow-lg transform transition-all duration-500 ease-out ${
    activeDay ? "animate-fade-in" : "opacity-0"
  }`}
>
  <h2 className="text-lg font-bold">{dayContent[activeDay].title}</h2>
  <p className="mt-2">{dayContent[activeDay].description}</p>
  <div className="mt-4 bg-white text-blue-600 p-4 rounded-lg shadow-md">
    <p>{dayContent[activeDay].extra}</p>
  </div>
</div>

    </div>
  );
};

export default DayCards;
