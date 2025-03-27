import React from 'react'
import {Course} from "./Course.jsx"
import HomeCourse from "../home/Course.jsx"
import Navbar from "../component/Navbar/Navbar";
import Footer from "../component/Navbar/Footer.jsx"
import Blink from "../component/Blink/BlinkingPopup";
import Main from "./Main.jsx"
import Partner from '../home/Partner.jsx';


export const metadata = () => { 
  return{
    title:"Course"
  }
}

export default function course () {
  return (
    <div>
         <Blink/>
         <Navbar />
        <Course />
        <Main/>
        {/* <div className='mt-20'>
        <HomeCourse/>
        </div> */}
        <Partner/>
        <Footer/>
    </div>
  )
}


