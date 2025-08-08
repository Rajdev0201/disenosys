// tailwind.config.js
import type { Config } from "tailwindcss";


const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],        
        'brush': ['"Brush Script MT"', 'cursive', 'Arial'],
        'berlin': ['"Berlin Sans FB"', 'sans-serif'], 
        "montster":['Montserrat', 'sans-serif'],
        garet: ['Garet', 'sans-serif'], 
        sans: ['Open Sans', 'sans-serif'],
        montheavy: ['"Montheavy"', 'sans-serif'],
        lexend:['Lexend','sans-serif'],
        nunito: ["Nunito Sans", 'sans-serif'],
        vanquish: ["Vanquish W00 Bold", 'sans-serif'],
        'today-sans-serif': ["Today Sans Serif Bold", 'sans-serif'],
        josefin: ["Josefin Sans", 'sans-serif'],
      },
      animation: {
        slideIn: 'zoomIn 1s ease-out',
        "fade-in": "fadeIn 0.5s ease-out forwards",
      },
      keyframes: {
        zoomIn: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeIn: {
          "0%": { transform: "translateY(20px)", opacity: '0' },
          "100%": { transform: "translateY(0)", opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
