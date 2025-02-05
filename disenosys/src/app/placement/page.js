import React from 'react'
import Placement from './Placement.jsx'
import BlinkingAlert from '../component/Blink/BlinkingPopup.jsx'
import Navbar from '../component/Navbar/Navbar.jsx'
import Footer from '../component/Navbar/Footer.jsx'
import Partner from '../home/Partner.jsx'

export default function MainPage () {
  return (
    <div>
      <BlinkingAlert/>
      <Navbar/>
      <Placement/>
      <Partner/>
      <Footer/>
    </div>
  )
}
