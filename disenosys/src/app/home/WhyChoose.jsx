import Image from 'next/image';
import React from 'react';
import learn from "../assests/icon-2.png";
import grad from "../assests/icon-3.png";
import work from "../assests/icon-1.png";
import line from "../assests/line.png";

const WhyChoose = () => {
    return (
        <div className='bg-[#182073] w-full h-auto'>
            <div className='container mx-auto p-12 text-center'>
                <h1 className='text-2xl font-semibold font-poppins text-white md:text-3xl lg:text-4xl'>
                    Why <span className='text-white'>learn</span> with our courses?
                </h1>
                <p className='text-sm text-gray-300 font-josefin mt-4 md:text-base lg:text-lg'>
                Our courses offer expert-led training and hands-on practice. Equip yourself with the skills and knowledge needed to excel in your field
                </p>
            </div>
            <div className='flex flex-col md:flex-row container mx-auto p-12 justify-center items-center gap-12'>
                <div className='flex flex-col justify-center items-center text-center'>
                    <Image src={learn} alt='Learn' className='' />
                    <div className='mt-6'>
                        <h4 className='text-lg font-semibold font-poppins text-white md:text-xl lg:text-2xl'>
                            01. Learn
                        </h4>
                        <p className='text-sm text-gray-300 font-medium font-josefin mt-3 md:text-base lg:text-md'>
                        Gain in-depth knowledge through our interactive lessons. Our expert instructors will guide you through each topic with real-world examples
                        </p>
                    </div>
                </div>
                <div className='hidden md:flex items-center'>
                    <Image src={line} alt='Line' className='' />
                </div>
                <div className='flex flex-col justify-center items-center text-center'>
                    <Image src={grad} alt='Graduate' className='' />
                    <div className='mt-6'>
                        <h4 className='text-lg font-semibold font-poppins text-white md:text-xl lg:text-2xl'>
                            02. Graduate
                        </h4>
                        <p className='text-sm text-gray-300 font-medium font-josefin mt-3 md:text-base lg:text-md'>
                        Earn a recognized certificate upon course completion. Join our network of successful alumni who have advanced their careers
                        </p>
                    </div>
                </div>
                <div className='hidden md:flex items-center'>
                    <Image src={line} alt='Line' className='' />
                </div>
                <div className='flex flex-col justify-center items-center text-center'>
                    <Image src={work} alt='Work' className='' />
                    <div className='mt-6'>
                        <h4 className='text-lg font-semibold font-poppins text-white md:text-xl lg:text-2xl'>
                            03. Work
                        </h4>
                        <p className='text-sm text-gray-300 font-medium font-josefin mt-3 md:text-base lg:text-md'>
                        Apply your skills in practical, industry-based projects. Our job assistance ensures you are prepared for the professional world.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyChoose;
