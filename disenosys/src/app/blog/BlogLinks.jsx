"use client";
import React, { useState } from "react";

const BlogLinks = ({ onSelectBlog, blogs }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const handleSelectBlog = (link, index) => {
    setActiveIndex(index);
    onSelectBlog(link);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md font-garet">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Trending Now</h2>
      <ul className="space-y-3">
        {blogs?.data?.map((link, index) => (
          <li
            key={index}
            onClick={() => handleSelectBlog(link, index)}
            className={`text-blue-600 hover:cursor-pointer hover:underline ${
              activeIndex === index ? "font-medium text-green-50 bg-blue-400 px-2 py-1 rounded-md shadow-inner" : ""
            }`}
          >
            {link?.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogLinks;
