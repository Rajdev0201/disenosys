"use client"
import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Testimonials = () => {

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3000,
        cssEase: "linear"
    };

    return (
        <section className="bg-white">
            <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16 slider-container">
                <h2 className="text-center font-bold font-poppins text-[#182073] text-xl lg:text-5xl">
                    Read trusted reviews from our Students
                </h2>
                <Slider {...settings}>
                    {[...Array(3)].map((_, index) => (
                        <div className="p-4" key={index}>
                            <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
                                <div className="flex items-center gap-4">
                                    <img
                                        alt=""
                                        src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                                        className="size-20 rounded-full object-cover"
                                    />
                                    <div>
                                        <div className="flex justify-center gasp-0.5 text-[#182073]">
                                            {/* Star icons */}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5 ">
                                                <path d="M10 15.27L16.18 19 14.54 12.97 20 8.25 13.81 7.63 10 1 6.19 7.63 0 8.25l5.46 4.72L3.82 19z" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                                                <path d="M10 15.27L16.18 19 14.54 12.97 20 8.25 13.81 7.63 10 1 6.19 7.63 0 8.25l5.46 4.72L3.82 19z" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                                                <path d="M10 15.27L16.18 19 14.54 12.97 20 8.25 13.81 7.63 10 1 6.19 7.63 0 8.25l5.46 4.72L3.82 19z" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                                                <path d="M10 15.27L16.18 19 14.54 12.97 20 8.25 13.81 7.63 10 1 6.19 7.63 0 8.25l5.46 4.72L3.82 19z" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                                                <path d="M10 15.27L16.18 19 14.54 12.97 20 8.25 13.81 7.63 10 1 6.19 7.63 0 8.25l5.46 4.72L3.82 19z" />
                                            </svg>
                                        </div>
                                        <p className="mt-0.5 text-lg font-medium text-gray-900">Paul Starr</p>
                                    </div>
                                </div>
                                <p className="mt-4 text-gray-700">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa sit rerum incidunt, a
                                    consequuntur recusandae ab saepe illo est quia obcaecati neque quibusdam eius accusamus
                                    error officiis atque voluptates magnam!
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
