/** @type {import('tailwindcss').Config} */
import daisyUi from "daisyui"

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
          background: "#ffffff",
          textPrimary: "#E1CFF0",
          textSecondary:"#7f7f7f",
          primary: "#8E24AA",
          secondary:"#FF7EDB",
          conatiner:"#2A0E42"
      },
    },
  },
  plugins: [daisyUi],
}

