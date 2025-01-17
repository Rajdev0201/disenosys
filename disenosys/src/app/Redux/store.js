"use client"
import { configureStore } from '@reduxjs/toolkit';
import CourseSlice from './features/CourseSlice.js';
// import categorySlice from './features/categorySlice';
import addCart from './features/addToCartSlice.js';
import currentCartSlice from './features/currentCartSlice.js';
import currentUser from './features/authSlice.js';
import payment from './features/PaymentSlice.js';
import currentProfile from './features/currentProfile.js';
import singlePort from './features/portfolioSlice.js';
import allPort from './features/portAllSlice.js';
import resume from './features/resumeSlice.js';
import student  from './features/studentSlice.js';
import studentCode from './features/codeSlice.js';
import externalCode from "./features/externalSlice.js";
import bootcamp from "./features/bootcampSlice.js";
import consult from "./features/consultSlice.js";
import blog from "./features/blogSlice.js";
import career from "./features/careerSlice.js";
import mentor from "./features/mentorSlice.js";

export default configureStore({
  reducer: {
    course: CourseSlice,
    // category:categorySlice,
    cart:addCart,
    currentCart:currentCartSlice,
    user: currentUser,
    payment:payment,
    currentProfile:currentProfile,
    singlePort:singlePort,
    allPort : allPort,
    resume : resume,
    student : student,
    code : studentCode,
    external : externalCode,
    bootcamp:bootcamp,
    consult:consult,
    blog:blog,
    career:career,
    mentor:mentor,
  },
});
