"use client";
import React from "react";
import Marquee from "react-fast-marquee";
import p1 from "../assests/slide.png";
import Image from "next/image";

const companies = [
  { id: 1, name: "Company 1", image: p1 },
  { id: 2, name: "Company 2", image: p1 },
  { id: 3, name: "Company 3", image: p1 },
  { id: 4, name: "Company 4", image: p1 },
  { id: 5, name: "Company 5", image: p1 },
  { id: 6, name: "Company 6", image: p1 },
  { id: 7, name: "Company 7", image: p1 },
  { id: 8, name: "Company 8", image: p1 },
  { id: 9, name: "Company 9", image: p1 },
  { id: 10, name: "Company 10", image: p1 },
  { id: 10, name: "Company 10", image: p1 },
];

const MarqueeView = () => {
  return (
    <div className="flex flex-col space-y-6 mt-8">
  
      <Marquee speed={80} pauseOnHover={true} direction="left" gradient={false} className="flex items-center">
        {companies.map((company) => (
          <div
            key={company.id}
            className="flex w-36 h-48 p-3 flex-col items-center justify-center px-6"
          >
            <div className=" border border-[#182073] rounded-md">
              <Image src={company.image} alt={company.name} className="object-cover w-full h-full" />
            </div>
          </div>
        ))}
      </Marquee>
        

      
      <Marquee speed={80} pauseOnHover={true} direction="right" gradient={false} className="flex items-center">
        {companies.map((company) => (
          <div
            key={company.id}
            className="flex w-36 h-48 p-3 flex-col items-center justify-center px-6"
          >
            <div className=" border border-[#182073] rounded-md">
              <Image src={company.image} alt={company.name} className="object-cover w-full h-full" />
            </div>
          </div>
        ))}
      </Marquee>
    
    </div>
  );
};

export default MarqueeView;
