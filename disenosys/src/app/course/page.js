import React from 'react'
import {Course} from "./Course.jsx"
import HomeCourse from "../home/Course.jsx"
export default function course () {
  return (
    <div>
        <Course />
        <div className='mt-20 container mx-auto'>
        <HomeCourse/>
        </div>
    </div>
  )
}


