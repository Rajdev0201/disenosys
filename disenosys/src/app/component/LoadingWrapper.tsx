"use client";

import { useState, useEffect } from "react";
import LoadingSpinner from "./Loading";

interface LoadingWrapperProps {
  children: React.ReactNode; // Explicitly defining the type for children
}

const LoadingWrapper = ({ children }: LoadingWrapperProps) => {
  const [loading, setLoading] = useState(true); // Initially set loading to true

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Simulating loading for 2 seconds
    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  return (
    <>
      {loading ? <LoadingSpinner /> : children} {/* Conditionally render spinner or children */}
    </>
  );
};

export default LoadingWrapper;
