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
    <div className="p-2 md:p-6 bg-white shadow-md rounded-md font-garet">
      {selectedBlog && (
      <div className="flex flex-col px-4 md:px-8 lg:px-12">
        {selectedBlog?.filePath && (
          <>
        <img
          src={selectedBlog?.filePath}
          className="object-cover w-full h-56 sm:h-72 md:h-auto rounded shadow-md"
          alt={selectedBlog?.title || "Blog image"}
        />
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mt-5">
          {selectedBlog?.title}
        </h1>
        </>
        )}
        <Profile name={selectedBlog?.name} designation={selectedBlog?.designation} />
        <span className="text-sm font-medium mt-1">
          {new Date(selectedBlog?.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          })}
        </span>
        
        <p
  className="mt-4 text-gray-800 font-medium text-sm sm:text-base md:text-md"
  dangerouslySetInnerHTML={{
    __html: selectedBlog?.description
      ? selectedBlog.description
          .replace(/\n+/g, "<br/>") // Line breaks
          .replace(/<a\b(.*?)>/g, '<a$1 class="underline text-xl text-blue-500">') //link
          .replace(/<ul>/g, '<ul class="list-disc text-gray-800 pl-5">') // Bullet lists
          .replace(/<ol>/g, '<ol class="list-decimal text-gray-800 pl-5">') // Ordered lists
          .replace(/<li>/g, '<li class="mt-1">') // List items
          .replace(/<h1>/g, '<h1 class="text-3xl font-bold mt-4 mb-2">') // Heading 1
          .replace(/<h2>/g, '<h2 class="text-2xl font-semibold mt-4 mb-2">') // Heading 2
          .replace(/<h3>/g, '<h3 class="text-xl font-medium mt-3 mb-2">') // Heading 3
          .replace(/<strong>/g, '<strong class="font-bold">') // Bold
          .replace(/<em>/g, '<em class="italic">') // Italic
          .replace(/<u>/g, '<u class="underline">') // Underline
      : "",
  }}
></p>



      </div>
      )}
      
      {!selectedBlog && (
          <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Please Select the link and read the blog</p>
        </div>
      )}
    </div>
  );
};

export default Banner;
