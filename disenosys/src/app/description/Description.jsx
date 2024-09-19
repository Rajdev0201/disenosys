"use client";
import React, { useState } from "react";
import "./Description.css";
import Image from "next/image";
import carimage from "../assests/car.webp";
// import { BsFacebook } from "react-icons/bs";
import w from "../assests/w.png";
import f from "../assests/f.png";
import x from "../assests/x.png";
import l from "../assests/l.png";
import Director from "./Director";
import { Overview } from "./Overview";
import Pay from "./Pay";
import Learn from "./Learn";
import Course from "./Course";
import { Review } from "./Review";
import { Rating } from "./Rating";
import { MdCancel } from "react-icons/md";
import { addProductToCart } from "../Redux/action/addToCart";
export const Description = () => {
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);
  const [opencourseAccordion, setopencourseAccordion] = useState(null);
  const descriptions = [
    {
      title: "CFD Foundation course: Part-1",
      course:
        "A CFD (Computational Fluid Dynamics) Foundation course typically covers the fundamental concepts and tools used in CFD simulations. Here's an outline of what Part 1 might include. This part of the course would lay the groundwork for more advanced topics, such as turbulence modeling, multiphase flows, and advanced meshing techniques, which would be covered in subsequent parts.",
      image: carimage,
      key: {
        prerequisites: [
          "Work on 8 Industry Oriented Projects",
          "Understand Basics about Trim Parts",
          "Learn Bracket Part Creation",
          "Work on Bracket creation Project",
          "Crack Entry Level Trims Design Engineer Interviews",
          "Understand Basic Tools in Catia Generative Shape Design",
          "Learn Patchwork & Part Modification",
        ],
      },
      overview: [
        "What is side door trims assembly?",
        "In automotive design, side door trims assembly refers to the paneling and elements mounted inside of a vehicle door. It contains the window controls, speaker covers, door panel, armrest, and door handle. Its objective is to offer both aesthetically pleasing and practical advantages, like soundproofing and storing space.",
        "Process",
        "The design process of side door trims assembly in automotive design typically involves the following steps:",
        "Concept development: The design team will consider factors like the target market, vehicle design, and materials as they develop various ideas for the side door trim assembly.",
        "Sketching and rendering: To improve the design and envision how it will appear in the finished product, the team will produce sketches and renderings of the ideas using both conventional and digital tools.",
        "CAD modeling: The team will produce a 3D computer-aided design (CAD) model of the side door trims assembly once the design is complete, which will be used for prototyping and testing.",
        "Prototyping and testing: The side door trims assembly will be physically prototyped by the team and evaluated for durability, function, and fit.",
        "Refinement and production: Testing findings will be used to improve the design and get it ready for production, including choosing the right materials, tools, and manufacturing processes.",
        "To ensure that the finished product satisfies all design requirements, quality standards, and cost targets, the team will work in collaboration with numerous stakeholders throughout the design process, including engineers, suppliers, and manufacturing partners.",
        "Significance",
        "In terms of automotive design, side door trim assembly is crucial for giving the interior of the car a polished, uniform appearance as well as a number of practical advantages.",
        "Some of the key significance of side door trims assembly are:",
        "Aesthetics: The side door trims assembly improves the interior of the vehicle overall and makes the design visually cohesive. It can also be customized to fit the vehicle’s color scheme and style.",
        "Sound insulation: By serving as a barrier between the passenger compartment and the outside world, side door trim assembly is also crucial in lowering noise levels inside the vehicle.",
        "Protection: The side door trim assembly can guard against damage from moisture, dirt, and debris to the interior of the vehicle door, including the wiring, locking mechanisms, and window regulators.",
        "Functionality: The side door trim assembly can also offer a number of useful features, including storage compartments, ambient light, and power window and mirror controls.",
        "Overall, side door trims assembly is a crucial element of automotive design that improves the overall driving experience for the vehicle’s occupants by means of both aesthetic and functional reasons.",
        "Industry Average Pay",
        "The average salary for an automotive design engineer in India is around 6.6 LPA, with salaries ranging from 3 LPA to 17 LPA.",
      ],
      courseContent: [
        "THEORY",
        "Side Door Assembly Introduction",
        "Purpose of Side Door Assembly",
        "Parameter, Regulation, and Close Volume Mapping",
        "Class A-Surface Quality Check and Joinery Creation",
        "Master Section Creation and Importance in Trims Design",
        "Draft Analysis: Tooling Axis, Compass, Slider, and Lifter Studies",
        "Feature Creation: Mounting Structures, Power Copy, Snap Fit Creation",
        "Assembly & 2D Drawing: CATIA Drafting Module, Part Views, Section Details",
        "Parting Line Creation",
      ],
      coursefee: "$70 (4200 INR) including Tax",
      demoId: "VZZHoSIpwGo",
    },
  ];
  const addCart = (course) => {
    // const totalPrice = course.price * 1;
    // console.log('Total Price:', totalPrice);
    if( user?.user?.user?._id){
      dispatch(addProductToCart({
        courseId: course?._id,
        name: course?.courseName,
        price: course?.price,
        quantity: 1,
        img: course?.imagePath,
        // totalPrice:totalPrice
      }));
    }else{
       alert("please sign in your account")
      }
  };

  const toggleAccordion = (index) => {
    setOpenAccordionIndex(openAccordionIndex === index ? null : index);
  };

  const courseAccordion = (index) => {
    setopencourseAccordion(opencourseAccordion === index ? null : index);
  };
  return (
    <>
      <div className="fluid">
        {descriptions.map((description, index) => (
          <>
            <div key={index}>
              <div className="banner p-10 md:p-12 lg:p-40 relative mt-6 md:mt-12 lg:mt-20">
                <p className="text-white pb-3 mt-5 lg:mt-0 font-poppins">
                  Latest Release, popular
                </p>
                <h1 className="text-white text-2xl sm:text-3xl font-poppins md:text-4xl font-bold">
                  {description.title}
                </h1>
                <p className="text-white pt-3 font-poppins">Course Detail</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   ">
                <div className="col-span-1 lg:col-span-2 p-6 lg:p-24">
                  <p className="text-base font-poppins">
                    Share with your Friend
                  </p>
                  <div className="flex gap-5 my-3">
                    <Image src={w} className="w-10 h-10" sizes={1} />
                    <Image src={x} className="w-10 h-10" sizes={1} />
                    <Image src={f} className="w-10 h-10" sizes={1} />
                    <Image src={l} className="w-10 h-10" sizes={1} />
                  </div>
                  <button className="bg-[#182073] px-2 py-1 rounded font-poppins text-white font-bold my-3">
                    Course Brouchure
                  </button>
                  <h1 className="text-slate-900 font-bold text-xl sm:text-2xl md:text-3xl font-poppins">
                    Course Detail
                  </h1>
                  <p className="leading-7 text-start font-poppins pt-3 text-base md:text-lg text-gray-500">
                    {description.course}
                  </p>
                  <p className="font-bold text-xl sm:text-2xl md:text-3xl text-slate-900 pt-3">
                    Course Fee: {description.coursefee}
                  </p>
                  <h1 className="text-slate-900 font-bold text-xl sm:text-2xl md:text-3xl font-poppins pt-4 pb-2">
                    Key Information
                  </h1>
                  <ul className="list-disc pl-5">
                    {description.key.prerequisites.map((item, idx) => (
                      <li key={idx} className="text-gray-500 font-poppins">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <h1 className="font-bold text-slate-900 text-xl sm:text-2xl md:text-3xl font-poppins pt-5 py-2">
                    More Information
                  </h1>
                  <div>
                    <iframe
                      className="w-full"
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${description.demoId}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <Director />
                    <Overview />
                    <Pay />
                    <Learn />
                    <Course />
                  </div>
                </div>
                <div className="col-span-1 p-4 sm:p-6 lg:p-12 xl:p-16 2xl:p-24">
                  <div className="p-4 lg:w-96 md:w-80 sm:p-5 lg:p-6 rounded-lg bg-white shadow-box-shadow  sm:my-8 mx-4 sm:mx-8 lg:mx-0 md:sticky top-10  ">
                    <div>
                      <Image
                        src={description.image}
                        alt={description.title}
                        className="rounded-lg w-full aspect-[5/3]" // Maintain aspect ratio
                      />
                    </div>
                    <div className="container mt-4">
                      {/* <button className="bg-gray-100 p-2 w-full my-2 font-poppins hover:bg-gray-200">
                        Not Interested
                      </button> */}
                      <button className="text-[#182073] rounded font-poppins rounded text-lg font-semibold p-2 w-full my-2">
                        Enroll Now ↓
                      </button>
                      {/* <p className="text-center py-1">
                        {description.coursefee}
                      </p> */}
                      {/* <p className="text-slate-900 font-semibold font-poppins text-lg sm:text-xl md:text-2xl">
                        Course Includes
                      </p> */}
                      {/* <p className="text-gray-500 pt-1 font-poppins">3 lessons</p>
                      <p className="text-gray-500 font-poppins">15 chapters</p> */}
                    </div>

                    <div
                      class="overflow-hidden before:ease-in-out shadow-md after:ease-in-out bg-white group cursor-pointer relative flex flex-col gap-4 
                    justify-between rounded-md border hover:after:w-full border-white-222 hover:border-[#182073] duration-300 p-4 md:p-6 px-8 before:h-full before:w-2 
                    hover:before:w-full after:absolute after:top-0 after:left-0 after:h-full after:w-0 after:duration-300 after:opacity-5 
                    after:bg-[url('https://s3-alpha-sig.figma.com/img/6956/4aec/59afa93303a34a23ecc13368dc4094db?Expires=1717977600&amp;Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&amp;Signature=PFrwNwC7QeqlIUsWFsC-jbQzlVTUSh7T5VfJ9vMNaAEsoOS92kRDH-OjWcAX~dmuZ77fPWjZJX0v1kXaZENeqa--USg1BcCN8z~Z1id5y5RQT1ZTU5OR4PRrLISHbowyTAu65h2jCKOSYXCrXN3F6fH8epD-Pm9TCGCYvD9svkhnbTSZxPKZhn8okHm7W~3wWyIhJBaZyQ30qWwD~JAh5r0BRE6XIfIpgTlUWeLq9wwCbwFZQR5RWInuHUfLrfhvAnxmzVVoTO1TxyjHOeXVb68Tc~nJuypwlDmcd0Sg02sJu3-uj7vFXRul6qw0LRfsQrWS5c5RJ~P-z5-eS~1jTA__')] before:duration-300 before:-z-1 before:bg-[#182073] before:absolute before:top-0 before:left-0"
                    >
                      <h4 class="font-bold text-lg text-[#182073] font-poppins duration-300 group-hover:text-white group-hover:z-[5]">
                        Online Course
                      </h4>
                      <a
                        class="text-[#1D2825] group-hover:z-[5] font-medium duration-300 group-hover:text-white mt-auto flex items-center gap-2 text-sm xl:text-base"
                        onClick={() =>
                          document.getElementById("my_modal_2").showModal()
                        }
                      >
                        More about
                        <svg
                          class="w-4 h-4"
                          stroke="currentColor"
                          stroke-width="1.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                            stroke-linejoin="round"
                            stroke-linecap="round"
                          ></path>
                        </svg>
                      </a>
                    </div>
                    <dialog id="my_modal_3" className="">
                      <div className="modal-box relative p-8 bg-white shadow-2xl rounded-lg max-w-md mx-auto transition-transform duration-300 ease-in-out transform scale-95 hover:scale-100">
                        <form method="dialog">
                          <button className="btn btn-sm btn-circle btn-ghost absolute -right-0 -top-0  transition-colors duration-300">
                            <MdCancel size={40} />
                          </button>
                        </form>
                        <h3 className="font-bold text-xl text-[#182073]">
                          Hello learner!
                        </h3>
                        <p className="py-4 text-gray-600">
                          "If you would like to subscribe to an Pre-recorded
                          course, please Purchase Your course."
                        </p>
                        <p className="py-4 text-[#182073] font-medium text-base">
                          {description.title}
                        </p>

                        <p className="py-1 text-[#182073] font-medium text-base">
                          {description.coursefee}
                        </p>

                        <div className="flex justify-end mt-4">
                          <button
                            className="bg-[#182073] text-white px-4 py-2 rounded hover:bg-blue-400"
                            onClick={() => addCart(course)}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </dialog>
                    <div
                      class="overflow-hidden mt-5 before:ease-in-out shadow-md after:ease-in-out bg-white group cursor-pointer relative flex flex-col gap-4 
                    justify-between rounded-md border hover:after:w-full border-white-222 hover:border-[#182073] duration-300 p-4 md:p-6 px-8 before:h-full before:w-2 
                    hover:before:w-full after:absolute after:top-0 after:left-0 after:h-full after:w-0 after:duration-300 after:opacity-5 
                    after:bg-[url('https://s3-alpha-sig.figma.com/img/6956/4aec/59afa93303a34a23ecc13368dc4094db?Expires=1717977600&amp;Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&amp;Signature=PFrwNwC7QeqlIUsWFsC-jbQzlVTUSh7T5VfJ9vMNaAEsoOS92kRDH-OjWcAX~dmuZ77fPWjZJX0v1kXaZENeqa--USg1BcCN8z~Z1id5y5RQT1ZTU5OR4PRrLISHbowyTAu65h2jCKOSYXCrXN3F6fH8epD-Pm9TCGCYvD9svkhnbTSZxPKZhn8okHm7W~3wWyIhJBaZyQ30qWwD~JAh5r0BRE6XIfIpgTlUWeLq9wwCbwFZQR5RWInuHUfLrfhvAnxmzVVoTO1TxyjHOeXVb68Tc~nJuypwlDmcd0Sg02sJu3-uj7vFXRul6qw0LRfsQrWS5c5RJ~P-z5-eS~1jTA__')] before:duration-300 before:-z-1 before:bg-[#182073] before:absolute before:top-0 before:left-0"
                    >
                      <h4 class="font-bold text-[#182073] text-lg font-poppins duration-300 group-hover:text-white group-hover:z-[5]">
                        Recorded Course
                      </h4>

                      <a
                        class="text-[#1D2825] group-hover:z-[5] font-medium duration-300 group-hover:text-white mt-auto flex items-center gap-2 text-sm xl:text-base"
                        onClick={() =>
                          document.getElementById("my_modal_3").showModal()
                        }
                      >
                        More about
                        <svg
                          class="w-4 h-4"
                          stroke="currentColor"
                          stroke-width="1.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                            stroke-linejoin="round"
                            stroke-linecap="round"
                          ></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <dialog id="my_modal_2" className="">
                <div className="modal-box relative p-8 bg-white shadow-2xl rounded-lg max-w-md mx-auto transition-transform duration-300 ease-in-out transform scale-95 hover:scale-100">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute -right-0 -top-0  transition-colors duration-300">
                      <MdCancel size={40} />
                    </button>
                  </form>
                  <h3 className="font-bold text-xl text-[#182073]">
                    Hello learner!
                  </h3>
                  <p className="py-4 text-gray-600">
                    "If you would like to subscribe to an online course, please
                    fill out the form."
                  </p>
                  <div className="flex justify-end mt-4">
                    <a
                      href="https://docs.google.com/forms/d/12YyWZs-4sPtMZ02lC-BxNPJW-uuIc8zCXYMYIVkSF2M/edit"
                      className="bg-[#182073] text-white px-4 py-2 rounded hover:bg-blue-400"
                    >
                      Click
                    </a>
                  </div>
                </div>
              </dialog>

              <Rating />
              <div className="mt-5">
                <Review />
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};
