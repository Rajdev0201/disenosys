"use client"
import React from 'react'
import Image from "next/image";
import logo from "../assests/profile/l.jpg"

export const Logo = () => {
  return (
    <div className='shadow-sm bg-white fixed w-full top-0 left-0 right-0 z-50 h-20 flex justify-center items-center'>
        <Image src={logo} className='w-64 h-48'/>
    </div>
  )
}
