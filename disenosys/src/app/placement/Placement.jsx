"use client";
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourse } from '../Redux/action/Course.js';

const Placement = () => {
    const courses = useSelector((state) => state?.course?.courses);
    const dispatch = useDispatch();
    const router = useRouter();
    const search = useSearchParams();
    const courseName = search.get("courseName");

    useEffect(() => {
        dispatch(fetchCourse());
    }, [dispatch]);

    const courseMapping = {
        "PG Diploma Plastic Trims Design": [
            "CATIA Foundations for Automative Designers",
            "Advanced CATIA Surface",
            "Surface Remastering for Automotive Designers",
            "Automotive Close Volume & Feature Creation",
            "Fundamentals of Plastic Trims",
        ],
        "PG Diploma Plastic BIW Design": [
            "CATIA Foundations for Automative Designers",
            "Advanced CATIA Surface",
            "Surface Remastering for Automotive Designers",
            "Bracket And Reinforcement",
            "Fundamentals Of BIW in Automotive Design",
        ],
        "Masters in Automotive Plastic Body Design": [
            "Solid Model Remastering",
            "Automotive B-Pillar Assembly",
            "Bracket And Reinforcement",
        ]
    };

    const specificCourses = courseMapping[courseName] || [];
    
    // Filter and sort courses
    const filteredCourses = courses
        ?.filter(course => specificCourses.includes(course?.courseName))
        ?.sort((a, b) => specificCourses.indexOf(a.courseName) - specificCourses.indexOf(b.courseName));

    const goToDescriptionPage = (courseId) => {
        router.push(`/description?courseId=${courseId}`);
    };

    return (
        <div className='bg-[#182073] min-h-screen w-full'>
            <div className='container mx-auto p-0 pt-2  text-center'>
                <h1 className='text-2xl mt-3 font-semibold font-poppins text-[#182073] md:text-3xl lg:text-5xl'>
                    <span className='text-white'>{courseName}</span>
                </h1>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-5 p-8 md:p-2 mt-3 gap-2 md:mb-0 lg:mb-8 lg:fixed' > 
                {filteredCourses?.length > 0 ? (
                    filteredCourses.map((course) => (
                        <div 
                            key={course.id} 
                            className="flex flex-col rounded w-full h-80 md:h-[638px] bg-cover bg-center hover:cursor-pointer" 
                            style={{ backgroundImage: `url(${course?.imagePath})` }}
                            onClick={() => goToDescriptionPage(course?._id)}
                        >
                            <div className="flex-grow flex flex-col items-center justify-center px-6 py-8 sm:p-10 sm:pb-6 bg-black bg-opacity-50 rounded"> {/* Add a background for better visibility */}
                                <h2 className="text-md font-medium tracking-tighter text-white text-center lg:text-3xl leading-relaxed tracking-tighter">
                                    <span>{course.courseName}</span>
                                </h2>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No courses available for {courseName}</p> 
                )}
            </div>
        </div>
    );
};

export default Placement;

