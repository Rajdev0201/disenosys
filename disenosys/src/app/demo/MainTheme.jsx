"use client"
import React, { useState } from 'react'
import {ThemeContext} from "./ThemeContext"
import Theme from "./Theme"

const MainTheme = () => {
    const [theme,setTheme] = useState("light");

    const toggleTheme = () => {
        setTheme((prev) => prev === "light" ? "dark" :"light")
    }

  return (
    <ThemeContext.Provider value={{theme:theme,toggleTheme}}>
        <div className={`${theme === "light" ? "bg-slate-200" : "bg-black"} h-screen`}>
        <Theme/>
      </div>       
    </ThemeContext.Provider>
  )
}

export default MainTheme