import { useState } from "react";
import React from "react";

const Course = () => {
  const [openCurriculum, setOpenCurriculum] = useState(false);
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
      <button
        onClick={toggleCurriculum}
        className="w-full text-left bg-gray-200 my-2 p-2 rounded-md hover:bg-gray-300 focus:outline-none flex items-center justify-between"
      >
        <span>Course Curriculum</span>
        <span className="text-[#182073]">{openCurriculum ? "▲" : "▼"}</span>
      </button>

      {/* Display modules only if Curriculum is open */}
      {openCurriculum && (
        <div>
          {course.map((item, idx) => (
            <div key={idx}>
              {/* Button to toggle each module */}
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full text-left bg-gray-100 my-2 p-2 rounded-md hover:bg-gray-200 focus:outline-none flex items-center justify-between"
              >
                <span>Module-{idx + 1}: {item.title}</span>
                <span className="text-[#182073]">{openAccordionIndex === idx ? "▲" : "▼"}</span>
              </button>

              {/* Subtopics - displayed only if the module is open */}
              {openAccordionIndex === idx && (
                <ul className="list-disc text-[#182073] mt-2 border border-gray-300 p-6">
                  {item.subTopics.map((subTopic, subIdx) => (
                    <li key={subIdx} className="py-1 text-lg">
                      {subTopic}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Course;
