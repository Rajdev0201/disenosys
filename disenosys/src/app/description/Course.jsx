"use client"
import { useState } from "react";
import React from "react";
import p1 from "../assests/models/Slide1.PNG"
import p2 from "../assests/models/Slide2.PNG"
import p3 from "../assests/models/Slide3.PNG"
import p4 from "../assests/models/Slide4.PNG"
import Image from "next/image";
const Course = () => {

  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);

  const course = [
    {
      title: "Trim Mounting Bracket - L Shape",
      subTopics: [
        "Introduction to Trim Mounting Brackets",
        "Design Considerations",
        "L-Shape Variants",
        "Mounting Procedures",
      ],
    },
    {
      title: "Master Section Creation",
      subTopics: [
        "Understanding Master Sections",
        "Designing the Section",
        "Section Optimization",
        "Practical Examples",
      ],
    },
    {
      title: "Feature Creation and Parting Line",
      subTopics: [
        "Introduction to Features",
        "Parting Line Basics",
        "Advanced Feature Techniques",
        "Case Studies",
      ],
    },
    {
      title: "Draft Analysis and Assembly",
      subTopics: [
        "Draft Analysis Fundamentals",
        "Common Issues in Drafting",
        "Assembly Integration",
        "Best Practices",
      ],
    },
    {
      title: "2D Drawing and Detailing",
      subTopics: [
        "Introduction to 2D Drawing",
        "Detailing Techniques",
        "Dimensioning Standards",
        "Finalizing the Drawing",
      ],
    },
  ];

  const toggleAccordion = (index) => {
    setOpenAccordionIndex(openAccordionIndex === index ? null : index);
  };

  const toggleCurriculum = () => {
    setOpenCurriculum(!openCurriculum);
    setOpenAccordionIndex(null); // Reset module state when Curriculum is toggled
  };

  return (
    <div>
      {/* Curriculum button to toggle all modules */}
      {/* <button
        onClick={toggleCurriculum}
        className="w-full text-left bg-gray-200 my-2 p-2 rounded-md hover:bg-gray-300 focus:outline-none flex items-center justify-between"
      >
        <span>Curriculum</span>
        <span>{openCurriculum ? "▲" : "▼"}</span>
      </button> */}

      {/* Display modules only if Curriculum is open */}
     
        <div>
          {course.map((item, idx) => (
            <div key={idx}>
              {/* Button to toggle each module */}
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full text-left bg-gray-100 my-2 p-2 mt-4 rounded-md hover:bg-gray-200 focus:outline-none flex items-center justify-between"
              >
                <span>Module-{idx + 1}: {item.title}</span>
                <span className="text-[#182073]">{openAccordionIndex === idx ? "▲" : "▼"}</span>
              </button>

              {/* Subtopics - displayed only if the module is open */}
              {openAccordionIndex === idx && (
                <ul className="list-disc pl-5 mt-2 border border-gray-300">
                  {item.subTopics.map((subTopic, subIdx) => (
                    <>
                    <li key={subIdx} className="py-1 text-lg">
                      {subTopic}
                    </li>
                   </>
                  ))}
                    <h1 className="py-2 px-3 text-lg text-[#182073] font-poppins underline ">
                      Projects:
                   </h1>

                  <div className="grid grid-cols-4 gap-5 p-3">
                      <Image src={p1} alt="img-1"/>
                      <Image src={p2} alt="img-2"/>
                      <Image src={p3} alt="img-3"/>
                      <Image src={p4} alt="img-4"/>
                  </div>
                </ul>
              )}
            </div>
          ))}
        </div>
    </div>
  );
};

export default Course;
