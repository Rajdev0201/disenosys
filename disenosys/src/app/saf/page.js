"use client"
import Image from "next/image";
import Multiple from "./Multiple";
import logo from "../assests/profile/brand-white.png";


export default function SAFPage() {
    return(
        <div>
        <div className="flex justify-between items-center fixed top-0 right-0 left-0 z-50 bg-gray-500 px-12 py-4">
         <Image src={logo} className="w-44"/>
         <h4 className="font-garet text-lg font-medium text-white">Student Application Form</h4>
        </div>
         <Multiple/>
        </div>
    )
}