"use client";
import { useEffect, useState } from "react";
import React from "react";
import p1 from "../assests/models/Slide1.PNG";
import p2 from "../assests/models/Slide2.PNG";
import p3 from "../assests/models/Slide3.PNG";
import p4 from "../assests/models/Slide4.PNG";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourse } from "../Redux/action/Course.js";

const Course = () => {
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);
  const dispatch = useDispatch();
  
  // Access the entire course state
  const courseState = useSelector((state) => state?.course);
  const courses = courseState?.courses; // Access the courses array

  // Fetch the courses when the component mounts
  useEffect(() => {
    dispatch(fetchCourse());
  }, [dispatch]);

  // Toggle function for accordion
  const toggleAccordion = (index) => {
    setOpenAccordionIndex(openAccordionIndex === index ? null : index);
  };

  return (
    <div className="p-4">
      <div>
        {courses?.map((course, courseIdx) => (
          <div key={courseIdx}>
            {course?.Curriculum?.map((item, idx) => (
              <div key={idx}>
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left bg-gray-100 my-2 p-2 mt-4 rounded-md hover:bg-gray-200 focus:outline-none flex items-center justify-between"
                >
                  <span>Module-{idx + 1}: {item.title}</span>
                  <span className="text-[#182073]">
                    {openAccordionIndex === idx ? "▲" : "▼"}
                  </span>
                </button>

                {openAccordionIndex === idx && (
                  <div className={`mt-4 gap-3 ${item.title === "INTRODUCTION" ? "grid grid-cols-1" : "grid grid-cols-1 md:grid-cols-2"}`}>
                    <div className="bg-white border border-gray-300 p-4 shadow-md rounded-md">
                      <ul className="list-disc space-y-2 px-1">
                        {item.subTopics && (
                          (Array.isArray(item.subTopics)
                            ? item.subTopics
                            : item.subTopics.split(',')
                          ).map((subTopic, subIdx) => (
                            <li key={subIdx} className="text-lg font-semibold font-poppins">
                              {subTopic.trim()}
                            </li>
                          ))
                        )}
                      </ul>
                    </div>

                    {/* Conditionally render the images if the title is not "Introduction" */}
                    {item.title !== "INTRODUCTION" && (
                      <div>
                        <h1 className="py-4 text-3xl text-[#182073] font-poppins underline">
                          Projects:
                        </h1>
                        <div className="grid grid-cols-1 gap-4">
                          <div className="grid grid-cols-2 gap-4">
                            <Image
                              src={p1} 
                              alt="Project Image 1"
                              className="w-full h-[200px] object-cover"
                            />
                            <Image
                              src={p2} 
                              alt="Project Image 2"
                              className="w-full h-[200px] object-cover"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4 mt-4">
                            <Image
                              src={p3} 
                              alt="Project Image 3"
                              className="w-full h-[200px] object-cover"
                            />
                            <Image
                              src={p4} 
                              alt="Project Image 4"
                              className="w-full h-[200px] object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Course;
