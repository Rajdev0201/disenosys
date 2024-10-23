import React from 'react';
import Image from 'next/image'; // Assuming you're using Next.js
// import pro from "../assets/profile/f.png";
import { useSelector } from 'react-redux';

const Director = () => {
  const courseState = useSelector((state) => state?.course);
  const courses = courseState?.courses;

  // Example static data if needed for directors
  // const directors = [
  //   {
  //     profile: pro,
  //     name: "John Doe",
  //     title: "Program Director",
  //     description: "John Doe is an experienced professional with over 20 years in the industry...",
  //     detail: "An accomplished professional with over 16 years experience in BIW design...",
  //     detail1: "His international exposure includes three years at Nissan Technical Centre, Japan...",
  //     detail2: "He has strong exposure in assuring that all newly developed products have...",
  //     detail3: "Highly skilled in full product/vehicle lifecycle activities...",
  //     detail4: "Excels at delivering multiple projects and managing complete engineering design...",
  //     pastCompanies1: "Hyundai",
  //     pastCompanies2: "Renault",
  //     pastCompanies3: "Maruti"
  //   }
  // ];

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
                <img
                  src={director.img}
                  alt={director.name}
                  
                  className="rounded-lg object-cover h-64"
                />
                <div className="text-center md:text-left pt-4">
                  <h2 className="text-2xl font-semibold">{director.name}</h2>
                  <p className="text-lg text-gray-600">{director.role}</p>
                  <h1 className="pt-3 text-gray-700 text-xl">{`The ${director.name} is an experienced professional with over ${director.exp} in the industry`}</h1>
                  <h1 className='text-2xl underline pb-4 pt-4'>Past Companies</h1>
                  {director?.PASTCOMPANIES?.map((item, index) => (
  <p className='text-xl' key={index}>.{item}</p>
))}

                </div>
              </div>

              {/* Director's Detailed Information */}
              <div className='col-span-2 text-gray-500'>
                {/* <p className='text-xl'>{`An accomplished professional with over ${director.exp} years experience in BIW design...`}</p> */}
                <p className='text-xl py-2'>{director?.detail.detail1}</p>
                <p className='text-xl py-2'>{director?.detail.detail2}</p>
                <p className='text-xl py-2'>{director?.detail.detail3}</p>
                <p className='text-xl py-2'>{director?.detail.detail4}</p>
                <p className='text-xl py-2'>{director?.detail.detail5}</p>
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