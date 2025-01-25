"use client"
import React from 'react'
import { GrAnnounce } from "react-icons/gr";

const Announce = () => {
  return (
    <div className='w-full bg-announce mt-28'>
       <div className='flex justify-center items-center gap-3 p-4'>
       <GrAnnounce className='w-8 h-8 text-pink-500'/>
        <h4 className='text-2xl font-bold font-garet text-pink-500'>Announcements!!!!...</h4>
       </div>
    </div>
  )
}

export default Announce