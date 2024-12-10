import React from 'react'
import "../home/Home.css"
const Demo = () => {
  return (
    
    <div className="w-[1080px] h-[800px] c2 p-24">
    <div className="relative flex flex-col w-full h-full">
      <div className="absolute w-full text-center">
        <h1 className="text-8xl font-normal text-blue-900">
          CERTIFICATE
        </h1>
        <p className="text-3xl font-bold text-gray-700 mt-6">
          OF PARTICIPATION
        </p>
      </div>
      <div className="flex flex-col justify-center items-center h-full mt-20 text-center px-8">
        <p className="text-3xl font-normal text-gray-800">
          This certificate is presented to:
        </p>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-8xl font-medium text-blue-900 mt-0 mb-6">
          Raj
          </h2>
          <div className="w-full border-2 border-gray-800 mb-0 mt-5"></div>
          <p className="text-xl font-semibold text-gray-800 mt-8 max-w-[800px]">
            got for participating in CATIA exam and has scored{" "}
            <span className="font-bold text-gray-800 underline">
              90
            </span>
            %
          </p>
          <p className="text-xl font-semibold text-gray-800 max-w-[800px]">
            {" "}
            We wish them the best for future endeavors.
          </p>
        </div>
      </div>
      <div className="absolute bottom-20 w-full flex justify-center items-center px-20">
        <div className="text-center">
          <p className="text-2xl font-medium text-gray-800">
            Praveen Kumar
          </p>
          <p className="text-xl text-blue-800 font-medium">
            CEO & Founder
          </p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Demo