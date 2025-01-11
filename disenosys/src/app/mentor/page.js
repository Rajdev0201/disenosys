"use client"
import MultiStepForm from "./Multistep";
// import Navbar from "../component/Navbar/Navbar";
// import Footer from "../component/Navbar/Footer";
// import Blink from "../component/Blink/BlinkingPopup";
import Image from "next/image";
import mentor from "../assests/profile/update-mentor.jpg"



export default function FormPage() {
  return(
    <div className="grid lg:grid-cols-2 h-screen bg-[#D0D2E3] overflow-hidden h-full">
    {/* Left Side with Sticky Image */}
    <div className="lg:shadow-xl lg:rounded-xl lg:h-full lg:sticky lg:top-0">
      <Image src={mentor} className="object-cover h-full w-full" alt="" />
      <span className="fixed   bottom-96 lg:bottom-40 text-white mx-10 lg:mx-20 font-bold text-sm lg:text-2xl">Mentor</span>
      <span className="fixed   bottom-96 lg:bottom-32 text-white mx-24 lg:mx-20 font-bold text-sm lg:text-2xl">Application Form</span>
    </div>
  
    {/* Right Side with Scrollable Form */}
      <div className="overflow-y-auto h-full">
        <MultiStepForm />
      </div>
    </div>
  )
}
