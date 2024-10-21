"use client"
import React,{ Suspense } from "react";
import LoadingSpinner from '../component/Loading';
// import Navbar from '../component/Navbar/Navbar';
// import Blink from '../component/Blink/BlinkingPopup';
const Description = React.lazy(() => import('./Description'));
const Blink = React.lazy(() => import('../component/Blink/BlinkingPopup'));
const Navbar = React.lazy(() => import('../component/Navbar/Navbar'));
const Footer = React.lazy(() => import('../component/Navbar/Footer'));

export default function description () {
    return(
        <Suspense fallback={LoadingSpinner}>
           <Blink/>
           <Navbar />
        <Description/>
        <Footer/>
        </Suspense>
    )
}