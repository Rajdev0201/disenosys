"use client"
import { useState } from "react";
import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";

  const courseContent = [
    {
      id:"01",
      qn:"What does the courses cover?",
      ans:"Please check the detailed curriculum on the course details page.",
    },
    {
      id:"02",
      qn:"Is the courses prerecorded, and can I watch it at my own space?",
      ans:"Yes, Our courses consists of prerecorded sessions, allowing you to learn at your own space. You can access the content whenever it suits you.",
    },
    {
      id:"03",
      qn:"Where can I watch recorded videos for future reference?",
      ans:"You can access recorded course videos for future reference on our dedicated course platform.",
    },
  ]

  const enrollment = [
        {
      id:"e1",
      qn:"How can I enroll in the courses?",
      ans:"To enroll, simply visit our website, locate the course, and follow the enrollment instructions.",
    },
    {
      id:"e2",
      qn:"Is there a discount available for the course, and if so, what is the coupon code?",
      ans:"Please check cart section box for discount",
    },
    {
      id:"e3",
      qn:"What payment methods are accepted for course enrollment?",
      ans:"We accept various payment methods, including credit cards, debit cards, UPI, Paypal and other secure online payment options.",
    },
  ]

    const certification = [
        {
      id:"c1",
      qn:"How is course progress assessed, and is there a grading system?",
      ans:"Course progress is assessed through assignments and quizzes, and a grading system may be in place.",
    },
    {
      id:"c2",
      qn:"Do you provide any form of certification upon course completion, and is it recognized in the industry?",
      ans:"Yes, we provide a certificate of completion upon successfully finishing the course. It is a valuable credential recognized in the industry.",
    },
  ]

const Support = () => {

 const [isOpen,setIsOpen] = useState(null);
 
 const handleRead = (id) => {
         setIsOpen((prev) => (prev === id ? null : id));
 }


  return (
    <div className="flex font-garet">
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-semibold">Support</h2>
        <p className="mt-4">
          Need help? Contact us at{" "}
          <a href="mailto:support@example.com" className="text-blue-500 hover:underline">
            support@disenosys.com
          </a>
        </p>
        <h3 className="text-lg font-semibold mt-6">FAQs</h3>
        <div className="mt-4 space-y-4">
          <div className="bg-gray-100 p-4 rounded-md shadow">
            <h4 className="font-semibold">How to reset my password?</h4>
            <p className="text-gray-600 mt-2">Go to settings and click <span className="text-white bg-blue-500 shadow-inner rounded-md p-2">Reset Password</span></p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md shadow">
            <h4 className="font-semibold">How to enroll in a new course?</h4>
            <p className="text-gray-600 mt-2">Browse the course catalog and click <span className="text-white bg-blue-500 shadow-inner rounded-md p-2">Enroll</span></p>
          </div>
        </div>


        {/* faq */}

        <div className="mt-8 space-y-4">
          <h4 className=" text-blue-500 text-center text-2xl font-bold">Course Content and Access</h4>
          {courseContent.map((content,i) => (
            <>
             <div key={i} className="bg-gray-100 p-3 rounded-md shadow text-md font-bold flex justify-between" onClick={
              () => handleRead(content.id)
             }>
                  <p>{content.qn}</p>
                 {isOpen === content.id ? (
                     <CiCircleChevUp size={25} color="blue"/>
                  ) : (
                      <CiCircleChevDown size={25} color="blue"/>
                     )
                 } 
              </div>
              <div className="">
                   {isOpen === content.id && (
                    <p className="bg-black rounded-md p-3 shadow text-sm text-white font-medium">{content.ans}</p>
                  )}
              </div>
            </>
          ))}
        </div>
        
        <div className="mt-8 space-y-4">
          <h4 className=" text-blue-500 text-center text-2xl font-bold">Enrollment & discounts</h4>
          {enrollment.map((content,i) => (
            <>
             <div key={i} className="bg-gray-100 p-3 rounded-md shadow text-md font-bold flex justify-between" onClick={
              () => handleRead(content.id)
             }>
                  <p>{content.qn}</p>
                 {isOpen === content.id ? (
                     <CiCircleChevUp size={25} color="blue"/>
                  ) : (
                      <CiCircleChevDown size={25} color="blue"/>
                     )
                 } 
              </div>
              <div className="">
                   {isOpen === content.id && (
                    <p className="bg-black rounded-md p-3 shadow text-sm text-white font-medium">{content.ans}</p>
                  )}
              </div>
            </>
          ))}
        </div>
          
              
        <div className="mt-8 space-y-4">
          <h4 className=" text-blue-500 text-center text-2xl font-bold">Certification & Assessment</h4>
          {certification.map((content,i) => (
            <>
             <div key={i} className="bg-gray-100 p-3 rounded-md shadow text-md font-bold flex justify-between" onClick={
              () => handleRead(content.id)
             }>
                  <p>{content.qn}</p>
                 {isOpen === content.id ? (
                     <CiCircleChevUp size={25} color="blue"/>
                  ) : (
                      <CiCircleChevDown size={25} color="blue"/>
                     )
                 } 
              </div>
              <div className="">
                   {isOpen === content.id && (
                    <p className="bg-black rounded-md p-3 shadow text-sm text-white font-medium">{content.ans}</p>
                  )}
              </div>
            </>
          ))}
        </div>


      </div>
    </div>
  );
};

export default Support;
