"use client";
import { useState } from "react";
import React from "react";
import p1 from "../assests/models/Slide1.PNG";
import p2 from "../assests/models/Slide2.PNG";
import p3 from "../assests/models/Slide3.PNG";
import p4 from "../assests/models/Slide4.PNG";
import Image from "next/image";

const Course = () => {
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);

  const course = [
    {
      title: "INTRODUCTION",
      subTopics: [
        "Learn CATIA V5 basics: parametric model- ing, Ul navigation, file management, shape creation/editing using profiles, planes, axes, and tools.",
      ],
      showProjects: false,
    },
    {
      title: "SKETCHER",
      subTopics: [
        "Become proficient in CATIA V5 sketching: planes, axes, corner chamfers, constraints, 3D projection, and transformations across various toolsets.",
      ],
      P1: p1,
      P2: p2,
      P3: p3,
      P4: p4,
      showProjects: true,
    },
    {
      title: "PART DESIGN",
      subTopics: [
        "Master CATIA V5 part Modeling: body, shaft, patterns, fillets, advanced features, materials, rendering, and efficient manipulation techniques like copy-paste and parameters.",
      ],
      P1: p1,
      P2: p2,
      P3: p3,
      P4: p4,
      showProjects: true,
    },
    {
      title: "ASSEMBLY DESIGN",
      subTopics: [
        "Excel in CATIA V5 assembly: components, constraints, sub-assemblies, clash prevention, tree management, replacements, numbering, multi-instantiation for efficient work.",
      ],
      P1: p1,
      P2: p2,
      P3: p3,
      P4: p4,
      showProjects: true,
    },
    {
      title: "DETAILING",
      subTopics: [
        "Gain CATIA V5 drafting skills: view creation, annotation, dimensioning, toler- ancing, toolbar usage, frame/title block insertion for precise engineering drawings.",
      ],
      P1: p1,
      P2: p2,
      P3: p3,
      P4: p4,
      showProjects: true,
    },
  ];

  const toggleAccordion = (index) => {
    setOpenAccordionIndex(openAccordionIndex === index ? null : index);
  };

  return (
    <div className="p-4">
      <div>
        {course.map((item, idx) => (
          <div key={idx}>
    
            <button
              onClick={() => toggleAccordion(idx)}
              className="w-full text-left bg-gray-100 my-2 p-2 mt-4 rounded-md hover:bg-gray-200 focus:outline-none flex items-center justify-between"
            >
              <span>Module-{idx + 1}: {item.title}</span>
              <span className="text-[#182073]">{openAccordionIndex === idx ? "▲" : "▼"}</span>
            </button>


            {openAccordionIndex === idx && (
              <ul className="p-8 pl-5 mt-2 border border-gray-300 p-3 shadow-lg rounded-md bg-white">
                {item.subTopics.map((subTopic, subIdx) => (
                  <li key={subIdx} className="py-1 text-lg font-semibold font-poppins">
                    {subTopic}
                  </li>
                ))}


                {item.showProjects && (
                  <>
                    <h1 className="py-8 text-3xl text-[#182073] font-poppins underline">
                      Projects:
                    </h1>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-3">
                      <Image src={item.P1} alt="img-1" className="w-full h-auto object-cover"/>
                      <Image src={item.P2} alt="img-2" className="w-full h-auto object-cover"/>
                      <Image src={item.P3} alt="img-3" className="w-full h-auto object-cover"/>
                      <Image src={item.P4} alt="img-4" className="w-full h-auto object-cover"/>
                    </div>
                  </>
                )}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Course;
