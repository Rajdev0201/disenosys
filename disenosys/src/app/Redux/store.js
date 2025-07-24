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
import companyCode from "./features/companyCodeSlice.js"
import bootcamp from "./features/bootcampSlice.js";
import consult from "./features/consultSlice.js";
import blog from "./features/blogSlice.js";
import career from "./features/careerSlice.js";
import mentor from "./features/mentorSlice.js";
import courseLD from "./features/courseLDSlice.js";
import teacher from "./features/teacherSlice.js"
import online from "./features/onlineStdSlice.js";
import coursec from "./features/CourseCertificateSlice.js";
import intern from "./features/internshipCertificate.js";
import gpdx from "./features/gpdxSlice.js";
import exam from "./features/examCertificateSlice.js";
import jobs from "./features/cretaeJobSlice.js";
import batch from "./features/batchSlice.js";
import attendance from "./features/attendanceSlice.js";

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
    companyCode:companyCode,
    courseLD:courseLD,
    teacher:teacher,
    online:online,
    coursec:coursec,
    intern:intern,
    gpdx:gpdx,
    exam:exam,
    jobs:jobs,
    batch:batch,
    attendance:attendance,
  },
});
