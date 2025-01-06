"use client";
import React, { useState } from "react";

const testimonials = [
  {
    id: 1,
    icon: "📊",
    text: "Turn their passion for design into a career but don’t know where to start.",
  },
  {
    id: 2,
    icon: "👩‍💼",
    text: "Build a portfolio that gets noticed and unlocks exciting opportunities.",
  },
  {
    id: 3,
    icon: "🛠️",
    text: "Master tools and techniques but feel lost on how to begin.",
  },
  {
    id: 4,
    icon: "🚗",
    text: "Create innovative automotive concepts but lack the right guidance.",
  },
  {
    id: 5,
    icon: "🔄",
    text: "Transition into automotive design but don’t know the skills to focus on.",
  },
];

const Testi = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl mx-auto text-center py-10">
      <div className="relative flex justify-center items-center">
        <div className="relative w-full flex justify-center items-center">
          {testimonials.map((item, index) => {
            const isCurrent = index === currentIndex;
            const isNext = index === (currentIndex + 1) % testimonials.length;
            const isPrev =
              index ===
              (currentIndex - 1 + testimonials.length) % testimonials.length;

            return (
              <div
                key={item.id}
                className={`absolute transition-all duration-500 w-[120px] sm:w-[150px] md:w-[200px] lg:w-[260px] p-3 sm:p-4 md:p-5 lg:p-6 bg-blue-50 shadow-lg rounded-lg ${
                  isCurrent
                    ? "z-50 scale-100 opacity-100"
                    : "z-30 scale-90 opacity-80"
                } ${
                  isNext
                    ? "translate-x-28 sm:translate-x-36"
                    : isPrev
                    ? "-translate-x-28 sm:-translate-x-36"
                    : "translate-x-0 opacity-0"
                }`}
              >
                <div className="flex justify-center mb-4 text-2xl sm:text-3xl lg:text-4xl">
                  {item.icon}
                </div>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg font-poppins font-bold">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
        <button
          className="absolute left-2 sm:left-4 lg:left-20 bg-[#182073] text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center z-50"
          onClick={handlePrev}
        >
          ❮
        </button>
        <button
          className="absolute right-2 sm:right-4 lg:right-20 bg-[#182073] text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center z-50"
          onClick={handleNext}
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default Testi;
