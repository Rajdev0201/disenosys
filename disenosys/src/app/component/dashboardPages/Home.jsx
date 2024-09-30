"use client"
import Image from 'next/image'
import React from 'react'
// import img from "../../assests/logo.png";
import Card from "../../component/card/Card";
import RecentCard from "../../component/card/RecentCard";
import ChartsWeek from "../../component/card/ChartsWeek";
import Chart2 from "../../component/card/Chart2";

const Home = () => {
  return (
    <div className='px-6 py-6'>
      <div className='flex flex-col w-full'>
        <h4 className='text-[#182073] font-medium text-xl font-poppins'>My Profile</h4>
        {/* <div className='w-full bg-white shadow-lg flex flex-col mt-10'>
           <div className='bg-dark'>
             <Image src={img} alt='img' className='w-full object-fill text-[#182073] p-6'/>
           </div>
           <div>
           </div>
        </div> */}
        <div className='grid grid-cols-12 mt-8'>
           <div className='col-span-3'>
             <Card No="1" />
           </div>

           <div className='col-span-3'>
           <Card No="2" />
           </div>

           <div className='col-span-3'>
           <Card No="3" />
           </div>

           <div className='col-span-3'>
            <RecentCard/>
           </div>

        </div>
        <div className='grid grid-cols-12 mt-8 gap-2'>
          <div className='col-span-8'>
           <ChartsWeek/>
          </div>
          <div className='col-span-4'>
          <Chart2/>
          </div>
        </div>
      </div>  
    </div>
  )
}

export default Home