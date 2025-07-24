"use client";
import React from "react";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pagesPerGroup = 30; 
  const currentGroup = Math.ceil(currentPage / pagesPerGroup); 
  const startPage = (currentGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };


  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex space-x-3 mt-5 mb-24">
      <button
        onClick={handlePrevious}
        className={`flex items-center px-4 py-2 mx-1 text-white bg-[#182073] rounded-md ${
          currentPage === 1 ? "cursor-not-allowed opacity-50" : "hover:bg-blue-600 hover:text-white"
        }`}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 mx-1 text-white font-bold transition-colors duration-300 transform bg-[#182073] rounded-md ${
            currentPage === page ? "bg-green-600 text-white" : "hover:bg-blue-600 hover:text-white"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={handleNext}
        className={`flex items-center px-4 py-2 mx-1 text-white bg-[#182073] rounded-md ${
          currentPage === totalPages ? "cursor-not-allowed opacity-50" : "hover:bg-blue-600 hover:text-white"
        }`}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};
