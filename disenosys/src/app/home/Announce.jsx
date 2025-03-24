"use client";
import React from "react";
import Marquee from "react-fast-marquee";
import { GrAnnounce } from "react-icons/gr";

const Announce = () => {
  return (
    <div className="w-full bg-announce mt-20 lg:mt-32 py-3 overflow-hidden font-garet">
      {/* <div className="flex justify-center items-center gap-3 p-4">
        <GrAnnounce className="w-8 h-8 text-pink-500" />
        <h4 className="text-2xl font-bold font-garet text-pink-500">
          Announcements!!!!...
        </h4>
      </div> */}
     <Marquee speed={80} pauseOnHover={true} direction="left" gradient={false} className="flex items-center">
      <div className="relative w-full overflow-hidden py-2 bg-pink-500">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-12">
          <p className="text-white text-lg font-medium">
           New Batch Starting Soon! Enroll Now & Upgrade Your Skills! 📚
          </p>
  
          <p className="text-white text-lg font-medium">
            💼 Job Assistance Included! Learn from Industry Experts! 🏆
          </p>
          <p className="text-white text-lg font-medium">
            🚀 Limited Seats Available! Don't Miss Out! ⏳ 
          </p>
        </div>
      </div>
      </Marquee>
    </div>
  );
};

export default Announce;
