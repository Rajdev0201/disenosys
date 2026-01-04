"use client"
import React, { useEffect, useState } from 'react'
import Quiz from './Quiz';
import axios from 'axios';
import { setStudent } from '../Redux/features/studentSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const Main = () => {
    const [questions, setQuestions] = useState([]);

    const student = useSelector((state) => state?.student?.student?.user);
    const dispatch = useDispatch()

  useEffect(() => {
    const storedUser = localStorage.getItem("student");
    if (!storedUser || storedUser === "undefined") {
      alert("You must be logged in to access this quiz.");
    } else {
      try {
        dispatch(setStudent(JSON.parse(storedUser)));
      } catch (error) {
        console.error("Error parsing stored student:", error);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    axios.get('https://disenosys-7dm5.onrender.com/api/questions')
         .then(response => {
        const totalQuestions = response.data;
        const shuffledQuestions = totalQuestions.sort(() => Math.random() - 0.5); 
        const randomTenQuestions = shuffledQuestions.slice(0, 50); 
        setQuestions(randomTenQuestions);
        // setIsLoading(false);
      })
      .catch(error => console.error('Error fetching questions:', error));
  }, []);



  return (
    <>
    {student ? (
    <div className="container mx-auto p-12 lg:mt-20 bg-gray-200">
    <h1 className="text-md lg:text-xl font-bold font-poppins mb-6 text-center">AUTOMOTIVE PRODUCT DESIGN ENGINEER TEST</h1>
    {questions.length > 0 ? (
      <Quiz questions={questions} />
    ) : (
      <p className='text-[#182073] text-center flex text-lg font-bold justify-center items-center min-h-screen'>Loading questions...</p>
    )}
  </div>
    ): <h1 className='text-red-500 text-center flex text-base justify-center items-center min-h-screen'>Redirect to home page...</h1> 
  }
  </>
);
}

export default Main