"use client"
import MultiStepForm from "./Multistep";
// import Navbar from "../component/Navbar/Navbar";
// import Footer from "../component/Navbar/Footer";
// import Blink from "../component/Blink/BlinkingPopup";
import Image from "next/image";
import mentor from "../assests/profile/update-mentor.jpg"
import brand from "../assests/profile/brand-white.png";



export default function FormPage() {
  return(
    <div className="grid lg:grid-cols-2 h-screen bg-white overflow-hidden h-full">
    {/* Left Side with Sticky Image */}
    <div className="lg:shadow-xl lg:rounded-xl lg:h-full lg:sticky lg:top-0">
      <Image src={mentor} className="object-cover h-full w-full" alt="" />
      <div className="flex flex-col justify-start items-start fixed bottom-96 lg:bottom-40 mx-10 lg:mx-20">
  <Image 
    src={brand} 
    className="w-52 h-12 mb-2 text-white" 
    alt="logo-brand" 
  />
  <span className="text-white font-bold ml-1 text-sm lg:text-3xl">
    Mentor
  </span>
  <span className="text-white font-bold ml-1 mr-2 text-sm lg:text-3xl mt-2">
    Application Form
  </span>
</div>

    </div>
  
    {/* Right Side with Scrollable Form */}
      <div className="overflow-y-auto h-full">
        <MultiStepForm />
      </div>
    </div>
  )
}
