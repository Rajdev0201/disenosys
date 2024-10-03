"use client";
import React from 'react';
import one from "../assests/models/slide1.png";
import Image from 'next/image';
import { RiProfileFill } from 'react-icons/ri';
import { useRouter } from 'next/navigation';


const Models = () => {
  const router = useRouter();

  const onClick = () => {
    router.push("/profileDescription");
  }
  return (
    <div className="bg-white mt-28">
      <div className="px-20 container mx-auto py-16">
        <h1 className="text-2xl font-bold font-Poppins mb-4">Model Showcase</h1>

      
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          
    
          <div className="col-span-1">
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#182073]"
              placeholder="Search 3D models"
            />
          </div>


          <div className="col-span-1">
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#182073]"
            >
              <option value="" disabled selected>
                Any Category
              </option>
          
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
            </select>
          </div>

          <div className="col-span-1">
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#182073]"
            >
              <option value="" disabled selected>
                Formats
              </option>
         
              <option value="format1">Format 1</option>
              <option value="format2">Format 2</option>
            </select>
          </div>


          <div className="col-span-1">
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#182073]"
            >
              <option value="" disabled selected>
                Filters
              </option>

              <option value="filter1">Filter 1</option>
              <option value="filter2">Filter 2</option>
            </select>
          </div>
        </div>

        <div className="xl:container mx-auto px-0 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Box 1 */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden hover:cursor-pointer" onClick={onClick}>
          <Image
            src={one}
            alt="User profile"
            className="w-full h-48 object-cover"
          />
          <div className="border-b-2 border-gray-300 mt-4"></div>
          <div className="p-4 flex justify-between">
            <RiProfileFill size={30} className='text-[#182073]'/>
            <p className="text-center font-semibold text-gray-800">Cad draft</p>
          </div>
        </div>
        
        {/* Box 2 */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden hover:cursor-pointer">
        <Image
            src={one}
            alt="User profile"
            className="w-full h-48 object-cover"
          />
          <div className="border-b-2 border-gray-300 mt-4"></div>
          <div className="p-4 flex justify-between">
            <RiProfileFill size={30} className='text-[#182073]'/>
            <p className="text-center font-semibold text-gray-800">Cad draft</p>
          </div>
        </div>

        {/* Box 3 */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden hover:cursor-pointer">
        <Image
            src={one}
            alt="User profile"
            className="w-full h-48 object-cover"
          />
          <div className="border-b-2 border-gray-300 mt-4"></div>
          <div className="p-4 flex justify-between">
            <RiProfileFill size={30} className='text-[#182073]'/>
            <p className="text-center font-semibold text-gray-800">Cad draft</p>
          </div>
        </div>

        {/* Box 4 */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden hover:cursor-pointer">
        <Image
            src={one}
            alt="User profile"
            className="w-full h-48 object-cover"
          />
          <div className="border-b-2 border-gray-300 mt-4"></div>
          <div className="p-4 flex justify-between">
            <RiProfileFill size={30} className='text-[#182073]'/>
            <p className="text-center font-semibold text-gray-800">Cad draft</p>
          </div>
        </div>

      </div>
        </div>


      </div>
    </div>
  );
};

export default Models;
