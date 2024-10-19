import { useState } from "react";
import React from 'react'

const Learn = () => {
    const [openAccordionIndex, setOpenAccordionIndex] = useState(null);

    const Learn = [
        {
            definition:"Anyone with an interest in automotive design and the willingness to learn can potentially acquire the skills needed for reverse engineering. This includes individuals who are interested in pursuing a career in automotive design or who simply have a passion for the subject.",
            steps:"This reverse engineering course is for",
            steps1:"Btech/Mtech Mechanical Engineering Students or Graduate",
            steps2:"Professionals wanting to kick start your career as Automotive Design Engineer",
            steps3:"Automotive Enthusiast",
        }
    ]

    const toggleAccordion = () => {
        setOpenAccordionIndex(openAccordionIndex === 0 ? null : 0);
      };
  return (
    <div>
    <button
      onClick={toggleAccordion}
      className="w-full text-left bg-gray-200 my-2 p-2 rounded-md hover:bg-gray-300 focus:outline-none flex items-center justify-between"
    >
      <span>{openAccordionIndex === 0 ? " Who can learn" : " Who can learn"}</span>
      <span className="text-[#182073]">{openAccordionIndex === 0 ? "▲" : "▼"}</span>
    </button>
    {openAccordionIndex === 0 && (
      <ul className="list-disc pl-5 mt-2 border border-gray-300">
          <h1 className="text-2xl font-bold py-3 underline">Who can learn</h1>
        {Learn.map((item, idx) => (
        <>
        <h1 className='text-lg text-gray-500'>
        {item.definition} 
        </h1> 
        <h1 className='text-lg text-gray-500 py-2'>
        {item.steps} 
        </h1> 
        <h1 className='text-lg text-gray-500 py-2'>
        {item.steps1}
        </h1> 
        <h1 className='text-lg text-gray-500 py-2'>
        {item.steps2}
        </h1> 
        <h1 className='text-lg text-gray-500 py-2'>
        {item.steps3}
        </h1> 
        </>
        ))}
      </ul>
    )}
  </div>
  )
}

export default Learn