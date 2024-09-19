import { useState } from "react";
import React from "react";

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

  const toggleAccordion = () => {
    setOpenAccordionIndex(openAccordionIndex === 0 ? null : 0);
  };

  return (
    <div>
      <button
        onClick={toggleAccordion}
        className="w-full text-left bg-gray-200 my-2 p-2 rounded-md hover:bg-gray-300 focus:outline-none flex items-center justify-between"
      >
        <span>{openAccordionIndex === 0 ? "Curriculum" : "Curriculum"}</span>
        <span>{openAccordionIndex === 0 ? "▲" : "▼"}</span>
      </button>
      {openAccordionIndex === 0 && (
        <ul className="list-disc pl-5 mt-2 border border-gray-300">
          {course.map((item, idx) => (
            <li key={idx} className="py-2">
              <h1 className="font-bold text-2xl">Module-{idx + 1}: {item.title}</h1>
              <ul className="list-disc pl-5 mt-1">
                {item.subTopics.map((subTopic, subIdx) => (
                  <li key={subIdx} className="py-1 text-lg">{subTopic}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Course;