"use client"

import React, { useState, useEffect } from "react";
import { FaLinkedin } from "react-icons/fa";

const ResultPage = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    setShowPopup(false);
    alert("You chose to share your score!");
    // Additional logic for "Continue"
  };

  const handleCancel = () => {
    setShowPopup(false);
    alert("You canceled sharing your score.");
    // Additional logic for "Cancel"
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Result Page</h1>
        <p className="text-gray-600 text-lg">
          Your results are being displayed here.
        </p>
      </div>

      <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-5 rounded-md shadow-md max-w-sm w-full">
                          <h2 className="text-lg font-bold mb-4">
                          Just One More Step Ahead to Show the World You Are an Improved Design Engineer!
                          </h2>
                          <div className="flex justify-center">
                          <button
                         
                            className="bg-[#182073] gap-2 flex items-center hover:bg-blue-700 text-white font-medium py-2 mt-4 px-4 rounded-md"
                          >
                            Share Post<FaLinkedin className="w-5 h-5" />
                          </button>
                          </div>
                        </div>
                      </div>
    </div>
  );
};

export default ResultPage;
