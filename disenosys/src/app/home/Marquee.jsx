"use client";
import React from "react";
import Marquee from "react-fast-marquee";
import p1 from "../assests/profile/Slide1.PNG";
import p2 from "../assests/profile/Slide2.PNG";
import p3 from "../assests/profile/Slide3.PNG";
import p4 from "../assests/profile/Slide4.PNG";
import p5 from "../assests/profile/Slide5.PNG";
import p6 from "../assests/profile/Slide6.PNG";
import p7 from "../assests/profile/Slide7.PNG";
import p8 from "../assests/profile/Slide8.PNG";
import p9 from "../assests/profile/Slide9.PNG";
import p10 from "../assests/profile/Slide10.PNG";
import p11 from "../assests/profile/Slide11.PNG";
import p12 from "../assests/profile/Slide12.PNG";


import Image from "next/image";

const companies = [
  { id: 1, name: "Company 1", image: p1 },
  { id: 2, name: "Company 2", image: p2 },
  { id: 3, name: "Company 3", image: p3 },
  { id: 4, name: "Company 4", image: p4 },
  { id: 5, name: "Company 5", image: p5 },
  { id: 6, name: "Company 6", image: p6 },
  { id: 7, name: "Company 7", image: p7 },
  { id: 8, name: "Company 8", image: p8 },
  { id: 9, name: "Company 9", image: p9 },
  { id: 10, name: "Company 10", image: p10 },
  { id: 11, name: "Company 11", image: p11 },
  { id: 12, name: "Company 11", image: p12 },
];

const MarqueeView = () => {
  return (
    <div className="flex flex-col space-y-6 mt-8 space-y-6">
  
      <Marquee speed={80} pauseOnHover={true} direction="left" gradient={false} className="flex items-center">
        {companies.map((company) => (
          <div
            key={company.id}
            className="flex w-44 h-48 p-3 flex-col items-center justify-center px-6"
          >
            <div className=" border-2 border-[#182073] shadow-lg rounded-md">
              <Image src={company.image} alt={company.name} className="object-cover w-full h-full" priority loading="eager"   
            width={250}
            height={125}
            quality={80}
           />
            </div>
          </div>
        ))}
      </Marquee>

    
    </div>
  );
};

export default MarqueeView;
