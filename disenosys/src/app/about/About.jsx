import React from 'react'
import "./About.css"
export const About = () => {
  return (
    <div className="fluid about p-8 mt-16 h-full font-poppins">
    <div className="px-12 py-24">
      <h1 className="text-white text-5xl font-bold font-serif text-center">About Us</h1>
      <p className="w-full md:w-2/4 text-white font-medium text-xl text-center mx-auto mt-4">
        From preschool to pre-tertiary, our students enjoy fun, interactive, and relevant lessons, and are empowered to think beyond the confines of the classroom.
      </p>
      <div className="flex justify-center mt-6">
        <button className="text-slate-900 bg-amber-300 p-2 rounded-xl font-bold px-5 hover:bg-amber-200">See More</button>
      </div>
    </div>
  </div>
  

  )
}