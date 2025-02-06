"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { courseld } from "../Redux/action/Course";
import { AiOutlineClose } from "react-icons/ai";

const History = () => {
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const course = useSelector((state) => state.courseLD);
  console.log(course);

  useEffect(() => {
    dispatch(courseld());
  }, [dispatch]);

  return (
    <div>
      <h2 className="text-[#0d1039] font-medium text-4xl text-center font-garet mb-1 mt-5">
        Teachers
      </h2>
      <div className="flex flex-col md:flex-row justify-between items-center px-12 py-20 gap-4  font-garet ">
        <div className="flex items-center">
          <div className="flex items-center bg-[#0d1039] justify-center w-10  rounded-tl-lg rounded-bl-lg border-r border-gray-200 p-3">
            <svg
              viewBox="0 0 20 20"
              aria-hidden="true"
              className="pointer-events-none w-5  fill-white"
            >
              <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
            </svg>
          </div>
          <input
            type="text"
            className="bg-gray-300 pl-2 text-base font-medium outline-0 p-2  rounded-tr-lg rounded-br-lg "
            placeholder="Search..."
            // value={search}
            // onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          className="bg-[#0d1039] text-white px-4 py-2 rounded"
          onClick={() => setShowPopup(true)}
        >
          Add Teacher
        </button>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm w-full z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative animate-slide-up ml-44 ">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setShowPopup(false)}
            >
              <AiOutlineClose size={20} />
            </button>

            <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
              Add Teachers
            </h2>

            <form className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Enter FullName"
                required
                className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                //   onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                required
                className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                //   onChange={handleChange}
              />

              <input
                type="number"
                name="phone"
                placeholder="Enter Number"
                required
                className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                //   onChange={handleChange}
              />

              <input
                type="text"
                name="designation"
                placeholder="Enter designation"
                required
                className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                //   onChange={handleChange}
              />

              <select className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="" disabled>
                  Select Subject
                </option>
                {course?.data?.map((item, index) => (
                  <option key={item._id} value={item.course}>
                    {item.course}
                  </option>
                ))}
              </select>

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#182073] text-white px-4 py-2 rounded-md hover:bg-[#0f165a] transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
