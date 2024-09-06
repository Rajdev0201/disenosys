'use client';
import React from 'react'
import { ParallaxProvider } from 'react-scroll-parallax';

const Providers = ({children}) => {
  return (
    <ParallaxProvider>
             {children}
    </ParallaxProvider>
  )
}

export default Providers
