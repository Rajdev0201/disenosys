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
        'josefin': ['sans-serif'],
        'poppins': ['sans-serif']
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "light-gradient": "linear-gradient(180deg,  rgba(240, 243, 255, 0) 0%, #D9ECFF 127.78%)",
        "blue-gradient": "linear-gradient(94.63deg, #331DA8 0%, #865AEF 100.96%)",
        "course-gradient": "linear-gradient(72.2deg, rgba(8, 49, 139, 0.9) 26.49%, rgba(127, 86, 217, 0.9) 85.53%)",
        "ch-gradient":"linear-gradient(72.2deg, rgba(127, 86, 217, 0.9) 26.49%, rgba(8, 49, 139, 0.9) 85.53%)",
      },
      boxShadow: {
        'custom-shadow': 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
        'border-shadow': 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
      },
      animation: {
        slideIn: 'slideIn 1s ease-out'
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateX(-30%)' }
        }
      }

    },
  },
  plugins: [],
};
export default config;
