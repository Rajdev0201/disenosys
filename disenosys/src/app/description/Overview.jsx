import React, { useState } from "react";

export const Overview = () => {
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);

  const overview = [
    {
        tittle:"CFD Foundation course",
        whatisdefinition:"Reverse engineering definition: Reverse engineering is the process of analyzing and disassembling a product or system to create a detailed digital model of it. This technique involves using physical measurements and CAD software to create a virtual model that can be used to understand how the product or system was designed and built, and to identify areas for improvement. The goal of reverse engineering is to create a replica or an improved version of the original product or system.",
        process:"The reverse engineering process in automotive design typically involves the following steps",
        processdefinition:"Reverse engineering for beginners can be a complex process, requiring specialized knowledge and equipment. However, with the right tools and techniques, it can be a valuable tool for understanding how products and systems are designed and built, and for improving upon them.",
        step1:"Disassemble the vehicle: The first step is to take apart the vehicle and examine its components and systems. This can be done using hand tools or specialized equipment.",
        step2:"Collect physical measurements: Once the vehicle has been disassembled, engineers can take physical measurements of its various components using tools such as calipers or 3D scanners",
        step3:"Create a digital model: Using computer-aided design (CAD) software, engineers can create a detailed digital model of the vehicle based on the physical measurements they have collected.",
        step4:"Analyze the model: The digital model can be used to analyze the vehicle’s performance and identify areas for improvement. Engineers can simulate different operating conditions and test different design variations to determine the optimal configuration.",
        step5:"Refine the design: Based on the analysis, engineers can make changes to the design and refine it until it meets the desired specifications",
        significant:"Reverse engineering has significant importance in automotive design, as it provides a detailed understanding of how existing vehicles are designed and built, allowing engineers to improve upon them or create new products based on the original design.",
        significantstep:"Here are some key reasons why reverse engineering is important in automotive design:",
        signstep1:"Design optimization: Reverse engineering can help identify areas where design improvements can be made to enhance the performance, functionality, and efficiency of the vehicle. This can lead to the development of new, better-performing products.",
        signstep2:"Cost reduction: By reverse engineering existing vehicles, manufacturers can identify ways to reduce production costs, such as by simplifying the design or using less expensive materials.",
        signstep3:"Customization and aftermarket parts: Reverse engineering can also be used to create custom modifications and aftermarket parts based on existing vehicle designs. This allows for greater customization and flexibility in the design of vehicles and their components.",
        signstep4:"Intellectual property protection: Reverse engineering can also be used to protect intellectual property rights by identifying instances of patent infringement or unauthorized use of designs.",
        signstep5:"In conclusion, reverse engineering plays a vital role in automotive design by allowing engineers to gain a deeper understanding of existing vehicle designs, identify areas for improvement, reduce production costs, create custom modifications, and protect intellectual property rights.",
      },]
  const toggleAccordion = () => {
    setOpenAccordionIndex(openAccordionIndex === 0 ? null : 0);
  };

  return (
    <div>
      <button
        onClick={toggleAccordion}
        className="w-full text-left bg-gray-200 my-2 p-2 rounded-md hover:bg-gray-300 focus:outline-none flex items-center justify-between"
      >
        <span>{openAccordionIndex === 0 ? " Overview" : " Overview"}</span>
        <span className="text-[#182073]">{openAccordionIndex === 0 ? "▲" : "▼"}</span>
      </button>
      {openAccordionIndex === 0 && (
        <ul className="list-disc pl-5 mt-2 border border-gray-300">
            <h1 className="text-2xl font-bold py-3">Overview</h1>
          {overview.map((item, idx) => (
            <>
            <h1 key={idx} className="text-gray-500 text-3xl text-slate-900 font-bold underline py-3">
             What is  {item.tittle}?
            </h1>
            <h1 key={idx} className="text-gray-500 text-lg   py-3">
              {item.whatisdefinition}
            </h1>
            <h1 key={idx} className="text-gray-500 text-3xl text-slate-900 font-bold underline py-3">
             process of  {item.tittle}
            </h1>
            <ul>
            <h1 key={idx} className="text-gray-500 text-lg   py-3">
              {item.processdefinition}
              <li className="py-3">{item.step1}</li>
              <li className="py-3">{item.step2}</li>
              <li className="py-3">{item.step3}</li>
              <li className="py-3">{item.step4}</li>
              <li className="py-3">{item.step5}</li>
              <li className="py-3">{item.processdefinition}</li>
              <h1></h1>
            </h1>
            </ul>
            <h1 key={idx} className="text-gray-500 text-3xl text-slate-900 font-bold underline py-3">
             significance of  {item.tittle}
            </h1>
            <ul>
            <h1 key={idx} className="text-gray-500 text-lg   py-3">
              {item.significant}
              <h1 className="py-3">{item.significantstep}</h1>
              <li className="py-3">{item.signstep1}</li>
              <li className="py-3">{item.signstep2}</li>
              <li className="py-3">{item.signstep3}</li>
              <li className="py-3">{item.signstep4}</li>
              <li className="py-3">{item.signstep5}</li>
              <h1></h1>
            </h1>
            </ul>
            </>
          ))}
        </ul>
      )}
    </div>
  );
};