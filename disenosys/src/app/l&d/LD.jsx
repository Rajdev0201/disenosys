"use client"
import React from 'react'
import Image from "next/image";
import i from "../assests/profile/logo.jpg"
import Link from "next/link";
import "../home/Home.css"

const LD = () => {
  return (
    <div className=" bg-gradient-to-r from-blue-900 to-white h-screen">
    <div class="flex items-center justify-center w-full min-h-screen">
    <div
      class="flex flex-col justify-center items-center bg-gray-800 text-white rounded-lg shadow-lg p-6 w-2/4"
     >
      <h2 class="text-4xl font-bold mb-4 font-poppins text-center">Welcome!</h2>
       <p class="mb-4 text-center text-lg font-semibold font-poppins">
       Thank you for visiting our website! Stay connected as we are currently working on exciting updates to this page.
   </p>
     <div class="flex space-x-6">
    <Image src={i} className="object-cover w-64 h-12"/>
      </div>

     <Link href="/"
      class="bg-gradient-to-r mt-4 from-blue-500 to-pink-500 text-white font-bold py-2 px-4 rounded-full animate-pulse"
        >
       Close
     </Link>
     </div>
   </div>
 </div> 
  )
}

export default LD;