"use client";
import React, { useEffect, useRef, useState } from 'react';
import Auth from "./Auth.jsx";
import { TbMoodCry } from "react-icons/tb";
import { LiaHourglassStartSolid } from "react-icons/lia";

export default function AdminPage() {
 
  const [isExamOpen, setIsExamOpen] = useState(false);
  const [isBeforeExam, setIsBeforeExam] = useState(true);
  const [currentTime, setCurrentTime] = useState({
    formattedHour: '',
    currentMinute: '',
    amPm: ''
  });

  const updateTime = () => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    const amPmValue = currentHour < 12 ? 'AM' : 'PM';
    const formattedHourValue = currentHour % 12 === 0 ? 12 : currentHour % 12;

    // Update state with the current time
    setCurrentTime({
      formattedHour: formattedHourValue,
      currentMinute: String(currentMinute).padStart(2, '0'),
      amPm: amPmValue
    });
  };

  const checkTime = () => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    const examStartTime = currentHour === 11 && currentMinute >= 0 && currentMinute <= 30; 
    const beforeExamTime = currentHour >= 0 && currentHour < 11; 

    setIsExamOpen(examStartTime);
    setIsBeforeExam(beforeExamTime);
  };

  useEffect(() => {
    updateTime();
    const timer = setInterval(() => {
      updateTime();
      checkTime();
    }, 1000);

    return () => clearInterval(timer);
  }, []);



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-800 to-gray-900">
      {isExamOpen ? (
        <Auth />
      ) : isBeforeExam ? (
        // Box to display if the user comes before 11:00 AM
        <div className="flex flex-col items-center justify-center w-full h-full p-5">
          <div className='flex flex-row space-x-8'>
          <div className="bg-[#182073] text-white text-lg p-5 rounded-lg shadow-lg max-w-md text-center space-y-6 rounded-b-lg border-b-8 border-white">
            <h2 className="font-bold text-2xl">You're Early, But That's a Good Thing!</h2>
            <div className='flex justify-center items-center'>
            <LiaHourglassStartSolid size={40} className='text-yellow-100'/>
            </div>
            <p className="mt-4 text-base text-gray-200">
            Looks like you're ready to ace the exam, but the exam window hasn't opened yet! Please come back at 11 AM IST to start your test. Set a reminder, and we’ll see you soon!
            </p>
          </div>
          <div className="relative group cursor-pointer flex flex-col justify-center items-center w-40 h-auto bg-neutral-900 text-gray-50 rounded-2xl shadow-lg overflow-hidden">
              <div className="after:duration-500 before:duration-500 duration-500 
                  group-hover:before:translate-x-11 group-hover:before:-translate-y-11 
                  group-hover:after:translate-x-11 group-hover:after:translate-y-16 
                  after:absolute after:w-12 after:h-12 after:bg-orange-400 
                  after:rounded-full after:-z-10 after:blur-xl after:bottom-20 after:right-10 
                  before:absolute before:w-20 before:h-20 before:bg-sky-400 
                  before:rounded-full before:-z-10 before:blur-xl before:top-16 before:right-8 
                  flex flex-col font-extrabold text-4xl z-10">
                <div className='flex space-x-1'>
                <span className=''>{String(currentTime.formattedHour).padStart(2, '0')}</span>
                :
                <span className=''>{currentTime.currentMinute}</span>
                <span className="text-center text-sm mt-3">{currentTime.amPm}</span>
                </div>
              </div>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                <svg className="w-4 h-4 stroke-current" height="100" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100" width="100" xmlns="http://www.w3.org/2000/svg">
                  <path d="M33.9,46V29.9a16.1,16.1,0,0,1,32.2,0M50,62v8.1m-24.1,16H74.1a8,8,0,0,0,8-8V54a8,8,0,0,0-8-8H25.9a8,8,0,0,0-8,8V78.1A8,8,0,0,0,25.9,86.1Z" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Box to display if the user misses the exam (after 11:30 AM)
        <div className="flex flex-col items-center justify-center w-full h-full p-5">
          <div className='flex flex-row space-x-8'>
            <div className="bg-[#182073] text-white text-lg p-5 rounded-lg shadow-lg max-w-md text-center space-y-6 rounded-b-lg border-b-8 border-red-600">
              <h2 className="font-bold text-2xl text-red-600">Oops, You Missed the Exam!</h2>
              <div className='flex justify-center items-center'>
                <TbMoodCry size={60} className='text-red-300' />
              </div>
              <p className="mt-4 text-base text-gray-300">
              The exam window has closed for today. Don't worry though! Stay tuned for the next opportunity and be sure to check back in time next round. We’re rooting for you!
              </p>
            </div>

            <div className="relative group cursor-pointer flex flex-col justify-center items-center w-40 h-auto bg-neutral-900 text-gray-50 rounded-2xl shadow-lg overflow-hidden">
              <div className="after:duration-500 before:duration-500 duration-500 
                  group-hover:before:translate-x-11 group-hover:before:-translate-y-11 
                  group-hover:after:translate-x-11 group-hover:after:translate-y-16 
                  after:absolute after:w-12 after:h-12 after:bg-orange-400 
                  after:rounded-full after:-z-10 after:blur-xl after:bottom-20 after:right-10 
                  before:absolute before:w-20 before:h-20 before:bg-sky-400 
                  before:rounded-full before:-z-10 before:blur-xl before:top-16 before:right-8 
                  flex flex-col font-extrabold text-4xl z-10">
                <div className='flex space-x-1'>
                <span className=''>{String(currentTime.formattedHour).padStart(2, '0')}</span>
                :
                <span className=''>{currentTime.currentMinute}</span>
                <span className="text-center text-sm mt-3">{currentTime.amPm}</span>
                </div>
              </div>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                <svg className="w-4 h-4 stroke-current" height="100" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100" width="100" xmlns="http://www.w3.org/2000/svg">
                  <path d="M33.9,46V29.9a16.1,16.1,0,0,1,32.2,0M50,62v8.1m-24.1,16H74.1a8,8,0,0,0,8-8V54a8,8,0,0,0-8-8H25.9a8,8,0,0,0-8,8V78.1A8,8,0,0,0,25.9,86.1Z" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
