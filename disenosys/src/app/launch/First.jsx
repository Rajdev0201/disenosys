"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import das from "../assests/profile/dassault.png"
import Quiz from "./Quiz"
import axios from "axios";
const First = () => {
  const [mcq,setMcq] = useState(false);
  const [questions, setQuestions] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const activeSection = localStorage.getItem("activeSection");
  //   if (activeSection === "CATIA") {
  //     setMcq(true);
  //   }
  // }, []);

  const handleClick = () => {
    setMcq(true);
    localStorage.setItem("activeSection", "CATIA"); 
  };


  useEffect(() => {
    // setIsLoading(true);
    axios.get('https://disenosys-dkhj.onrender.com/api/questions/catia')
      .then(response => {
        const totalQuestions = response.data;
        const shuffledQuestions = totalQuestions.sort(() => Math.random() - 0.5); 
        const randomTenQuestions = shuffledQuestions.slice(0, 10); 
        setQuestions(randomTenQuestions);
        // setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
        // setIsLoading(false);
      });
  }, []);
  
  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <div className="flex-col gap-4 w-full flex items-center justify-center">
  //         <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-[#182073] rounded-full">
  //           <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
    {
        !mcq ? (
    <div className="bg-[#D0D2E3] min-h-screen flex items-center justify-center font-garet">
      <div className="bg-white shadow-lg rounded-2xl flex flex-col justify-center items-center w-11/12 md:w-3/4 lg:w-2/4 py-6 mt-24 lg:mt-12">
        <h1 className="text-3xl font-bold  text-gray-800 mb-4 px-6">CATIA V5</h1>
        <h4 className="text-lg text-gray-600  text-center px-6 mb-4">
          You are about to start the <b>CATIA V5</b> section
        </h4>
        <div className="bg-[#E7E8F1] flex flex-col w-full text-center p-6 space-y-2 flex justify-center items-center">
            <Image src={das} className="w-64 h-16 "/>
            <h5 className="text-lg font-poppins">CATIA V5</h5>
            <h5 className="font-bold text-lg font-poppins">7.5 mins</h5>
        </div>
        <div className="flex items-center md:px-24 justify-center space-y-6 mt-6">
            <ul className="list-disc pl-5 space-y-4 text-gray-500 text-md font-medium">
                <li>The questions in this test may get harder or easier to adapt to your level.Use the progress bar to pace yourself so that you have time to answer all the questions</li>
                <li>You will not lose points for incorrect answers</li>
                <li>Once you submit an answer, you cannot go back</li>
            </ul>
        </div>
        <div className="mb-4 mt-6">
           <button className="bg-[#182073] text-white rounded-lg px-6 py-1" onClick={handleClick}>Start</button>
        </div>
      </div>
    </div>
        ) :(
          <div>
          {questions.length > 0 ? (
       <Quiz questions={questions}/>
     ) : (
       <div className="flex justify-center items-center h-screen">
       <div className="flex-col gap-4 w-full flex items-center justify-center">
         <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-[#182073] rounded-full">
           <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
         </div>
       </div>
     </div>
     )}
       </div>
        )
    }
    </>
  );
};

export default First;
