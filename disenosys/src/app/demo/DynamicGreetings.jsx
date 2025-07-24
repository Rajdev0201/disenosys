"use client"
import React, { useEffect, useState } from 'react'


const getgreeting = (time) => {
    if(time >= 5 && time < 12){
     return "Good morning bro"
    }else if(time >= 12 && time < 15){
        return "Good aftn bro"
    }else if(time >=15 && time < 20){
          return "Good evng bro"
    }else{
        return "Good night bro"
    }
}

const DynamicGreetings = () => {
   const [time,setTime] = useState(new Date());

   useEffect(() => {
     const timer = setInterval(() => {
        setTime(new Date());
     },1000)
     console.log("times")
     return () => clearInterval(timer)
   },[])
   

   const getsH = getgreeting(time.getHours())
  //  const formatedTimes = time.toLocaleTimeString()
  return (
    <div>
       {formatedTimes} grettings- {getsH}
    </div>
  )
}

export default DynamicGreetings