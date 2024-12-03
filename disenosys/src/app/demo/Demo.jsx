"use client"

import React, { useState, useEffect } from "react";

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

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Share Your Score
            </h2>
            <p className="text-gray-600 mb-6">
              Do you want to share your score with your peers?
            </p>
            <div className="flex justify-between">
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                onClick={handleContinue}
              >
                Continue
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400 transition"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultPage;
