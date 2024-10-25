"use client"
import React from 'react';
// import "../Navbar/Navbar.css"
export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
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
    <div className="flex space-x-3 mt-5">
      <button
        onClick={handlePrevious}
        className={`flex items-center px-4 py-2 mx-1 text-white bg-[#182073] box-shadow rounded-md ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600 hover:text-white'
          }`}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {[...Array(totalPages).keys()].map((page) => (
        <button
          key={page + 1}
          onClick={() => onPageChange(page + 1)}
          className={`items-center px-4 py-2 mx-1 text-white font-bold transition-colors duration-300 transform bg-[#182073] rounded-md ${currentPage === page + 1 ? 'bg-green-600 text-white' : 'hover:bg-blue-600 hover:text-white'
            }`}
        >
          {page + 1}
        </button>
      ))}

      <button
        onClick={handleNext}
        className={`flex items-center px-4 py-2 mx-1 text-white transition-colors duration-300 transform bg-[#182073] box-shadow rounded-md ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600 hover:text-white'
          }`}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};
