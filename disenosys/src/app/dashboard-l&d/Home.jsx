"use client"
import React, { useEffect } from 'react'
// import img from "../../assests/logo.png";
import Card from "../component/card/Card";
import ChartsWeek from "../component/card/WeeklyChart";
import { GiNotebook, GiTeacher } from 'react-icons/gi';
import { MdOutlineMarkChatRead } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Online } from '../Redux/action/onlineStd';
import { courseld } from "../Redux/action/Course";
import { teacher } from "../Redux/action/teacher.js";

const Home = () => {
    const icon1 = <GiNotebook size={44} color='blue'/>;
    const icon2 = <GiTeacher size={44} color='blue' />;
    const icon3 = <MdOutlineMarkChatRead size={44} color='blue'/>
    const {online} = useSelector((state) => state.online);
    const {course} = useSelector((state) => state.courseLD);
    const {teach} = useSelector((state) => state.teacher);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(Online()); 
      dispatch(courseld());
      dispatch(teacher());
    }, [dispatch]);

  return (
    <div className='px-2 py-16 lg:px-6 lg:py-6'>
      <div className='flex flex-col w-full'>

        <div className='grid grid-cols-12'>
           <div className='col-span-12 lg:col-span-3'>
             <Card No={course?.data?.length} text="Course" icon={icon1} />
           </div>

           <div className='col-span-12 lg:col-span-3'>
           <Card No={teach?.data?.length} text="Teacher" icon={icon2}/>
           </div>

           <div className='col-span-12 lg:col-span-3'>
           <Card No={online?.data?.length} text="SAF" icon={icon3}/>
           </div>

           <div className='col-span-12 lg:col-span-3'>
           <Card No="0" text="test"/>
           </div>

        </div>
        <div className='grid grid-cols-12 mt-8 gap-2'>
          <div className='col-span-12 lg:col-span-12'>
           <ChartsWeek/>
          </div>
        </div>
      </div>  
    </div>
  )
}

export default Home