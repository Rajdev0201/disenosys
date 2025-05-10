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
    <div className="fixed top-0 left-0 z-50 font-garet">
      <div className="bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500 shadow-lg p-4 pr-12 rounded-r-lg relative w-2/4 animate-slide-in">
        <button
          onClick={() => setShow(false)}
          className="absolute top-2 right-2 text-yellow-700 hover:text-yellow-900"
        >
          <MdCancel size={20} />
        </button>
        <h3 className="font-bold text-lg mb-1">
          Welcome to Subscription-Based Job Application
        </h3>
        <p className="text-sm">Please note the following points:</p>
        <ul className="list-disc pl-5 mt-2 text-sm">
          <li>The subscription is valid for 30 days.</li>
          <li>You can apply for up to 5 jobs with one subscription.</li>
          <li>
            Please make sure the name and email you provide match those used
            during the subscription payment.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CourseUpdatePopup;
