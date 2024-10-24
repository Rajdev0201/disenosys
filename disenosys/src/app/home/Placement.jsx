"use client"

import React from 'react'
// import Image from 'next/image';
// import pgd from "../assests/profile/PGD.png";
import './Home.css'
const Program = () => {
  return (
    <div>
      {/* Title Section */}
      <div className='container mx-auto p-0 mt-8 pt-12 text-center'>
        <h1 className='text-2xl font-semibold font-poppins text-[#182073] md:text-3xl lg:text-5xl'>
          Placement <span className='text-[#182073]'>Programs</span>
        </h1>
      </div>

      {/* Cards Section */}
      <div className='grid grid-cols-1 md:grid-cols-3 p-24 gap-12'> 
        {/* Card 1 */}
        <div className="flex flex-col bg-1 rounded-3xl w-full h-screen">
            {/* <Image src={pgd} className='w-full h-full'/> */}
          <div className="flex-grow flex flex-col items-center justify-center px-6 py-8 sm:p-10 sm:pb-6">
            <h2 className="text-lg font-medium tracking-tighter text-white text-center lg:text-3xl leading-relaxed tracking-tighter">
              <span>PG Diploma in Plastic</span> 
              <br/>
              <span>Trims Design</span>
            </h2>
          </div>
          <div className="flex justify-center px-6 pb-8">
            <a className="w-full px-6 py-2.5 text-center text-black bg-white border-2 border-white rounded-full hover:bg-transparent hover:text-white duration-200" href="#">
              Get started
            </a>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col bg-2 rounded-3xl w-full h-screen">
            
          <div className="flex-grow flex flex-col items-center justify-center px-6 py-8 sm:p-10 sm:pb-6">
            <h2 className="text-lg font-medium tracking-tighter text-white text-center lg:text-3xl leading-relaxed tracking-tighter">
              <span>PG Diploma in Plastic</span> 
              <br/>
              <span>BIW Design</span>
            </h2>
          </div>
          <div className="flex justify-center px-6 pb-8">
            <a className="w-full px-6 py-2.5 text-center text-black bg-white border-2 border-white rounded-full hover:bg-transparent hover:text-white duration-200" href="#">
              Get started
            </a>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col bg-3 rounded-3xl w-full h-screen">
          <div className="flex-grow flex flex-col items-center justify-center px-6 py-8 sm:p-10 sm:pb-6">
            <h2 className="text-lg font-medium tracking-tighter text-white text-center lg:text-3xl leading-relaxed tracking-tighter">
            <span>PG Diploma in Plastic</span> 
              <br/>
              <span>Body Design</span>
            </h2>
          </div>
          <div className="flex justify-center px-6 pb-8">
            <a className="w-full px-6 py-2.5 text-center text-black bg-white border-2 border-white rounded-full hover:bg-transparent hover:text-white duration-200" href="#">
              Get started
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Program;
