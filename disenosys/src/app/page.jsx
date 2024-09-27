"use client"
import Home from './home/Home';
import Box from "./home/Box";
import WhyChoose from "./home/WhyChoose";
import Partner from "./home/Partner";
import Course from "./home/Course";
import Count from "./home/Count";
import { useDispatch, useSelector } from 'react-redux';
import { getAllCarts } from './Redux/action/addToCart.js';
import { useEffect, useState } from 'react';
import Testimonials from "./home/Testimonials";
import LoginAlert from './component/Alert/LoginAlert';

export default function Page() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCarts());
  }, [dispatch]);

  const [hasReachedTestimonials, setHasReachedTestimonials] = useState(false); 
  const [isTestimonialsInView, setTestimonialsInView] = useState(false);
  const [showAlert, setShowAlert] = useState(false); 
  const user = useSelector((state) => state.user);
  const name = user?.user?.user?.userName;

 
  useEffect(() => {
    if (isTestimonialsInView && !name) {
      setHasReachedTestimonials(true);
    }
  }, [isTestimonialsInView, name]);
  useEffect(() => {
    if (hasReachedTestimonials && !name) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [hasReachedTestimonials, name]);

  return (
    <div className={hasReachedTestimonials && !name ? "" : ""}>
      {showAlert && (
        <div className="fixed inset-0 bg-[#182073] bg-opacity-50 backdrop-blur-sm z-50 flex justify-center items-center">
          <LoginAlert />
        </div>
      )}
      <Home />
      <Count />
      <Box />
      <Testimonials setTestimonialsInView={setTestimonialsInView} />
      <WhyChoose />
      <Course />
      <Partner />
    </div>
  );
}
