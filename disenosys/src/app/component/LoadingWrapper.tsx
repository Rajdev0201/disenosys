"use client";

import { useState, useEffect } from "react";
import LoadingSpinner from "./Loading";

interface LoadingWrapperProps {
  children: React.ReactNode;
}

const LoadingWrapper = ({ children }: LoadingWrapperProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? <LoadingSpinner /> : children}
    </>
  );
};

export default LoadingWrapper;
