"use clinet"
import React from "react";

export const Rating = ({Review}) => {
 
  if (!Review || Review.length === 0) return <p>No reviews available.</p>;

  // const highestRating = Math.max(...Review.map((r) => r.rating));

  const likeCounts = Review.reduce((acc, curr) => {
    acc[curr.like] = (acc[curr.like] || 0) + 1; //dynamic key follow
    return acc;
  }, {});
  
  console.log(likeCounts)
  const totalReviews = Review.length;
  const totalRatingSum = Review.reduce((sum, r) => sum + Number(r.rating), 0);
  const totalRatingPercentage = (totalReviews > 0 ? (totalRatingSum / totalReviews) : 0).toFixed(1);
  const likePercentages = Object.keys(likeCounts).map((like) => ({
    name: like,
    percentage: ((likeCounts[like] / totalReviews) * 100).toFixed(1), 
  }));

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-28 my-3 border-b border-gray-400 mb-3 font-garet">
      <h1 className="font-bold capitalize text-xl sm:text-2xl">Student Reviews</h1>
   
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-9 my-3"
        >
          <div className="col-span-1 border-r border-gray-400 pr-4 sm:pr-6">
            {/* <button className="bg-green-500 px-4 py-2 rounded text-white mb-4 mt-4 text-sm sm:text-base">
              Very Good
            </button> */}
            <h1 className="text-2xl sm:text-3xl font-semibold pb-3">
          <span className="text-4xl sm:text-6xl font-bold pt-12 text-blue-500">
            {totalRatingPercentage}
          </span>
          <span className="px-1 text-blue-500 font-medium">out of 5</span>
        </h1>
        <h1 className="font-semibold text-gray-500 text-base sm:text-lg">
          {totalReviews} Ratings
        </h1>
          </div>

          <div className="grid grid-cols-1 space-y-2">
          {likePercentages.map((item, idx) => (
          <div key={idx} className="flex items-center">
            <span className="text-gray-700 font-medium text-sm sm:text-base">
              {item.name}
            </span>
            <div className="w-full h-3 sm:h-4 bg-gray-300 rounded-lg mx-4 sm:mx-6 my-2 sm:my-3">
              <div
                style={{ width: `${item.percentage}%` }}
                className="h-3 sm:h-4 bg-yellow-500 rounded-lg"
              ></div>
            </div>
            <span className="text-gray-700 font-medium text-sm sm:text-base">
              {item.percentage}%
            </span>
          </div>
        ))}
          </div>

        </div>
    </div>
  );
};