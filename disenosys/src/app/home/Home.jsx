"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import home from "../assests/home.jpg";
// import { useParallax } from "react-scroll-parallax";
import { FiArrowRight } from "react-icons/fi";
import { Whatsapp } from "./Whatsapp";
import { BiSolidCarMechanic } from "react-icons/bi";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import Link from "next/link";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

// const FloatingPhone = () => {
//   return (
//     <div
//       style={{
//         transformStyle: "preserve-3d",
//         transform: "rotateY(-30deg) rotateX(15deg)",
//       }}
//       className="rounded-[24px] bg-violet-500"
//     >
//       <motion.div
//         initial={{
//           transform: "translateZ(8px) translateY(-2px)",
//         }}
//         animate={{
//           transform: "translateZ(32px) translateY(-8px)",
//         }}
//         transition={{
//           repeat: Infinity,
//           repeatType: "mirror",
//           duration: 2,
//           ease: "easeInOut",
//         }}
//         className="relative h-96 w-56 rounded-[24px] border-2 border-b-4 border-r-4 border-white border-l-neutral-200 border-t-neutral-200 bg-neutral-900 p-1 pl-[3px] pt-[3px]"
//       >
//         <HeaderBar />
//         <Screen />
//       </motion.div>
//     </div>
//   );
// };

// const HeaderBar = () => {
//   return (
//     <>
//       <div className="absolute left-[50%] top-2.5 z-10 h-2 w-16 -translate-x-[50%] rounded-md bg-neutral-900"></div>
//       <div className="absolute right-3 top-2 z-10 flex gap-2">
//         <FiWifi className="text-neutral-600" />
//         <FiBatteryCharging className="text-neutral-600" />
//       </div>
//     </>
//   );
// };

// const Screen = () => {
//   return (
//     <div className="relative z-0 grid h-full w-full place-content-center overflow-hidden rounded-[20px] bg-white">
//       {/* Example logo from logoispum */}
//       <svg
//         width="50"
//         height="39"
//         viewBox="0 0 50 39"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//         className="fill-violet-500"
//       >
//         <path
//           d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
//           stopColor="#000000"
//         ></path>
//         <path
//           d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
//           stopColor="#000000"
//         ></path>
//       </svg>

//       <button className="absolute bottom-4 left-4 right-4 z-10 rounded-lg border-[1px] bg-white py-2 text-sm font-medium text-violet-500 backdrop-blur">
//         Get Started
//       </button>

//       {/* <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-violet-500" /> */}
//       <div className="absolute -bottom-72 left-[50%] h-96 w-96 -translate-x-[50%] rounded-full bg-violet-500" />
//     </div>
//   );
// };

const Home = () => {
  // const [loading, setLoading] = useState(true);
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;
  // const parallax = useParallax({
  //   easing: [1, -0.75, 0.5, 1.34],
  //   translateX: [0, 100],
  // });

  // useEffect(() => {
  //   const timer = setTimeout(() => setLoading(false), 1500);
  //   return () => clearTimeout(timer);
  // }, []);

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen bg-gray-800">
  //       <div className="loader"></div>
  //     </div>
  //   );
  // }

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
    formData.append("access_key", "097c5e10-cf78-451f-ad76-3e45d5e45e25");

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
        console.log("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      console.error("Error submitting the form", error);
      setResult("An error occurred. Please try again.");
    }
  };

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
    >
      <div className="container-2xl bg mt-12 px-2 md:px-12 py-40 md:mt-12 lg:mt-16 w-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12  container mx-auto flex items-center justify-center px-6 lg:px-0 2xl:px-0">
          <div className="col-span-6">
            <div className="">
              <h1 className="font-poppins text-3xl mt-6 md:mt-6 lg:mt-0 sm:text-3xl md:text-6xl lg:text-7xl font-bold text-dark">
                Shaping Industry Ready{" "}
                <span className="text-[#182073]">Engineers</span> for the Future{" "}
              </h1>
            </div>
            <div className="flex justify-start mt-6 sm:mt-8 lg:mt-12">
              {/* <button className="font-poppins font-semibold text-base sm:text-lg lg:text-xl px-4 py-2 sm:px-5 lg:px-6 sm:py-2 lg:py-3 bg-[#4BE5CA] text-white rounded-lg">
              View Course
            </button> */}
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
                className="group relative flex w-fit items-center  gap-1.5 rounded-full hover:text-white bg-white px-4 py-2 text-dark transition-colors hover:bg-[#182073]"
              >
                <Link href="/course"> View Course</Link>

                <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
              </motion.button>
            </div>
          </div>

          <div className="col-span-6 flex justify-center lg:justify-end">
            {/* <Image
            src={home}
            alt="bg-home"
            className="shadow-2xl p-6 lg:p-12 bg-violet-300 rounded-full max-w-xs sm:max-w-sm lg:max-w-md"
          /> */}

            <div class="flex items-center justify-center">
              <form onSubmit={onSubmit}>
                <div class="bg-[#182073] border-[4px] border-[#F1F1F5] rounded-2xl mr-0 lg:mr-12 hover:border-[#057FE3] transition-all duration-200">
                  <div class="mx-auto flex items-center space-y-4 py-16 px-16 font-semibold text-gray-500 flex-col">
                    <BiSolidCarMechanic size={60} className="text-white" />
                    <h1 class="text-white text-sm lg:text-2xl">
                      Book a demo class today!
                    </h1>
                    <label htmlFor="name" className="sr-only">
                      Name
                    </label>
                    <input
                      className="w-full p-2 bg-blue-900 rounded-md border border-gray-700 text-white focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
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
                      className="w-full p-2 bg-blue-900 rounded-md border border-gray-700 text-white focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
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
                      className="w-full p-2 bg-blue-900 rounded-md border border-gray-700 text-white focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
                      placeholder="Mobile"
                      type="text"
                      name="mobile"
                      id="mobile"
                      required
                    />

                    <button
                      className="w-full p-2 bg-white border-none outline-none text-[#182073] rounded-md font-bold text-gray-900 border-[4px] border-gray-700 hover:border-blue-500 transition-all duration-200"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Submit"}
                    </button>

                    {result && <p className="text-white mt-4">{result}</p>}
                    {/* <p>
        Don't have an account?
        <a
          class="font-semibold text-white hover:text-blue-500 transition-all duration-200"
          href=""
          >Sign up</a
        >
      </p> */}
                  </div>
                </div>
              </form>
            </div>

            {/* <section className="grid place-content-center p-4 lg:p-28">
              <FloatingPhone />
            </section> */}
          </div>
        </div>
      </div>
      {/* <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div> */}
      <Whatsapp />
    </motion.section>
  );
};

export default Home;
