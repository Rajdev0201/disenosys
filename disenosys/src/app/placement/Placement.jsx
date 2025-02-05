"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourse } from "../Redux/action/Course.js";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image.js";
import t from "../assests/profile/f.png";
const Placement = () => {
  const courses = useSelector((state) => state?.course?.courses);
  const dispatch = useDispatch();
  const router = useRouter();
  const search = useSearchParams();
  const courseName = search.get("courseName");

  useEffect(() => {
    dispatch(fetchCourse());
  }, [dispatch]);

  return (
    <div className="">
      <div className="bg-[#a5c2f0] py-12 lg:py-28 mt-4 lg:mt-28">
        {/* <div className="flex justify-end">
                      <Image src={i} className="rounded-full object-cover w-44 h-44" alt=""/>
                    </div> */}
        <span className="mt-24 text-center lg:mt-16 lg:text-start text-sm lg:text-2xl px-3 lg:px-16 text-garet text-base font-medium flex items-center">
          Home <IoIosArrowForward className="" />
          Courses
          <IoIosArrowForward className="" />
          {courseName}
        </span>
        <h1 className="mt-6 text-center lg:mt-3 text-4xl px-3 lg:px-16 lg:text-start font-semibold text-[#0d1039] font-garet lg:mb-12">
          {courseName}
        </h1>
      </div>
      <div className="flex mt-6 lg:-mt-20 items-center gap-3 lg:gap-8 px-3 lg:px-16">
        <button className="bg-blue-300 shadow-inner p-2 rounded-md text-sm lg:text-xl lg:text-start font-medium text-[#0d1039] font-garet">
          Course Overview
        </button>
        <button className="bg-blue-300 shadow-inner p-2 rounded-md text-center text-sm lg:text-xl lg:text-start font-medium text-[#0d1039] font-garet">
          Student Works
        </button>
        <button className="bg-blue-300 shadow-inner p-2 rounded-md text-center text-sm lg:text-xl lg:text-start font-medium text-[#0d1039] font-garet">
          Faculties
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 px-2 lg:px-16">
        <div className="flex flex-col">
          <p className="font-garet font-medium text-md lg:text-xl text-[#0d1039] py-12 lg:mt-12">
            The Postgraduate Diploma in Plastic Trims Design is a speciaspanzed
            program designed to equip students with the technical knowledge and
            industry-relevant skills required for designing high-quaspanty
            plastic trims for automotive, consumer products, and other
            industrial appspancations. This course blends theoretical concepts
            with hands-on training, ensuring a comprehensive understanding of
            plastic materials, manufacturing processes, and design
            methodologies.
          </p>
          <p className="font-garet font-medium text-md lg:text-xl text-[#0d1039] mt-4 flex flex-col space-y-2">
            <b>Key Highspanghts:</b>
            <span>
              ✔ In-depth study of plastic materials, properties, and
              appspancations{" "}
            </span>
            <span>✔ CAD-based plastic trim design and development</span>
            <span>
              ✔ Understanding of injection molding and other manufacturing
              techniques
            </span>
            <span>
              ✔ Understanding of injection molding and other manufacturing
              techniques
            </span>
            <span>✔ Toospanng and surface finishing considerations</span>
            <span>
              ✔ Industry case studies and real-world project appspancations
            </span>
            <span>
              ✔ Training on industry-standard software and design vaspandation
              tools
            </span>
          </p>
        </div>
      </div>
      <div className="text-[#0d1039] font-garet text-center text-2xl lg:text-start lg:text-5xl mt-12 px-3 lg:px-28 mb-8">
        <b>Faculties</b>
      </div>
      <div className="grid grid-cols-12 px-3 lg:px-16 mb-12">
        <div className="col-span-12 lg:col-span-4">
          <Image src={t} alt="" className="object-cover" />
        </div>
        <div className="flex flex-col col-span-12 lg:col-span-8">
          <h1 className="text-[#0d1039] font-garet text-xl lg:text-3xl lg:text-start text-center mt-2 lg:mt-0">
            <b>Bharadwaj</b>
          </h1>
          <h2 className="text-[#0d1039] font-garet font-medium text-lg lg:text-2xl lg:text-start text-center">
            Programme Director | Vehicle Engineer
          </h2>
          <p className="font-garet font-medium text-lg text-[#0d1039] mt-4 w-4/4">
            Bharadwaj is a seasoned Vehicle Engineer with 12+ years of global
            experience in the automotive industry, currently working at Ford,
            USA. He has led multinational product development teams and
            possesses end-to-end expertise in the product development life
            cycle, from concept to production. With a strong background in
            cross-functional collaboration, he has hands-on experience in
            product development, manufacturing, supplier quality, purchasing,
            and packaging across Asia, Europe, and North America. A Six Sigma
            Green Belt expert, Bharadwaj excels in team building, process
            optimization, and driving continuous improvement.
          </p>
          <p className="text-[#0d1039] font-garet text-lg mt-4 space-y-2 mb-6">
            <b>Previous Experience:</b>
            <li>Ford Motor Company, USA</li>
            <li>North Carolina University, USA</li>
            <li>ZF Group, Malaysia & Singapore</li>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-12 px-3 lg:px-16 mb-12">
        <div className="flex flex-col col-span-12 lg:col-span-8">
          <h1 className="text-[#0d1039] font-garet  text-xl lg:text-3xl lg:text-start text-center">
            <b>Walid Ghidhaoui</b>
          </h1>
          <h2 className="text-[#0d1039] font-garet font-medium text-2xl lg:text-start text-center">
           Programme instructor | Designer
          </h2>
          <p className="font-garet font-medium text-lg text-[#0d1039] mt-4 lg:w-3/4">
          Walid Ghidhaoui is an expert CATIA automotive industrial designer with 20 years of experience in the industry. Currently working at SOTACIB, Tunisia, he specializes in CATIA surfacing and freestyle design, bringing innovative automotive projects to life.
          With extensive experience across Sofemed, Isuzu, and SOTACIB Kairouan, Walid has a deep understanding of automotive modeling in CATIA V, delivering high-quality designs that align with industry standards.
          </p>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <Image src={t} alt="" className="object-cover" />
        </div>
      </div>

      <div className="grid grid-cols-12 px-3 lg:px-16 mb-12">
        <div className="col-span-12 lg:col-span-4">
          <Image src={t} alt="" className="object-cover" />
        </div>
        <div className="flex flex-col col-span-12 lg:col-span-8">
          <h1 className="text-[#0d1039] font-garet  text-xl lg:text-3xl lg:text-start text-center mt-2 lg:mt-0">
            <b>Aswin Kumar</b>
          </h1>
          <h2 className="text-[#0d1039] font-garet font-medium text-2xl lg:text-start text-center">
          Programme Instructor
          </h2>
          <p className="font-garet font-medium text-lg text-[#0d1039] mt-4">
          Aswin Kumar is a seasoned CAE expert with 12 years of experience in automotive, structural, and fatigue analysis. Currently a Manager at Optimuz TS, he has worked across multiple domains, specializing in wind turbine certification, compliance, and multi-industry CAE projects.
          His career includes roles at L&T Technology Services, IIT Madras (Research Associate), and RRB Energy Ltd, contributing to projects for TATA Motors, Saint Gobain, Vestas, Carrier, Takarta, TAFE, CAT, John Deere, and Calsonic Kansei. With expertise in machine design and simulation, he has played a key role in advancing engineering solutions across industries.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-12 px-3 lg:px-16 mb-12">
        <div className="flex flex-col col-span-12 lg:col-span-8">
          <h1 className="text-[#0d1039] font-garet  text-xl lg:text-3xl lg:text-start text-center">
            <b>Boopalan</b>
          </h1>
          <h2 className="text-[#0d1039] font-garet font-medium text-2xl lg:text-start text-center">
          Programme instructor | BIW Team Lead
          </h2>
          <p className="font-garet font-medium text-lg text-[#0d1039] mt-4 lg:w-3/4">
          Boopalan is a BIW Team Lead at Ford, India, with 12 years of experience in automotive body structures design and manufacturing technologies. A strong leader, he has extensive expertise in BIW (Body-in-White) design, engineering, and product development, ensuring compliance with quality standards.
         Having worked with Ford Motor Company, RLE International, and Mahindra & Mahindra, Boopalan has successfully collaborated with leading OEMs and component manufacturers, driving innovation in automotive BIW structures.
          </p>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <Image src={t} alt="" className="object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Placement;
