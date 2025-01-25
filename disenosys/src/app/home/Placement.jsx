"use client"
import React from 'react'
import './Home.css'
import { useRouter } from 'next/navigation';

const Program = () => {

    const router = useRouter();

    const pg = (name) => {
        router.push(`/placement?courseName=${name}`);
      };
    
  return (
    <div>
  
      <div className='container mx-auto p-0 mt-8 pt-12 text-center bg-white'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-medium px-4 md:px-12 font-garet lg:px-3 text-[#0d1039] text-center'>
          Placement <span className='text-[#0d1039]'>Programs</span>
        </h1>
      </div>


      <div className='grid grid-cols-1 md:grid-cols-3 p-0 lg:p-16 gap-12'> 
       
      <div className="relative flex flex-col w-full h-[700px] shadow-lg shadow-blue-500/20">
  <div className="absolute inset-0 bg-1 opacity-50 rounded-lg pointer-events-none"></div>

  <div className="relative flex-grow flex flex-col items-center justify-center px-6 py-8 sm:p-10 sm:pb-6">
    <h2 className="text-lg font-bold tracking-tighter text-[#0d1039] text-center lg:text-3xl leading-relaxed tracking-tighter">
      <span>PG Diploma in Plastic</span> 
      <br/>
      <span>Trims Design</span>
    </h2>
  </div>
  <div className="relative flex justify-center px-6 pb-8">
    <button
      className=" px-6 py-2.5 text-center text-black bg-[#0d1039] font-poppins font-bold text-white rounded hover:bg-transparent hover:text-gray-800 duration-200"
      onClick={() => pg("PG Diploma Plastic Trims Design")}
    >
      APPLY NOW   
    </button>
  </div>
       </div>


      <div className="relative flex flex-col w-full h-[700px] shadow-lg shadow-blue-500/20">
  <div className="absolute inset-0 bg-2 opacity-50 rounded-lg pointer-events-none"></div>
  <div className="relative flex-grow flex flex-col items-center justify-center px-6 py-8 sm:p-10 sm:pb-6">
            <h2 className="text-lg font-bold tracking-tighter text-[#0d1039] text-center lg:text-3xl leading-relaxed tracking-tighter">
              <span>PG Diploma in Plastic</span> 
              <br/>
              <span>BIW Design</span>
            </h2>
          </div>
          <div className="relative flex justify-center px-6 pb-8">
            <button className="px-6 py-2.5 text-center text-black bg-[#0d1039] font-poppins font-bold text-white rounded hover:bg-transparent hover:text-gray-800 duration-200" onClick={() => pg("PG Diploma Plastic BIW Design")}>
              APPLY NOW
            </button>
          </div>
        </div>


        <div className="relative flex flex-col w-full h-[700px] shadow-lg shadow-blue-500/20">
  <div className="absolute inset-0 bg-3 opacity-50 rounded-lg pointer-events-none"></div>
         <div className="relative flex-grow flex flex-col items-center justify-center px-6 py-8 sm:p-10 sm:pb-6">
            <h2 className="text-lg font-bold tracking-tighter text-[#0d1039] text-center lg:text-3xl leading-relaxed tracking-tighter">
            <span>Masters in Automotive</span> 
              <br/>
              <span>Body Design</span>
            </h2>
          </div>
          <div className="relative flex justify-center px-6 pb-8">
            <button className="px-6 py-2.5 text-center text-black bg-[#0d1039] font-poppins font-bold text-white rounded hover:bg-transparent hover:text-gray-800 duration-200" onClick={() => pg("Masters in Automotive Plastic Body Design")}>
              APPLY NOW
            </button>
          </div>
        </div>
        </div>
      </div>

  )
}

export default Program;
