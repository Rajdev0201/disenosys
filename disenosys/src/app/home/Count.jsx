"use client";

import React from 'react';
import CountUp from "react-countup";
import "../component/Navbar/Navbar.css";

export default function Count() {
    return (
        <section className="box-shadow bg-white p-10">
            <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
            <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-3xl font-bold leading-tight font-poppins sm:text-4xl lg:text-5xl text-[#182073] p-2">Numbers tell Our story</h2>
            {/* <div className='border  mt-4'></div> */}
           </div>

                <div className="grid grid-cols-1 gap-8 text-center lg:mt-24 sm:gap-x-8 gap-y-12 md:grid-cols-3">
                    {[
                        { end: 5000, label: "Trained" },
                        { end: 3800, label: "Reviews with 5 star rating" },
                        { end: 500, label: "Live Classes Every Month" },
                        { end: 900, label: "Corporate Partners" },
                        { end: 210, label: "College Partners" },
                        { end: 87, label: "Reported Career Benefits", isPercentage: true },
                    ].map((item, index) => (
                        <div key={index} className="p-6 border-2 border-[#F1F1F5] bg-[#182073] rounded-lg hover:border-[#182073] transition duration-300 ease-in-out">
                            <h3 className="font-bold text-3xl sm:text-6xl lg:text-5xl">
                                <span className=" bg-clip-text text-red-600">
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


