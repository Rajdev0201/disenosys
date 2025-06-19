"use client";
import { useState } from "react";
import Banner from "./Banner";
import BlogLinks from "./BlogLinks";

export default function BlogPageClient({ blogs }) {
  const [selectedBlog, setSelectedBlog] = useState(blogs?.[0] || null);

  const handleSelectBlog = (blog) => {
    setSelectedBlog(blog);
  };

  return (
    <div className="flex flex-col mt-16 lg:mt-32 lg:flex-row gap-8 px-4 sm:px-6 lg:px-24 py-6 bg-gray-50">
      <div className="lg:w-2/3 w-full order-2 lg:order-1 sticky lg:top-28 lg:left-0 lg:overflow-y-auto lg:h-screen">
        <Banner selectedBlog={selectedBlog} />
      </div>
      <div className="lg:w-1/3 w-full order-1 lg:order-2 lg:sticky top-28 lg:h-screen lg:overflow-y-auto">
        <BlogLinks onSelectBlog={handleSelectBlog} blogs={blogs} />
      </div>
    </div>
  );
}
