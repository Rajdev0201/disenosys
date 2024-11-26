"use client"
import { useSearchParams } from 'next/navigation'
import React from 'react'
import Head from "next/head";
import { FaFacebook, FaLinkedin } from 'react-icons/fa'
import { IoLinkSharp } from 'react-icons/io5'





const Results = () => {
    const search = useSearchParams();
    // const catia = Number(search.get("catia")) || 0; 
    // const product = Number(search.get("product")) || 0;
    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
    const catia = clamp(Number(search.get("catia")) || 0, 0, 100); // Ensure valid score
  const product = clamp(Number(search.get("product")) || 0, 0, 100);
  
    const calculateYourScore = (catia, product) => (catia + product) / 2;
  
    const radius = 50;
    const stroke = 8;
    const normalizedRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizedRadius;
  
    const createStrokeDashoffset = (score) =>
      circumference - (score / 100) * circumference;
  
    const yourScore = calculateYourScore(catia, product);
    const getCEFRLevel = (score) => {
      if (score < 40) return "A1/A2 Beginner";
      if (score < 70) return "B1/B2 Intermediate";
      return "C1/C2 Advanced";
    };
    const yourLevel = getCEFRLevel(yourScore);

   const scorePageUrl = `https://www.disenosys.com/quicktest`;
   const shareToLinkedIn = () => {
    const scorePageUrl = `https://www.disenosys.com/results`;
    const metaTitle = `Your English Proficiency Score: ${yourScore}%`;
    const metaDescription = `Take the challenge and improve your skills! Visit now to explore your results.`;

    window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(scorePageUrl)}&title=${encodeURIComponent(metaTitle)}&summary=${encodeURIComponent(metaDescription)}`,
        "_blank"
    );
};


  

  const shareToFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        scorePageUrl
      )}`,
      "_blank"
    );
  };

    // const shareToWhatsApp = () => {
    //   const text = encodeURIComponent(`Check out my score on the test! ${window.location.href}`);
    //   window.open(`https://wa.me/?text=${text}`, '_blank');
    // };

   
  return (
    <>    
  

    <div className="min-h-screen bg-blue-100 flex justify-center items-center font-poppins p-4">
      <div className="grid sm:grid-cols-2  w-full max-w-4xl">

        <div className="flex flex-col items-center bg-white rounded-md shadow-md ml-24 w-80 h-96">
        <div className='bg-[#182073] w-full p-6 text-center flex flex-col items-center'>
          <p className="text-lg font-semibold text-white">Your Score:</p>
          <p className="text-xl font-bold text-white">{yourLevel}</p>
          <div className="flex items-center justify-center w-28 h-28  mt-5">
          <svg
                height={radius * 2}
                width={radius * 2}
                className="absolute transform -rotate-90"
              >
                <circle
                  stroke="gray"
                  fill="transparent"
                  strokeWidth={stroke}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
                <circle
                  stroke="orange"
                  fill="transparent"
                  strokeWidth={stroke}
                  strokeDasharray={circumference}
                  strokeDashoffset={createStrokeDashoffset(yourScore)}
                  strokeLinecap="round"
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
              </svg>
              <span className="text-3xl font-bold text-white">{yourScore}%</span>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-md mb-2 font-bold font-poppins">Share your score</p>
            <div className="flex space-x-2 justify-center">
              <button className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-transform transform hover:scale-110" onClick={shareToFacebook}>
              <FaFacebook className='w-6 h-6'/>
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-transform transform hover:scale-110" onClick={shareToLinkedIn}>
              <FaLinkedin className="w-6 h-6"/>
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-transform transform hover:scale-110">
              <IoLinkSharp className='w-6 h-6' />
              </button>
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-6 w-[500px]">
          {/* Your Score Explained */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-lg font-semibold">Your score explained</h3>
            <p className="text-sm text-gray-600 mt-2">
              Your score indicates that your level is in the range of A1 BEGINNER to A2 ELEMENTARY, according to the guidelines set by the Common European Framework of Reference (CEFR).
            </p>
          </div>

          {/* Reading and Listening Scores */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <div className="mb-4">
              <div className="flex justify-between items-center gap-8">
                <div className='flex flex-col items-center justify-center'>
                <div className="flex items-center justify-center w-20 h-20 mt-2">
                <svg
                height={radius * 2}
                width={radius * 2}
                className="absolute transform -rotate-90"
              >
                <circle
                  stroke="gray"
                  fill="transparent"
                  strokeWidth={stroke}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
                <circle
                  stroke="orange"
                  fill="transparent"
                  strokeWidth={stroke}
                  strokeDasharray={circumference}
                  strokeDashoffset={createStrokeDashoffset(catia)}
                  strokeLinecap="round"
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
              </svg>
              <span className="text-2xl font-bold text-orange-600">{catia}%</span>
              </div>
                 <span className='font-bold text-md font-poppins mt-3'>A1/A2</span>
                 <span className='font-bold text-md font-poppins'>Beginner</span>
                </div>
                <div>
              <p className="text-lg font-bold text-orange-600">Reading Score</p>
              <p className="text-sm text-gray-600 mt-2">
                You understand short texts with familiar words and frequently used phrases related to topics from your daily life.
              </p>
              </div>
              </div>
            </div>
            <div>
            <div className="flex justify-between items-center gap-8">
                <div className='flex flex-col items-center justify-center'>
                <div className="flex items-center justify-center w-20 h-20  mt-2">
             
              <svg
                height={radius * 2}
                width={radius * 2}
                className="absolute transform -rotate-90"
              >
                <circle
                  stroke="gray"
                  fill="transparent"
                  strokeWidth={stroke}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
                <circle
                  stroke="orange"
                  fill="transparent"
                  strokeWidth={stroke}
                  strokeDasharray={circumference}
                  strokeDashoffset={createStrokeDashoffset(product)}
                  strokeLinecap="round"
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
              </svg>
              <span className="text-2xl font-bold text-orange-600">
                {product}%
              </span>
            </div>
                 <span className='font-bold text-md font-poppins mt-3'>A1/A2</span>
                 <span className='font-bold text-md font-poppins'>Beginner</span>
                </div>
                <div>
              <p className="text-lg font-bold text-orange-600">Reading Score</p>
              <p className="text-sm text-gray-600 mt-2">
                You understand short texts with familiar words and frequently used phrases related to topics from your daily life.
              </p>
              </div>
              </div>
            </div>
          </div>

          {/* Score Comparison Table */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-4">Score comparison table</h3>
            <div className="grid grid-cols-4 text-center">
            <div>
                <p className="font-bold text-gray-600">Level</p>
                <p className="text-orange-600">BF SET</p>
              </div>
              <div>
                <p className="font-bold text-gray-600">Level</p>
                <p className="text-orange-600">Beginner</p>
              </div>
              <div>
                <p className="font-bold text-gray-600">Intermediate</p>
                <p className="text-gray-600">61-85%</p>
              </div>
              <div>
                <p className="font-bold text-gray-600">Advanced</p>
                <p className="text-gray-600">86-100%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Results