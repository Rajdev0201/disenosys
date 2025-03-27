"use client";
import { useEffect, useState } from "react";
import Banner from "./Banner";
import BlogLinks from "./BlogLinks";
import { useDispatch, useSelector } from "react-redux";
import { getBlog } from "../Redux/action/Portfolio";
import Navbar from "../component/Navbar/Navbar";
import Footer from "../component/Navbar/Footer";
import Blink from "../component/Blink/BlinkingPopup";




export const metadata = () => { 
  return{
    title:"Blog"
  }
}

export default function BlogPage() {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog?.data || []);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    dispatch(getBlog());
  }, [dispatch]);

  useEffect(() => {
    if (blogs.length > 0) {
      setSelectedBlog(blogs[0]);
    }
  }, [blogs]);

  const handleSelectBlog = (blog) => {
    setSelectedBlog(blog);
  };

  return (
    <div className="bg-gray-50 ">
      <Blink/>
      <Navbar />
    <div className="flex flex-col mt-32 lg:flex-row gap-8 px-4 sm:px-6 lg:px-24 py-6 bg-gray-50 h-full">
      
      <div className="lg:w-2/3 w-full order-2 lg:order-1">
        <Banner selectedBlog={selectedBlog} />
      </div>

      <div className="lg:w-1/3 w-full order-1 lg:order-2">
        <BlogLinks onSelectBlog={handleSelectBlog} />
      </div>
    </div>
    <Footer/>
    </div>
  );
}
