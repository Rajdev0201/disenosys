import React from "react";
import "./Course.css";
import Image from "next/image";
import g from "../assests/Group.jpg";
import { FaPlayCircle } from "react-icons/fa";
import hand from "../assests/hans.jpg";
import { FaMedal } from "react-icons/fa";
import { GrUserExpert } from "react-icons/gr";
import { BiSolidInstitution } from "react-icons/bi";
import { IoLogoYoutube } from "react-icons/io5";
import { GiRibbonMedal } from "react-icons/gi";
import { ImPriceTag } from "react-icons/im";
import h from "../assests/100.svg";

export const Course = () => {
  return (
    <>
      <div className="Course py-12 lg:py-28 mt-4 lg:mt-28">
      <h1 className="mt-40 text-center lg:mt-48 text-4xl px-3 lg:px-16 lg:text-start font-semibold text-[#0d1039] font-garet">Courses</h1>
      </div>
       <div className="mt-2 py-2">
        <h4 className="font-garet px-3 lg:px-16 text-md lg:text-2xl font-medium text-[#0d1039]">At Disenosys, we offer meticulously curated courses designed by industry experts to equip you with industry-relevant skills. Our programs include a range of postgraduate and online certification courses in Automotive Body Design across various domains.</h4>
       </div>
      <div className=" mt-16 pb-12 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 2xl:px-44">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-7 flex justify-center items-center">
        </div>
      </div>
    </>
  );
};
