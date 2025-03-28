"use client";
import { useEffect, useState, useRef } from "react";
import React from "react";
import p1 from "../../assests/models/Slide1.PNG";
import p2 from "../../assests/models/Slide2.PNG";
import p3 from "../../assests/models/Slide3.PNG";
import p4 from "../../assests/models/Slide4.PNG";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourse } from "../../Redux/action/Course.js";
import { useParams, useSearchParams } from "next/navigation";

const Course = () => {
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);
  const dispatch = useDispatch();
  const courseRefs = useRef([]);
  const search = useSearchParams();
  const {slug} = useParams();
  console.log(slug)

  const courseState = useSelector((state) => state?.course);
  const courses = courseState?.courses;
  

  useEffect(() => {
    dispatch(fetchCourse());
  }, [dispatch]);

  const toggleAccordion = (index) => {
    if (openAccordionIndex === index) {
      setOpenAccordionIndex(null); // Close the accordion if it's already open
    } else {
      setOpenAccordionIndex(index); // Open the clicked accordion
  
      setTimeout(() => {
        const targetElement = courseRefs.current[index];
  
        if (targetElement) {
          // Scroll the section into view with smooth behavior
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
  
          // Scroll to the first subtopic after the section is in view
          const firstSubtopic = targetElement.querySelector("li"); // Adjust to target the first subtopic
          if (firstSubtopic) {
            const offset = firstSubtopic.getBoundingClientRect().top; // Get the position of the first subtopic
            const scrollPosition = window.scrollY + offset - 200; // Adjust this value (-80) for the desired offset
            
            window.scrollTo({
              top: scrollPosition,
              behavior: "smooth",
            });
          }
        }
      }, 100);
    }
  };
  

  return (
    <div className="py-4">
      <div>
        {/* {courses?.map((course, courseIdx) => ( */}
        {courses
          ?.filter((course) => course.courseName === decodeURIComponent(slug))
          ?.map((course, courseIdx) => (
          <div key={courseIdx}>
            {course?.Curriculum?.map((item, idx) => (
              <div key={idx} ref={(el) => (courseRefs.current[idx] = el)}>
                {!item.title ? (
                ""
                ):(
                  <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left bg-gray-100 my-2 p-2 mt-4 rounded-md hover:bg-gray-200 focus:outline-none flex items-center justify-between"
                >
                  <span className="font-bold text-lg font-poppins">Module-{idx + 1}: {item.title}</span>
                  <span className="text-[#182073]">
                    {openAccordionIndex === idx ? "▲" : "▼"}
                  </span>
                </button>
                )
                 }
                {openAccordionIndex === idx && (
                  <div className={`mt-4 gap-3 ${item.title === "INTRODUCTION" ? "grid grid-cols-1" : "grid grid-cols-1 md:grid-cols-2"}`}>
                    <div className="bg-white border border-gray-300 p-4 shadow-md rounded-md">
                    <ul className="list-disc space-y-2 px-1">
                        {item.subTopics && (
                          (Array.isArray(item.subTopics)
                            ? item.subTopics
                            : item.subTopics.split(',')
                          ).map((subTopic, subIdx) => (
                            <li key={subIdx} className="text-md font-semibold font-poppins">
                              {subIdx === 0 ? <span className="">{subTopic.trim()}</span> : subTopic.trim()}
                            </li>
                          ))
                        )}
                      </ul>
                    </div>

                    {item.title !== "INTRODUCTION" && (
                      <div>
                        <h1 className="py-4 text-xl text-dark-200 font-poppins underline">
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
