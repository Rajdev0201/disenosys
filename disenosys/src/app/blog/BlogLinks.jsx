"use client"

import React, { useEffect} from "react";
import { getBlog } from "../Redux/action/Portfolio";
import { useDispatch, useSelector } from "react-redux";

  const BlogLinks = ({ onSelectBlog }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.blog)

  useEffect(() => {
  dispatch(getBlog())
  },[dispatch])

  return (
    <div className="p-6 bg-gray-50 shadow-md rounded-md">
      <h2 className="text-2xl font-poppins font-semibold text-gray-800 mb-4">Trending Now</h2>
      <ul className="space-y-3">
        {data?.data?.map((link, index) => (
            <li
            key={index}
            onClick={() => onSelectBlog(link)}
            className="text-blue-600 hover:cursor-pointer hover:underline"
          >
            {link?.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogLinks;
