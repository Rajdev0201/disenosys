"use client";
import React, { useState } from 'react';
import Card from '../component/ProfilePage/Card';
import one from "../assests/models/slide1.png";
import { RiProfileFill } from 'react-icons/ri';
import Image from 'next/image';

const Description = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className='mt-0'>
      <Card />

      <div className='container mx-auto px-4 py-4 max-w-screen-lg'>
        <div className='flex space-x-8 border-b border-gray-300'>
          <div
            className={`cursor-pointer pb-2 ${activeTab === 'overview' ? 'font-bold border-b-2 border-blue-600 text-[#182073]' : 'font-normal'}`}
            onClick={() => setActiveTab('overview')}
          >
            <p>Resume</p>
          </div>

          <div
            className={`cursor-pointer pb-2 ${activeTab === '3dmodels' ? 'font-bold border-b-2 border-blue-600 text-[#182073]' : 'font-normal'}`}
            onClick={() => setActiveTab('3dmodels')}
          >
            <p>3D Models</p>
          </div>
        </div>

        <div className="mt-4 w-full ">
          {activeTab === 'overview' && (
            <div className='bg-[#182073]'>
              <img src='https://marketplace.canva.com/EAFSLI7n6x4/1/0/1131w/canva-minimalist-white-and-grey-professional-resume-KjN0Z-p3Mo8.jpg'
                className='object-cover'
              />
            </div>
          )}

          {activeTab === '3dmodels' && (
            <div className="container mx-auto px-4 py-8 max-w-screen-lg ">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Box 1 */}
                <div className="shadow-md rounded-lg overflow-hidden">
                  <Image
                    src={one}
                    alt="User profile"
                    className="w-full h-48 object-cover"
                  />
                  <div className="border-b-2 border-gray-300 mt-4"></div>
                  <div className="p-4 flex justify-between">
                    <RiProfileFill size={30} className='text-[#182073]' />
                    <p className="text-center font-semibold text-gray-800">Cad draft</p>
                  </div>
                </div>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                  <Image
                    src={one}
                    alt="User profile"
                    className="w-full h-48 object-cover"
                  />
                  <div className="border-b-2 border-gray-300 mt-4"></div>
                  <div className="p-4 flex justify-between">
                    <RiProfileFill size={30} className='text-[#182073]' />
                    <p className="text-center font-semibold text-gray-800">Cad draft</p>
                  </div>
                </div>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                  <Image
                    src={one}
                    alt="User profile"
                    className="w-full h-48 object-cover"
                  />
                  <div className="border-b-2 border-gray-300 mt-4"></div>
                  <div className="p-4 flex justify-between">
                    <RiProfileFill size={30} className='text-[#182073]' />
                    <p className="text-center font-semibold text-gray-800">Cad draft</p>
                  </div>
                </div>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                  <Image
                    src={one}
                    alt="User profile"
                    className="w-full h-48 object-cover"
                  />
                  <div className="border-b-2 border-gray-300 mt-4"></div>
                  <div className="p-4 flex justify-between">
                    <RiProfileFill size={30} className='text-[#182073]' />
                    <p className="text-center font-semibold text-gray-800">Cad draft</p>
                  </div>
                </div>
              </div>

              
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Description;
