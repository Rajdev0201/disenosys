"use client"
import Home from './home/Home'
import Box from "./home/Box"
import WhyChoose from "./home/WhyChoose"
import Partner from "./home/Partner"
import Course from "./home/Course"
import Count from "./home/Count"
import { useDispatch } from 'react-redux'
import { getAllCarts } from './Redux/action/addToCart.js'
import { useEffect } from 'react'
import Pricing from "./component/Pricing"

export default function Page() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllCarts())
  }, [dispatch])

  return (
     <div>
       <Home />
       <Count />
      <Box/>
         <WhyChoose/>
         <Partner />
          <Course/>
          <Pricing/>
     </div>
  );
}
