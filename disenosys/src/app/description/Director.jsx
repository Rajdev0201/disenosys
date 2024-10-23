import React from 'react';
import Image from 'next/image'; 
 import pro from "../assests/profile/f.png";
import { useSelector } from 'react-redux';

const Director = () => {
  const courseState = useSelector((state) => state?.course);
  const courses = courseState?.courses;
  console.log(courses)
  const data = {
    detail: "An accomplished professional with over 16 years experience in BIW design and development of upper body and platform for passenger car and LCV. He has managed Vehicle product planning & engineering; leading and training a team of 10 senior leads. He is proficient in cost reduction, parts localization, and quality improvement of BIM.",
    detail1: "His international exposure includes three years tenure at Nissan Technical Centre, Japan (for Infiniti G sedan, Nissan Micra, Nissan Juke, Nissan Leaf) and six months at Nissan Technical Centre, UK (Renault Kadjar).",
    detail2: "He has strong exposure in assuring that all newly developed products have represented the maximum quality & reliability attainable by establishing effective design iterations, tests & corrective procedures.",
    detail3: "Highly skilled in full product/vehicle lifecycle activities including concept design, engineering change management, issues control & resolution, cost management, vendor management, manufacturing, and various other cross-functional activities.",
    detail4: "He excels at delivering multiple projects and managing complete engineering design operations in vehicle body design, involving requirement analysis, finalizing specifications, designing, prototype development, testing & development in compliance with Indian/Global regulations and as per any automotive client’s requirements.",
  };
  
  return (
    <div className="font-poppins mt-12">
      <h1 className="text-4xl pt-5 font-bold text-center text-[#182073] sm:text-left">
        Program Directors
      </h1>

      {courses?.map((directors, courseIdx) => (
        <div key={courseIdx}>
          {directors?.directors?.map((director, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-7">
              
              {/* Director's Image and Basic Info */}
              <div className="flex flex-col items-center md:items-start">
                <Image
                  src={pro}
                  alt={director.name}
                  width={300}
                  height={150}
                  className="rounded-lg "
                />
                <div className="text-center md:text-left pt-4">
                  <h2 className="text-2xl font-semibold">{director.name}</h2>
                  <p className="text-lg text-gray-600">{director.role}</p>
                  <h1 className="pt-3 text-gray-700 text-xl">{`The ${director.name} is an experienced professional with over ${director.exp} in the industry`}</h1>
                  <h1 className='text-2xl underline pb-4 pt-4'>Past Companies</h1>
                  {director?.PASTCOMPANIES?.map((item, index) => (
  <p className='text-xl' key={index}>{item}</p>
))}

                </div>
              </div>

              {/* Director's Detailed Information */}
              <div className='col-span-2 text-gray-500'>
                {/* <p className='text-xl'>{`An accomplished professional with over ${director.exp} years experience in BIW design...`}</p> */}
                <p className='text-xl py-2'>{data?.detail}</p>
                <p className='text-xl py-2'>{data?.detail1}</p>
                <p className='text-xl py-2'>{data?.detail2}</p>
                <p className='text-xl py-2'>{data?.detail3}</p>
                <p className='text-xl py-2'>{data?.detail4}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Director;

// detail1: "His international exposure includes three years at Nissan Technical Centre, Japan...",
//     detail2: "He has strong exposure in assuring that all newly developed products have...",
//     detail3: "Highly skilled in full product/vehicle lifecycle activities...",
//     detail4: "Excels at delivering multiple projects and managing complete engineering design...",