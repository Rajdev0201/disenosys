"use client";
import React, { useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { FaSort, FaFilter } from "react-icons/fa";
import "./Description.css";

export const Review = ({ Review }) => {
  const [search, setSearch] = useState("");

  const filteredReviews = Review.filter((review) =>
    review.name.toLowerCase().includes(search.toLowerCase()) ||
    review.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div>
        <div className="px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28 flex flex-col md:flex-row justify-between items-center font-garet mb-12">
          {/* Search Input */}
          <div>
            <div className="border border-gray-400 w-full md:w-96 p-1 inline-flex rounded-lg my-2 md:my-4">
              <CiSearch className="mt-1 text-gray-400" size={25} />
              <input
                type="text"
                className="w-full p-1 outline-none text-gray-400"
                placeholder="Search student review"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-4 md:mt-0">
            <div className="border border-gray-400 p-1 font-poppins inline-flex rounded-lg">
              <FaFilter className="mt-2 text-gray-400" size={18} />
              <h1 className="pt-1 text-gray-400 font-poppins">5 Star Reviews</h1>
              <FaSort className="mt-1 ml-2 text-gray-400" size={20} />
            </div>
          </div> */}
        </div>
      </div>

      {/* Review List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 font-garet mb-28">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review, index) => (
            <div key={index} className="px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28 ">
              <div className="flex justify-between">
                <div className="inline-flex gap-2">
                  <RxAvatar size={40} className="mt-0"/>
                  <div className="flex flex-col">
                  <p className="text-gray-900 text-lg md:text-xl font-medium">
                    {review.name}
                  </p>
                  <p className="text-sm font-bold">
                    {review.createdAt
                      ? new Date(review.createdAt).toLocaleDateString()
                      : "N/A"}
                      </p>
                      </div>
                </div>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }).map((_, i) =>
                    i < review.rating ? (
                      <AiFillStar key={i} className="text-yellow-500" />
                    ) : (
                      <AiOutlineStar key={i} className="text-gray-300" />
                    )
                  )}
                </div>
              </div>
              <div className="mt-2 rounded-md border-2 bg-blue-300 shadow-inner bg-white p-2">
                <p className="text-gray-600">{review.message}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center w-full">
            No reviews found for {search}.
          </p>
        )}
      </div>
    </>
  );
};
