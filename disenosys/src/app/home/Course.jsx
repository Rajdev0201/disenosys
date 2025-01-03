"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { fetchCourse } from "../Redux/action/Course.js";
import {addProductToCart} from "../Redux/action/addToCart.js"
import Link from 'next/link.js';
import { useRouter } from 'next/navigation';
import { payment } from '../Redux/action/Payment.js';

const Course = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const courses = useSelector((state) => state?.course?.courses);
  // console.log(courses)
  const cart = useSelector((state) => state?.cart);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const router = useRouter();
  const pay = useSelector((state) => state.payment);

  useEffect(() => {
    dispatch(fetchCourse());
  }, [dispatch]);


  // const filteredCourses = selectedCategory === "All"
  //   ? courses
  //   : courses?.filter(course => course?.category?.includes(selectedCategory));

  // const handleCategoryChange = (category) => {
  //   setSelectedCategory(category);
  // };


  const specificCourses = [
    "CATIA Foundations for Automative Designers",
    "Advanced CATIA Surface",
    "Fundamentals Of BIW in Automotive Design",
    "Fundamentals of Plastic Trims",
    "Solid Model Remastering",
    "Automotive B-Pillar Assembly",
    "Bracket And Reinforcement",
    "Automotive Close Volume & Feature Creation",
    "Surface Remastering for Automotive Designers"
  ];

  const filteredCourses = courses?.filter(course => {
    const isInSpecificCourses = specificCourses.includes(course?.courseName);
    const isCategoryMatch = selectedCategory === "All" || course?.category?.includes(selectedCategory);
    return isInSpecificCourses && isCategoryMatch;
  });

   
  const handleCategoryChange = (category) => {
    
      setSelectedCategory(category); 
  };

  useEffect(() => {
    dispatch(payment());
  }, [dispatch]);

  const paidCourses = pay?.data
  ?.filter((item) => item?.customerDetails?.name === user?.user?.user?.userName)
  ?.flatMap((item) => item?.lineItems?.map((course) => course?.name)) || [];


const addCart = (course) => {
  if (user?.user?.user?._id) {
    if (paidCourses.includes(course.courseName)) {
      alert("You have already paid for this course.");
      return; // Exit the function to prevent adding it again
    }

    // If not paid, add to cart
    dispatch(
      addProductToCart({
        courseId: course?._id,
        name: course?.courseName,
        price: course?.price,
        quantity: 1,
        img: course?.imagePath,
        userName: user?.user?.user?.userName,
      })
    );
  } else {
    alert("Please sign in to your account.");
  }
};

  const getButtonClass = (category) => {
    return selectedCategory === category
      ? 'text-white font-josefin font-bold text-xl px-8 rounded shadow-lg py-2 bg-[#182073] hover:bg-blue-800'
      : ' font-josefin font-bold text-xl px-8 rounded shadow-lg text-[#182073] border border-gray-200 py-2 bg-white hover:bg-blue-100';
  };

  const goToDescriptionPage = (courseId) => {
    router.push(`/description?courseId=${courseId}`);
  };


  return (
    <div className='mt-6 hover:cursor-pointer'>
      <div className='text-center mb-12'>
        <h1 className='font-bold font-poppins text-[#182073] text-xl lg:text-5xl'>
          All <span className='text-[#182073]'>Online</span> Course
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6 bg-white">
        <div className='col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8'>
          {filteredCourses?.map((course) => (
            
            <div key={course?._id} className="flex flex-col justify-between bg-white rounded-lg shadow-lg overflow-hidden p-4 border border-gray-200" >
        
              <div className="relative w-full h-48 mb-4">
                <img
                  src={course?.imagePath}
                  alt={course?.courseName}
                  className="object-cover w-full h-full"
                  onClick={() => goToDescriptionPage(course?._id)}
                />
              </div>
              <div className="flex flex-col flex-grow" >
                <div className="font-bold text-xl mb-2 text-center" onClick={() => goToDescriptionPage(course?._id)}>{course?.courseName}</div>
                <p className="text-gray-500 font-medium text-md text-base mb-4 mt-2">{course?.description}</p>
                <div className="flex justify-between items-center mt-auto">
                  <button className='bg-[#182073] text-white px-1 py-1 lg:px-4 lg:py-2 rounded hover:bg-blue-400' onClick={() => addCart(course)}>
                    Add to Cart
                  </button>
                  <span className="text-base font-semibold text-[#182073] flex items-center" onClick={() => goToDescriptionPage(course?._id)}>More Info</span>
                </div>
              </div>
        
            </div>
          ))}
        </div>
        <div className='col-span-1 md:col-span-1 lg:col-span-1'>
          <div className='flex flex-col space-y-6 sticky top-32'>
            <button
              className={getButtonClass("All")}
              onClick={() => handleCategoryChange("All")}
            >
              All Courses
            </button>
            <button
              className={getButtonClass("Plastic Trims")}
              onClick={() => handleCategoryChange("Plastic Trims")}
            >
              Plastic Trims
            </button>
            <button
              className={getButtonClass("Mechatronics Engineering")}
              onClick={() => handleCategoryChange("Mechatronics Engineering")}
            >
              Mechatronics Engineering
            </button>
            <button
              className={getButtonClass("Mechanical Engineering")}
              onClick={() => handleCategoryChange("Mechanical Engineering")}
            >
              Mechanical Engineering
            </button>
            <button
              className={getButtonClass("BIW")}
              onClick={() => handleCategoryChange("BIW")}
            >
              BIW
            </button>
            <button
              className={getButtonClass("Automobile Engineering")}
              onClick={() => handleCategoryChange("Automobile Engineering")}
            >
              Automobile Engineering
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Course;
