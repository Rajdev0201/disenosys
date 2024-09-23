"use client";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import anto from "../assests/testimonials/Anto.png";
import kj from "../assests/testimonials/Jayesh KJ.png";
import Karthikeyan from "../assests/testimonials/Karthikeyan C.png";
import ragul from "../assests/testimonials/Raghul Srivatsa.png";
import rajesh from "../assests/testimonials/Rajesh Deva.png";
import sheldon from "../assests/testimonials/Sheldon.png";
import Ford from "../assests/ford.jpg"
import Image from "next/image";

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const data = [
    {
      name: "Arun Chinnathurai",
      company: "Ford",
      companylogo:Ford,
      country: "Germany",
      pic: "",
      des: `Disenosys provided personalized CATIA training, helping me master real-world industry techniques beyond typical tutorials. The user-friendly sessions, expert support, and commitment helped boost my confidence. I highly recommend their programs for tailored expertise and outstanding service. Five-star experience!`,
    },
    {
      name: "Kavya Shri",
      company: "Renault Nissan",
      country: "India",
      pic: "",
      des: `It was an awesome experience learning my first 3D software. Mr. Vijay, our mentor, taught us thoroughly, focusing on clarity and providing many practice drawings. His dedication and the comprehensive practice sessions made the learning process enjoyable and effective.`,
    },
    {
      name: "Sourabha",
      company: "IBM",
      country: "USA",
      pic: "",
      des: `The program taught me a lot about industrial applications. The mentor was highly knowledgeable, patient, and shared valuable industry insights. It’s perfect for beginners, offering clear explanations and should reach more students for its immense value.`,
    },
    {
      name: "Anto",
      company: "Dassault Systemes",
      country: "India",
      pic: anto,
      des: `I gained a clear understanding of the basics and design requirements for creating automotive seats. Sumith sir explained every concept thoroughly and repeated them when needed. The program covered seat manufacturing, 8D and BOM reports, GD&amp;T, and creating seats from the STO.`,
    },
    {
      name: "Rajesh Deva",
      company: "Renault Group",
      country: "India",
      pic: rajesh,
      des: `The course effectively covered basic topics and offered excellent tool usage exposure. They provide opportunities for freshers to join top OEMs. The friendly, knowledgeable faculty makes it a great platform to kickstart your career with valuable industry exposure.`,
    },
    {
      name: "Karthikeyan C",
      company: "Renault Nissan",
      country: "India",
      pic: Karthikeyan,
      des: `Disenosys offered excellent training in BIW surfacing using CATIA. The mentor, skilled in CATIA and BIW, consistently helped students progress from basics to industrial-level knowledge. This training is ideal for engineers aiming to improve tool expertise and prepare for interviews.`,
    },
    {
      name: "Raghul Srivatsa",
      company: "Mahindra",
      country: "India",
      pic: ragul,
      des: `I gained a solid understanding of Wiring Harness routing design through Disenosys' well-structured online course, which I had been seeking for two years. It’s an excellent platform for freshers to learn both design and the manufacturing process.`,
    },
    {
      name: "Jayesh K J",
      company: "Renault Nissan",
      country: "India",
      pic: kj,
      des: `As a Sheetmetal design engineer, I struggled with BIW design during interviews. Disenosys, with experienced professionals and 50% lower fees, helped me master BIW concepts and boosted my confidence. They even moved my profile for interviews. Highly recommended!`,
    },
    {
      name: "Siva Subramanian",
      company: "Renault Nissan",
      country: "India",
      pic: "",
      des: `I enrolled in the Automotive BIW Design course at Disenosys based on a colleague's recommendation. Despite my 1.5 years of experience, I learned a lot, thanks to a supportive mentor with 12+ years in the industry. The assignments were excellent, boosting my confidence for interviews.`,
    },
    {
      name: "Vinay Kudupudi",
      company: "Segula Technologies",
      country: "India",
      pic: "",
      des: `As a Design engineer, I struggled in OEM interviews due to skill gaps. Disenosys’ BIW Design course transformed my skills with experienced mentors. Their training and support boosted my confidence in BIW and Surface Design. I highly recommend Disenosys for career advancement!`,
    },
  ];

  return (
    <section className="">
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <h2 className="text-center font-bold font-poppins text-[#182073] text-xl lg:text-5xl mb-8">
          Read trusted reviews from our Students
        </h2>
        <Slider {...settings}>
          {data.map((testimonial, index) => (
            <div className="p-4 h-full flex" key={index}>
              <blockquote className="flex flex-col justify-between bg-gray-50 p-6 shadow-sm rounded-lg min-h-[300px] sm:min-h-[350px] lg:min-h-[400px]">
                <div className="flex items-center gap-4">
                  {testimonial.pic ? (
                    <>
                      <Image
                        src={testimonial.pic}
                        alt="students"
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    </>
                  ) : (
                    <img
                      alt={testimonial.name}
                      src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <div className="flex justify-start gap-0.5 text-[#182073]">
                      {[...Array(5)].map((_, starIndex) => (
                        <svg
                          key={starIndex}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          className="w-5 h-5"
                        >
                          <path d="M10 15.27L16.18 19 14.54 12.97 20 8.25 13.81 7.63 10 1 6.19 7.63 0 8.25l5.46 4.72L3.82 19z" />
                        </svg>
                      ))}
                    </div>
                    <p className="mt-0.5 text-lg font-medium text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="mt-0.5 text-md font-medium text-gray-900 flex items-center space-x-2">
                      {/* {testimonial.company}  */}
                      <Image 
                      src={testimonial.companylogo}
                      alt="c-logo"
                      className="w-12 h-12 bg-white"
                      />
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-gray-900">
                      {testimonial.country}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-gray-700 flex-grow">
                  {testimonial.des}
                </p>
              </blockquote>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
