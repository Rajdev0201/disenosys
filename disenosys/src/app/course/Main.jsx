"use client"
import { useState } from "react";
import Course from "../home/Course";
import plastic from "../assests/profile/c-1.jpg";
import biw from "../assests/profile/biw-c.jpg";
import ma from "../assests/profile/c3.jpg"
import Image from "next/image";
import { useRouter } from "next/navigation";
const CoursePopup = () => {
    const [activeTab, setActiveTab] = useState("pg");
    const router =  useRouter();

    const pgCourses = [
      {
        title: "PG Diploma in Plastic Trims Design",
        description:
          "This program equips students with expertise in automotive plastic trims, covering design, material selection, and manufacturing. Industry-focused training ensures career readiness.",
        image: plastic,
        name: "PG Diploma Plastic Trims Design",
      },
      {
        title: "PG Diploma in Plastic BIW Design",
        description:
          "Equips students with essential skills in automotive body structure design, material selection, and manufacturing processes. With expert-led training and hands-on projects, it prepares professionals for industry-ready roles.",
        image: biw,
        name:"PG Diploma Plastic BIW Design",
      },
      {
        title: "Masters in Automotive Body Design",
        description:
          "This program provides advanced expertise in automotive body design, covering BIW, plastic trims, and aerodynamics. Industry-driven training ensures skill development for a successful career.",
        image: ma,
        name:"Masters in Automotive Plastic Body Design",
      },
    ];

    
    const pg = (name) => {
        router.push(`/placement?courseName=${name}`);
      };
    
  
    // const certCourses = [
    //   { title: "Automotive CAD Certification", image: "/cert1.jpg" },
    //   { title: "Plastic Trim Engineering", image: "/cert2.jpg" },
    //   { title: "Interior Design for Cars", image: "/cert3.jpg" },
    //   { title: "Sheet Metal Design", image: "/cert4.jpg" },
    //   { title: "Body Design Essentials", image: "/cert5.jpg" },
    //   { title: "Manufacturing Process Certification", image: "/cert6.jpg" },
    //   { title: "Vehicle Safety Design", image: "/cert7.jpg" },
    //   { title: "Structural Analysis & Simulation", image: "/cert8.jpg" },
    //   { title: "Advanced 3D Modeling", image: "/cert9.jpg" },
    // ];
  
    return (
      <div className="lg:p-6">
        <div className="flex border-b-4 border-[#0d1039]">
          <button
            className={`w-1/2 p-2 lg:p-3 text-center font-semibold ${
              activeTab === "pg" ? "bg-blue-300" : "bg-gray-100"
            }`}
            onClick={() => setActiveTab("pg")}
          >
            PG Programmes
          </button>
          <button
            className={`w-1/2 p-2 lg:p-3  text-center font-semibold ${
              activeTab === "cert" ? "bg-blue-300" : "bg-gray-100"
            }`}
            onClick={() => setActiveTab("cert")}
          >
            Certification Courses
          </button>
        </div>
  
        {/* PG Programmes - Zigzag Layout */}
        {activeTab === "pg" && (
          <div className="mt-6 space-y-8">
            {pgCourses.map((course, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-start justify-start ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center bg-white  rounded-lg p-6 mt-12`}
              >
                {/* Image */}
                <div className="w-full md:w-1/2">
                  <Image
                    src={course.image}
                    alt={course.title}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </div>
  
                {/* Content */}
                <div className="w-full md:w-1/2 px-4">
                <div className=""> 
                  <h2 className="text-lg lg:text-4xl text-center lg:text-start mt-2 lg:mt-0 font-semibold text-[#0d1039] font-garet ">
                    {course.title}
                  </h2>
                  </div>
                  <p className="text-gray-600 font-garet mt-2">{course.description}</p>
                  <button className="lg:mt-48 mt-4 px-6 py-2 bg-[#0d1039] text-white rounded-md hover:bg-blue-700 font-garet" onClick={() => pg(course.name)}>
                    Apply Now →
                  </button>
                </div>
               
              </div>
              
            ))}
          </div>
        )}
  
        {/* Certification Courses - Grid Layout */}
        {activeTab === "cert" && (
          <div className="mt-2 grid grid-cols-1 gap-6">
            {/* {certCourses.map((course, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h3 className="mt-4 text-lg font-semibold text-center text-blue-900">
                  {course.title}
                </h3>
                <button className="mt-3 px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-700">
                  Apply Now →
                </button>
              </div>
            ))} */}
            <Course name=""/>
          </div>
        )}
      </div>
    );
  }

export default CoursePopup;