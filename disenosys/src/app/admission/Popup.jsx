"use client"
import { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";


const CourseUpdatePopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed top-4 left-0 z-50 font-garet">
      <div className="bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500 shadow-lg p-4 pr-12 rounded-r-lg relative w-80 animate-slide-in">
        <button
          onClick={() => setShow(false)}
          className="absolute top-2 right-2 text-yellow-700 hover:text-yellow-900"
        >
          <MdCancel size={20}/>
        </button>
        <h3 className="font-bold text-lg mb-1">🚀 New Courses Coming Soon!</h3>
        <p className="text-sm">Stay tuned for exciting updates on our upcoming programs.</p>
      </div>
    </div>
  );
};

export default CourseUpdatePopup;
