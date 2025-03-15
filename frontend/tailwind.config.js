/** @type {import('tailwindcss').Config} */
import daisyUi from "daisyui";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        lightShade:"var(--opacity-primary)"
      },
    },
  },
  plugins: [daisyUi],
};