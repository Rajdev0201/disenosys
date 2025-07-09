"use client"; 

import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext"; 

const Theme = () => {
  const data = useContext(ThemeContext);
  return (
    <div>
      <h1 className="text-white font-bold text-3xl">Current theme is: {data.theme}</h1>
      <button className=" bg-blue-400 p-2 text-white" onClick={data.toggleTheme}>Click</button>
    </div>
  );
};

export default Theme;
