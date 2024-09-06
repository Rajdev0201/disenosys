"use client";

import React from 'react';
import CountUp from "react-countup";
import "../component/Navbar/Navbar.css";

export default function Count() {
    return (
        <section className="box-shadow bg-slate-800 p-10">
            <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
            <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl text-gray-300 box-shadow p-2">Numbers tell Our story</h2>
            {/* <div className='border  mt-4'></div> */}
           </div>

                <div className="grid grid-cols-1 gap-8 text-center lg:mt-24 sm:gap-x-8 gap-y-12 md:grid-cols-3">
                    {[
                        { end: 460000, label: "Trained" },
                        { end: 6700, label: "Reviews with 4.5/5 rating" },
                        { end: 7000, label: "Live Classes Every Month" },
                        { end: 900, label: "Corporate Partners" },
                        { end: 210, label: "College Partners" },
                        { end: 87, label: "Reported Career Benefits", isPercentage: true },
                    ].map((item, index) => (
                        <div key={index} className="p-6 border-2 border-[#F1F1F5] rounded-lg hover:border-[#182073] transition duration-300 ease-in-out">
                            <h3 className="font-bold text-5xl sm:text-6xl lg:text-7xl">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#057FE3]  to-[#182073]">
                                    <CountUp
                                        start={0}
                                        end={item.end}
                                        duration={10}
                                    />
                                    {item.isPercentage ? "%" : "+"}
                                </span>
                            </h3>
                            <p className="text-base mt-3 text-gray-500">{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}


