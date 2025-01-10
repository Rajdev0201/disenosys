"use client"
import MultiStepForm from "./Multistep";
// import Navbar from "../component/Navbar/Navbar";
// import Footer from "../component/Navbar/Footer";
// import Blink from "../component/Blink/BlinkingPopup";
import Image from "next/image";
import mentor from "../assests/mentor.jpg"



export default function FormPage() {
  return(
    <div className="bg-[#182073]">
    {/* <Blink/>
    <Navbar /> */}
   <div className="grid grid-cols-2 h-screen">
  {/* Fixed Column */}
  <div className="shadow-xl rounded-xl h-full sticky top-0">
    <Image src={mentor} className="object-cover h-full w-full" alt="" />
  </div>

  {/* Scrollable Column */}
  <div className="overflow-y-auto">
    <MultiStepForm />
  </div>
</div>


    {/* <Footer/> */}
    </div>
  )
}
