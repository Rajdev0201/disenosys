"use client";
import React, { useState, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Whatsapp } from "./Whatsapp";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import bg from "../assests/profile/car-1.webp";
import "../globals.css"

const COLORS_TOP = ["#057FE3"];

const Home = () => {
  const color = useMotionValue(COLORS_TOP[0]);
  

  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const name = formData.get("name");
    const email = formData.get("email");
    const mobile = formData.get("mobile");

    if (!name || !email || !mobile) {
      setResult("Please fill out all fields.");
      return;
    }

    setResult("Sending....");
    formData.append("access_key", "6c016ccc-be7f-4c75-be4c-56e74e4671fa");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        event.target.reset();
        setTimeout(() => {
          setResult("");
        }, 1000);
      } else {
        setResult(data.message);
      }
    } catch (error) {
      setResult("An error occurred. Please try again.");
    }
  };

  return (
    <div className="">
       <Image
    src={bg}
    alt="Background"
    layout="fill"
    objectFit="cover"
    quality={100}
    loading="eager"
    className="z-0 py-12 mt-24 lg:mt-36"
  />
      <div className="container-2xl py-12 lg:py-36  w-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="col-span-6 ">
            <div className="bg-[#0d1039]/50 rounded-3xl shadow-sm p-10 flex justify-center items-center w-full lg:w-3/4 mt-8">
              <h1 className="garet text-xl mt-1 md:mt-6 leading-relaxed md:leading-loose lg:leading-[1.3] lg:mt-0 max-w-[250px] lg:max-w-[520px] font-medium sm:text-3xl md:text-6xl lg:text-5xl  text-white">
                Shaping Industry Ready{" "}
                <span className="text-white">Engineers</span> for the Future{" "}
              </h1>
            </div>

            <div className="flex justify-start">
              <motion.button
                style={{
                  border,
                  boxShadow,
                }}
                whileHover={{
                  scale: 1.015,
                }}
                whileTap={{
                  scale: 0.985,
                }}
                className="group relative flex mx-auto lg:mx-44 text-[#0d1039] items-center -mt-4 gap-1.5 rounded-sm hover:text-white bg-white px-3 py-1  lg:px-4 lg:py-2  hover:bg-[#182073]"
              >
                <Link
                  href="/quicktest"
                  className="text-sm lg:text-2xl garet"
                >
                  Take Test
                </Link>

                <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12 text-2xl" />
              </motion.button>
            </div>
          </div>

          <div className="col-span-6 flex justify-center lg:justify-end">
            <div class="flex items-center justify-center">
              <form onSubmit={onSubmit}>
                <div class="bg-[#0d1039]/50  rounded-2xl mt-10 lg:-mt-0 mr-2 lg:mr-0 hover:border-[#057FE3] transition-all duration-200">
                  <div class="mx-auto flex items-center justify-center space-y-4 py-2 px-6 lg:py-4 lg:px-20 font-semibold text-gray-500 flex-col">
                    {/* <BiSolidCarMechanic size={60} className="text-white" /> */}
                    <h1 class="text-white w-52 font-medium text-center text-sm lg:text-3xl garet">
                      Book a Demo Class Today!
                    </h1>

                    <label htmlFor="name" className="sr-only">
                      Name
                    </label>

                    <input
                      className="p-2 text-white bg-transparent border-2 border-white  rounded-full focus:border-blue-700 hover:border-blue-500 transition-all duration-200 focus:outline-none"
                      placeholder="Name"
                      type="text"
                      name="name"
                      id="name"
                      required
                    />

                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <input
                      className="p-2 bg-transparent border-2 border-white text-white rounded-full focus:border-blue-700 hover:border-blue-500 transition-all duration-200 focus:outline-none"
                      placeholder="Email"
                      type="email"
                      name="email"
                      id="email"
                      required
                    />

                    <label htmlFor="mobile" className="sr-only">
                      Mobile
                    </label>
                    <input
                      className="p-2  bg-transparent border-2 border-white text-white rounded-full focus:border-blue-700 hover:border-blue-500 transition-all duration-200 focus:outline-none"
                      placeholder="Mobile"
                      type="text"
                      name="mobile"
                      id="mobile"
                      required
                    />

                    <button
                      className="px-10 py-2 text-md lg:text-2xl mt-24 garet bg-white border-none outline-none text-[#0d1039] rounded-sm font-medium  border-[4px] border-gray-700 hover:border-blue-500 transition-all duration-200"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Submit"}
                    </button>

                    {result && <p className="text-white mt-4">{result}</p>}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Whatsapp />
    </div>
  );
};

export default Home;
