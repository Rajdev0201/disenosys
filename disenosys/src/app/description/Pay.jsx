import React,{useState} from 'react'

const Pay = () => {
    const [openAccordionIndex, setOpenAccordionIndex] = useState(null);
    const pays = [
        {
           definition:"The average reverse engineer salary in India is around 4 LPA. However, salaries for reverse engineering jobs in automotive design can range from approximately 2 LPA to over 10 LPA.",

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
      <span>{openAccordionIndex === 0 ? " Average pay" : " Average pay"}</span>
      <span>{openAccordionIndex === 0 ? "▲" : "▼"}</span>
    </button>
    {openAccordionIndex === 0 && (
      <ul className="list-disc pl-5 mt-2 border border-gray-300">
          <h1 className="text-2xl font-bold py-3 underline">Industry Average pay</h1>
        {pays.map((item, idx) => (
        <>
        <h1 className='text-lg text-gray-500'>
        {item.definition} 
        </h1> 
        </>
        ))}
      </ul>
    )}
  </div>
  )
}

export default Pay