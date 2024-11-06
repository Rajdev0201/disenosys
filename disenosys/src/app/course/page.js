import React from 'react'
import {Course} from "./Course.jsx"
import HomeCourse from "../home/Course.jsx"
import Navbar from "../component/Navbar/Navbar";
import Footer from "../component/Navbar/Footer.jsx"
import Blink from "../component/Blink/BlinkingPopup";
export default function course () {
  return (
    <div>
         <Blink/>
         <Navbar />
        <Course />
        <div className='mt-20 container mx-auto'>
        <HomeCourse/>
        </div>
        <Footer/>
    </div>
  )
}


