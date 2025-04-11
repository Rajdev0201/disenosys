import React from "react";
import AdmissionHero from "./AdmissionHero";
import AdmissionInstructions from "./AdmissionInstructions";
import AdmissionCourses from "./AdmissionCourses";
import AdmissionForm from "./AdmissionForm";
import ContactBanner from "./ContactBanner";
import Popup from "./Popup";
import MarqueeView from "../home/Marquee";
import Partner from "../home/Partner";

export default function AdmissionPage () {
  return (
    <div className="bg-gray-50 text-gray-800 relative">
        <Popup/>
      <AdmissionHero />
      <AdmissionInstructions />
      <AdmissionCourses />
      <MarqueeView/>
      <AdmissionForm />
      <Partner/>
      <ContactBanner />
    </div>
  );
};

