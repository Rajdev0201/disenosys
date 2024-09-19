import React from "react";
import foud from "../assests/foun.jpg";
import Image from "next/image";
// import c from "../assests/3.png";
// import Partner from "../home/Partner";

const Founder = () => {
  return (
    <div className="container-2xl bg-who-gradient mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 pb-12 font-poppins py-3">
      <h1 className="font-bold text-center text-[#182073]  text-xl lg:text-5xl">
        The <span className="">F</span>ounder
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 xl:gap-12 mt-16">
        <div className="flex justify-center">
          <Image src={foud} className="rounded-lg w-full h-auto" alt="Founder" />
        </div>
        <div className="md:col-span-2 py-6">
          <h1 className="text-base text-gray-600 sm:text-sm md:text-base lg:text-lg xl:text-md leading-relaxed">
            We Are Disenosys, A Well-Established EdTech Platform and A Successful
            Life-Changer for Most Students and Professionals. At Disenosys,
            Industry-Specific Courses Are Designed to Upskill You To Cope Up With
            The New World Job Expectations with ease. Since our inception in 2019,
            we have become the leading edtech training platform in Indian
            Automotive Industry. In our journey of eternally empowering engineers,
            we have trained over 10,000 engineers with industry-relevant skills in
            Automotive Product Design and assisted over 500 engineers to secure
            their dream jobs. With a well-curated curriculum by industry experts,
            We provide various Post Graduate courses on Automotive Body Design in
            a range of domains such as BIW, Plastic Trims, Seating and many more
            in a variety of automotive CAD software such as CATIA, NX, Creo, and
            more. Our solid partnership with Automotive OEMs enables us to extend
            100% Placement/job assistance for our trained candidates with TOP
            COMPANIES.
          </h1>
        </div>
      </div>

      {/* <h1 className="font-bold text-center text-[#00224F] text-xl lg:text-5xl m-28">
        Our <span className="text-[#4BE5CA]"> Software</span> Partner
      </h1> */}

      {/* <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 ">
        <div className="flex justify-center">
          <Image src={c} alt="Software Partner 1" className="w-full h-auto max-w-xs" />
        </div>
        <div className="flex justify-center">
          <Image src={c} alt="Software Partner 2" className="w-full h-auto max-w-xs" />
        </div>
        <div className="flex justify-center">
          <Image src={c} alt="Software Partner 3" className="w-full h-auto max-w-xs" />
        </div>
        <div className="flex justify-center">
          <Image src={c} alt="Software Partner 4" className="w-full h-auto max-w-xs" />
        </div>
      </div> */}
    </div>
  );
};

export default Founder;
