import React from "react";

export const Rating = () => {
  const ratings = [
    {
      value: "4.85",
    },
  ];

  const reviewItems = [
    { name: "Design", percentage: 90 },
    { name: "Faculty", percentage: 90 },
    { name: "Session", percentage: 90 },
  ];

  const reviewsbar = [
    { name: "Affordable", percentage: 90 },
    { name: "Teaching", percentage: 90 },
  ];

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-28 my-3 border-b border-gray-300 mb-3">
      <h1 className="font-bold capitalize text-xl sm:text-2xl">User Reviews</h1>
      {ratings.map((rating, index) => (
        <div
          key={index}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-9 my-3"
        >
          <div className="col-span-1 border-r border-gray-300 pr-4 sm:pr-6">
            <button className="bg-green-500 px-4 py-2 rounded text-white mb-4 mt-4 text-sm sm:text-base">
              Very Good
            </button>
            <h1 className="text-2xl sm:text-3xl font-semibold pb-3">
              <span className="text-4xl sm:text-6xl font-bold pt-12">
                {rating.value}
              </span>{" "}
              out of 5
            </h1>
            <h1 className="font-semibold text-gray-500 text-base sm:text-lg">
              120 Ratings
            </h1>
          </div>

          <div className=" lg:col-span-1 space-y-2">
            {reviewItems.map((item, idx) => (
              <div key={idx} className="flex items-center ">
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
          <div className="col-span-1  space-y-2">
            {reviewsbar.map((item, idx) => (
              <div key={idx} className="flex items-center ">
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
      ))}
    </div>
  );
};