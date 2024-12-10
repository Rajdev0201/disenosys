"use client";
import React, { useEffect } from "react";
import Profile from "./Profile";
import { getBlog } from "../Redux/action/Portfolio";
import { useDispatch, useSelector } from "react-redux";

const Banner = ({ selectedBlog }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.blog);
  console.log(data);

  useEffect(() => {
    dispatch(getBlog());
  }, [dispatch]);

  return (
    <div className="p-2 md:p-6 bg-white shadow-md rounded-md">
      <div className="flex flex-col px-4 md:px-8 lg:px-12">
        <img
          src={selectedBlog?.filePath}
          className="object-cover w-full h-56 sm:h-72 md:h-96 rounded shadow-md"
          alt={selectedBlog?.title || "Blog image"}
        />
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-poppins text-gray-800 mt-5">
          {selectedBlog?.title}
        </h1>

        <Profile name={selectedBlog?.name} designation={selectedBlog?.designation} />
        <span className="text-sm font-medium mt-1">
          {new Date(selectedBlog?.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          })}
        </span>

        <p
          className="mt-4 text-gray-600 text-sm sm:text-base md:text-lg"
          dangerouslySetInnerHTML={{ __html: selectedBlog?.description || "" }}
        />
      </div>
    </div>
  );
};

export default Banner;
