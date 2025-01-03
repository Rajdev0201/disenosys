"use client";
import React, { useState } from "react";

const testimonials = [
  {
    id: 1,
    icon: "📊",
    text: "Generate leads for your business but don’t know ‘how’",
  },
  {
    id: 2,
    icon: "🔖",
    text: "Want to build a personal brand but don’t know where to start",
  },
  {
    id: 3,
    icon: "👩‍💼",
    text: "Get inbound offers from recruiters and clients",
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
    <div className="max-w-xl lg:max-w-4xl lg:mx-auto text-center py-10">
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
                className={`absolute transition-all duration-500 w-[150px] lg:w-[260px] p-3 lg:p-6 bg-blue-50 shadow-lg rounded-lg ${
                  isCurrent
                    ? "z-50 scale-100 opacity-100"
                    : "z-30 scale-90 opacity-80"
                } ${
                  isNext
                    ? "translate-x-36"
                    : isPrev
                    ? "-translate-x-36"
                    : "translate-x-0 opacity-0"
                }`}
              >
                <div className="flex justify-center mb-4 text-4xl">
                  {item.icon}
                </div>
                <p className="text-sm lg:text-lg font-poppins font-bold">{item.text}</p>
              </div>
            );
          })}
        </div>
        <button
  className="absolute left-4 lg:left-20 bg-[#182073] text-white w-10 h-10 rounded-full flex items-center justify-center z-50"
  onClick={handlePrev}
>
  ❮
</button>
<button
  className="absolute right-4 lg:right-20 bg-[#182073] text-white w-10 h-10 rounded-full flex items-center justify-center z-50"
  onClick={handleNext}
>
  ❯
</button>

      </div>
    </div>
  );
};

export default Testi;
