"use client";

import React from 'react';
import CountUp from "react-countup";
import "../component/Navbar/Navbar.css";

export default function Count() {
    return (
        <section className="box-shadow bg-[#0d1039]">
            <div className="max-w-7xl  mx-auto px-3 py-9">
            <div class="max-w-md mt-3 text-start">
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-medium px-4 md:px-12 font-garet lg:px-3 text-white mb-8  ">NUMBERS TELL OUR STORY</h2>
            {/* <div className='border  mt-4'></div> */}
           </div>

                <div className="grid grid-cols-1 gap-8 text-center lg:mt-12 sm:gap-x-28 gap-y-12 md:grid-cols-3">
                    {[
                        { end: 5000, label: "Trained" },
                        { end: 3800, label: "Reviews with 5 star rating" },
                        { end: 200, label: "Live Classes Every Month" },
                        { end: 85, label: "Corporate Partners" },
                        { end: 210, label: "College Partners" },
                        { end: 87, label: "Reported Career Benefits", isPercentage: true },
                    ].map((item, index) => (
                        <div key={index} className="p-6 rounded-lg flex flex-col items-start justify-start space-y-3 transition duration-300 ease-in-out">
                            <div className='w-6 h-1 bg-white'></div>
                            <h3 className="font-medium text-3xl sm:text-6xl font-garet lg:text-6xl">
                                <span className=" bg-clip-text text-white">
                                    <CountUp
                                        start={0}
                                        end={item.end}
                                        duration={10}
                                    />
                                    {item.isPercentage ? "%" : "+"}
                                </span>
                            </h3>
                            <p className="text-base mt-3 text-gray-200">{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}


