"use client"
import React from "react";
import { useEffect } from "react";
import "../home/Home.css";
const Learn = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-visible");
          } else {
            entry.target.classList.remove("animate-visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => observer.observe(box));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen mt-12">
      <div className="relative flex flex-col items-center">
        <div className="absolute h-full w-1 bg-[#182073] rounded-full flex flex-col items-center">
          {/* Top Rounded Shape */}
          <div className="w-4 h-4 bg-[#057FE3] rounded-full -mt-2"></div>
          {/* Middle Rounded Shape */}
          <div className="w-4 h-4 bg-[#057FE3] rounded-full mt-auto mb-auto"></div>
          {/* Bottom Rounded Shape */}
          <div className="w-4 h-4 bg-[#057FE3] rounded-full mt-2"></div>
        </div>

        {/* Box 1 */}
        <div className="box grid grid-cols-2 gap-28 items-center mb-10 transition-transform duration-700 opacity-0 translate-y-10">
          <div className="bg-white p-6 shadow-lg rounded-lg w-[400px] h-[200px]">
            <h2 className="text-lg font-bold">The Powerful Client Sniper Technique</h2>
            <p>
              Find your exact potential clients on LinkedIn without spending a
              dollar in ads.
            </p>
          </div>
        </div>

        {/* Box 2 */}
        <div className="box grid grid-cols-2 gap-28 items-center mb-10 transition-transform duration-700 opacity-0 translate-y-10">
          <div className="bg-white p-6 shadow-lg rounded-lg col-start-2 w-[400px] h-[200px]">
            <h2 className="text-lg font-bold">The 100M Content Formula</h2>
            <p>
              Step by step LinkedIn content writing syntax to drive 4X
              engagement.
            </p>
          </div>
        </div>

        {/* Box 3 */}
        <div className="box grid grid-cols-2 gap-28 items-center mb-10 transition-transform duration-700 opacity-0 translate-y-10">
          <div className="bg-white p-6 shadow-lg rounded-lg w-[400px] h-[200px]">
            <h2 className="text-lg font-bold">The Powerful Client Sniper Technique</h2>
            <p>
              Find your exact potential clients on LinkedIn without spending a
              dollar in ads.
            </p>
          </div>
        </div>

        {/* Box 4 */}
        <div className="box grid grid-cols-2 gap-28 items-center mb-10 transition-transform duration-700 opacity-0 translate-y-10">
          <div className="bg-white p-6 shadow-lg rounded-lg col-start-2 w-[400px] h-[200px]">
            <h2 className="text-lg font-bold">The 100M Content Formula</h2>
            <p>
              Step by step LinkedIn content writing syntax to drive 4X
              engagement.
            </p>
          </div>
        </div>

        {/* Box 5 */}
        <div className="box grid grid-cols-2 gap-28 items-center mb-10 transition-transform duration-700 opacity-0 translate-y-10">
          <div className="bg-white p-6 shadow-lg rounded-lg w-[400px] h-[200px]">
            <h2 className="text-lg font-bold">The Powerful Client Sniper Technique</h2>
            <p>
              Find your exact potential clients on LinkedIn without spending a
              dollar in ads.
            </p>
          </div>
        </div>

        {/* Box 6 */}
        <div className="box grid grid-cols-2 gap-28 items-center mb-10 transition-transform duration-700 opacity-0 translate-y-10">
          <div className="bg-white p-6 shadow-lg rounded-lg col-start-2 w-[400px] h-[200px]">
            <h2 className="text-lg font-bold">The 100M Content Formula</h2>
            <p>
              Step by step LinkedIn content writing syntax to drive 4X
              engagement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;


