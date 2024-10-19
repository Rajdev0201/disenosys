"use client";
import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { fetchCourse } from "../Redux/action/Course";
import { useRouter, useSearchParams } from "next/navigation";

export const Description = () => {
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);
  const [opencourseAccordion, setopencourseAccordion] = useState(null);
  const dispatch = useDispatch();
  const search = useSearchParams();
  const courseId = search.get("courseId");
  const router = useRouter();

  const courses = useSelector((state) => state?.course?.courses);
 
  useEffect(() => {
    dispatch(fetchCourse());
  }, [dispatch]);

  const addCart = (course) => {
    // const totalPrice = course.price * 1;
    // console.log('Total Price:', totalPrice);
    if (user?.user?.user?._id) {
      dispatch(
        addProductToCart({
          courseId: course?._id,
          name: course?.courseName,
          price: course?.price,
          quantity: 1,
          img: course?.imagePath,
          // totalPrice:totalPrice
        })
      );
    } else {
      alert("please sign in your account");
    }
  };

  const toggleAccordion = (index) => {
    setOpenAccordionIndex(openAccordionIndex === index ? null : index);
  };

  const courseAccordion = (index) => {
    setopencourseAccordion(opencourseAccordion === index ? null : index);
  };

  const handleRoute = () => {
    router.push("/");
  };

  const sendWhatsAppMessage = () => {
    if (typeof window !== "undefined") {
      // Check if window is defined
      const phoneNumber = "9944478700";
      const message =
        "I’m interested in the courses offered at Disenosys. Could you please share more details? Thanks!";
      const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
        message
      )}`;
      window.open(url, "_blank");
    }
  };

  return (
    <>
      <div className="fluid">
        {courses
          ?.filter((course) => course._id === courseId)
          ?.map((description, index) => (
            <>
              <div key={index}>
                <div className="banner opacity-2 p-10 md:p-12 lg:p-56 relative mt-6 md:mt-12 lg:mt-28 grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <p className="text-yellow-500 pb-3 mt-5 text-3xl md:text-6xl lg:text-4xl font-bold lg:mt-0 font-poppins">
                    DSST01
                    </p>
                    {/* <h1 className="text-white text-2xl sm:text-3xl font-poppins text-balance  md:text-4xl font-bold">
                      {description.courseName}
                    </h1> */}
                    <p className="font-poppins text-3xl mt-6 md:mt-6 leading-relaxed md:leading-loose lg:leading-[1.3] lg:mt-0 max-w-[250px] lg:max-w-[520px] sm:text-3xl md:text-3xl lg:text-4xl font-bold text-white ">
                    CATIA V5 FOUNDATIONS FOR AUTOMOTIVE DESIGNERS
                    </p>
                  </div>

                  <div className="flex flex-col md:flex-row space-x-4">
                    {/* Online Course */}
                    <div className="overflow-hidden before:ease-in-out shadow-md after:ease-in-out bg-white group cursor-pointer relative flex flex-col gap-4 justify-between rounded-md border hover:after:w-full border-white-222 hover:border-[#182073] duration-300 p-4 md:p-6 px-8 before:h-full before:w-2 hover:before:w-full after:absolute after:top-0 after:left-0 after:h-full after:w-0 after:duration-300 after:opacity-5 after:bg-[url('https://s3-alpha-sig.figma.com/img/6956/4aec/59afa93303a34a23ecc13368dc4094db?Expires=1717977600&amp;Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&amp;Signature=PFrwNwC7QeqlIUsWFsC-jbQzlVTUSh7T5VfJ9vMNaAEsoOS92kRDH-OjWcAX~dmuZ77fPWjZJX0v1kXaZENeqa--USg1BcCN8z~Z1id5y5RQT1ZTU5OR4PRrLISHbowyTAu65h2jCKOSYXCrXN3F6fH8epD-Pm9TCGCYvD9svkhnbTSZxPKZhn8okHm7W~3wWyIhJBaZyQ30qWwD~JAh5r0BRE6XIfIpgTlUWeLq9wwCbwFZQR5RWInuHUfLrfhvAnxmzVVoTO1TxyjHOeXVb68Tc~nJuypwlDmcd0Sg02sJu3-uj7vFXRul6qw0LRfsQrWS5c5RJ~P-z5-eS~1jTA__')] before:duration-300 before:-z-1 before:bg-[#182073] before:absolute before:top-0 before:left-0 lg:w-[50%]">
                      <h4 className="font-bold text-base lg:text-xl  text-[#182073] font-poppins duration-300 group-hover:text-white group-hover:z-[5]">
                        Placement supported live program
                      </h4>
                      <a
                        className="text-[#1D2825] group-hover:z-[5] font-medium duration-300 group-hover:text-white mt-auto flex items-center gap-2 text-sm xl:text-base"
                        onClick={() =>
                          document.getElementById("my_modal_2").showModal()
                        }
                      >
                        More about
                        <svg
                          className="w-4 h-4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                          ></path>
                        </svg>
                      </a>
                    </div>

                    {/* Recorded Course */}
                    <div className="overflow-hidden before:ease-in-out shadow-md after:ease-in-out bg-white group cursor-pointer relative flex flex-col  justify-between rounded-md border hover:after:w-full border-white-222 hover:border-[#182073] duration-300 p-4 md:p-6 px-8 before:h-full before:w-2 hover:before:w-full after:absolute after:top-0 after:left-0 after:h-full after:w-0 after:duration-300 after:opacity-5 after:bg-[url('https://s3-alpha-sig.figma.com/img/6956/4aec/59afa93303a34a23ecc13368dc4094db?Expires=1717977600&amp;Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&amp;Signature=PFrwNwC7QeqlIUsWFsC-jbQzlVTUSh7T5VfJ9vMNaAEsoOS92kRDH-OjWcAX~dmuZ77fPWjZJX0v1kXaZENeqa--USg1BcCN8z~Z1id5y5RQT1ZTU5OR4PRrLISHbowyTAu65h2jCKOSYXCrXN3F6fH8epD-Pm9TCGCYvD9svkhnbTSZxPKZhn8okHm7W~3wWyIhJBaZyQ30qWwD~JAh5r0BRE6XIfIpgTlUWeLq9wwCbwFZQR5RWInuHUfLrfhvAnxmzVVoTO1TxyjHOeXVb68Tc~nJuypwlDmcd0Sg02sJu3-uj7vFXRul6qw0LRfsQrWS5c5RJ~P-z5-eS~1jTA__')] before:duration-300 before:-z-1 before:bg-[#182073] before:absolute before:top-0 before:left-0 lg:w-[50%]">
                      <h4 className="font-bold  text-base lg:text-xl  text-[#182073] font-poppins duration-300 group-hover:text-white group-hover:z-[5]">
                        Certification Program
                      </h4>

                      <a
                        className="text-[#1D2825] group-hover:z-[5] font-medium duration-300 group-hover:text-white mt-auto flex items-center gap-2 text-sm xl:text-base"
                        onClick={() =>
                          document.getElementById("my_modal_3").showModal()
                        }
                      >
                        More about
                        <svg
                          className="w-4 h-4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                          ></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col p-2 ring-2 ring-gray-200 w-64 mt-4 mx-4 rounded shadow-lg">
                  <p className="text-lg font-bold text-center text-[#182073] font-poppins">
                    Share with your Friend
                  </p>
                  <div className="flex items-center justify-center gap-5 my-3">
                    <Image src={w} className="w-10 h-10" sizes={1} alt="" />
                    <Image src={x} className="w-10 h-10" sizes={1} alt="" />
                    <Image src={f} className="w-10 h-10" sizes={1} alt="" />
                    <Image src={l} className="w-10 h-10" sizes={1} alt="" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-24">
                  <div className="p-6 container mx-auto">
                    <h1 className="text-[#182073] font-bold text-xl sm:text-2xl md:text-3xl font-poppins">
                      Course Overview
                    </h1>
                    <p className="leading-7 text-start font-poppins pt-3 text-base md:text-lg text-gray-500">
                      {description.description}
                    </p>
                    <p
                      className="font-bold text-xl sm:text-lg mt-2 md:text-xl bg-[#182073] flex items-center justify-center text-white w-44 text-center p-2 rounded hover:cursor-pointer"
                      onClick={sendWhatsAppMessage}
                    >
                      Enquiry Now
                      <span className="w-2 h-2 mx-2 mt-1 animate-pulse bg-[#057FE3] ring-2 ring-white shadow-xl rounded-full flex justify-center items-center"></span>
                    </p>
                  </div>
                  <div className="p-6">
                    <iframe
                      src="https://www.youtube.com/embed/your-video-link"
                      title="Course Overview"
                      className="w-full h-64 md:h-96"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>

                <div className="grid grid-cols-1  gap-6 px-24">
                  <div>
                    {/* <Overview />
                    <Pay />
                    <Learn /> */}
                    <h1 className="text-[#182073] font-bold text-xl sm:text-2xl md:text-3xl font-poppins">
                      Course Curriculum
                    </h1>
                    <Course />
                    {/* <Director /> */}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 px-24">
                  <div>
                    <Director />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 md:px-24 mt-16">

  <div className="flex flex-col justify-between">
    <h1 className="text-[#182073] font-bold text-xl sm:text-2xl md:text-3xl font-poppins">
      Key Information
    </h1>
    <ul className="list-disc pl-5 mt-4 space-y-2">
      <li className="text-gray-500">
        Work on 8 Industry Oriented Projects
      </li>
      <li className="text-gray-500">
        Understand Basics about Trim Parts
      </li>
      <li className="text-gray-500">
        Learn Bracket Part Creation
      </li>
      <li className="text-gray-500">
        Work on Bracket creation Project
      </li>
      <li className="text-gray-500">
        Crack Entry Level Trims Design Engineer Interviews
      </li>
      <li className="text-gray-500">
        Understand Basic Tools in Catia Generative Shape Design
      </li>
      <li className="text-gray-500">
        Learn Patchwork & Part Modification
      </li>
    </ul>
  </div>

  <div className="flex items-center justify-center ">
    <img
      src={description?.imagePath}
      className="w-full max-w-xs md:max-w-md h-auto object-cover rounded shadow-lg"
      alt="description image"
    />
  </div>
</div>


                <div className="col-span-1 p-4 sm:p-6 lg:p-12 xl:p-16 2xl:p-24">
                  <div className="p-4 w-full  sm:p-5 lg:p-6 rounded-lg bg-white shadow-box-shadow  sm:my-8 mx-4 sm:mx-8 lg:mx-0 md:sticky top-10  ">
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
                          &quot;If you would like to subscribe to a Pre-recorded
                          course, please Purchase Your course.&quot;
                        </p>
                        <p className="py-4 text-[#182073] font-medium text-base">
                          {description.courseName}
                        </p>

                        <p className="py-1 text-[#182073] font-medium text-base">
                          {/* ₹{description.price} */}
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
                      &quot;If you would like to subscribe to a Online course,
                      please book a demo class.&quot;
                    </p>
                    <div className="flex justify-end mt-4">
                      <button
                        href=""
                        className="bg-[#182073] text-white px-4 py-2 rounded hover:bg-blue-400"
                        onClick={handleRoute}
                      >
                        Click
                      </button>
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
