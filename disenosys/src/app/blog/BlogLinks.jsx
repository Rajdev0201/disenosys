"use client"

import React, { useEffect, useState} from "react";
import { getBlog } from "../Redux/action/Portfolio";
import { useDispatch, useSelector } from "react-redux";

const BlogLinks = ({ onSelectBlog }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.blog);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    dispatch(getBlog());
  }, [dispatch]);

  const handleSelectBlog = (link, index) => {
    setActiveIndex(index);
    onSelectBlog(link); 
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md font-garet">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Trending Now
      </h2>
      <ul className="space-y-3">
        {data?.data?.map((link, index) => (
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

