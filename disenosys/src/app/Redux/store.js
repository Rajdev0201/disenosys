"use client"
import { configureStore } from '@reduxjs/toolkit';
import CourseSlice from './features/CourseSlice.js';
// import categorySlice from './features/categorySlice';
import addCart from './features/addToCartSlice.js';
import currentCartSlice from './features/currentCartSlice.js';
import currentUser from './features/authSlice.js';
import payment from './features/PaymentSlice.js';

export default configureStore({
  reducer: {
    course: CourseSlice,
    // category:categorySlice,
    cart:addCart,
    currentCart:currentCartSlice,
    user: currentUser,
    payment:payment
  },
});
