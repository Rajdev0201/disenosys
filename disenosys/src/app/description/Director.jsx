import React from 'react';
import Image from 'next/image'; // Assuming you're using Next.js
import pro from "../assests/profile/f.png";

const Director = () => {

  const directors = [
    {
      profile: pro,
      name: "John Doe",
      title: "Program Director",
      description: "John Doe is an experienced professional with over 20 years in the industry...",
      detail: "An accomplished professional with over 16 years experience in BIW design and development of upper body and platform for passenger car and LCV. He has managed Vehicle product planning & engineering; leading and training a team of 10 senior leads. He is proficient in cost reduction, parts localization, and quality improvement of BIM.",
      detail1: "His international exposure includes three years tenure at Nissan Technical Centre, Japan (for Infiniti G sedan, Nissan Micra, Nissan Juke, Nissan Leaf) and six months at Nissan Technical Centre, UK (Renault Kadjar).",
      detail2: "He has strong exposure in assuring that all newly developed products have represented the maximum quality & reliability attainable by establishing effective design iterations, tests & corrective procedures.",
      detail3: "Highly skilled in full product/vehicle lifecycle activities including concept design, engineering change management, issues control & resolution, cost management, vendor management, manufacturing, and various other cross-functional activities.",
      detail4: "He excels at delivering multiple projects and managing complete engineering design operations in vehicle body design, involving requirement analysis, finalizing specifications, designing, prototype development, testing & development in compliance with Indian/Global regulations and as per any automotive client’s requirements.",
      pastCompanies1:"Hundai",
      pastCompanies2:"renault",
      pastCompanies3:"Maruti"
    }
    
    // Removed empty object or add more director objects here
  ];

  return (
    <div className="font-poppins">
      <h1 className="text-4xl pt-5 underline font-bold text-center sm:text-left">Program Directors</h1>
      {directors.map((director, index) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-7">
          
          {/* Director's Image and Basic Info */}
          <div className="flex flex-col items-center md:items-start">
            <Image
              src={director.profile}
              alt={director.name}
              width={300}
              height={150}
              className="rounded-lg"
            />
            <div className="text-center md:text-left pt-4">
              <h2 className="text-2xl font-semibold">{director.name}</h2>
              <p className="text-lg text-gray-600">{director.title}</p>
              <h1 className="pt-3  text-gray-700 text-xl">{director.description}</h1>
              <h1 className='text-2xl underline pb-4 pt-4'>Past Companies</h1>
              <p className='text-xl '>.{director.pastCompanies1}</p>
              <p className='text-xl'>.{director.pastCompanies2}</p>
              <p className='text-xl'>.{director.pastCompanies3}</p>
            </div>
          </div>

          {/* Director's Detailed Information */}
          <div className='col-span-2 text-gray-500'>
            <p className='text-xl'>{director.detail}</p>
            <p className='text-xl py-2'>{director.detail1}</p>
            <p className='text-xl py-2'>{director.detail2}</p>
            <p className='text-xl py-2'>{director.detail3}</p>
            <p className='text-xl py-2'>{director.detail4}</p>
          </div>
        </div>
      ))}
    </div>  
  );
};

export default Director;