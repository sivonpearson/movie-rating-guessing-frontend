/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/pages/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/components/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // keyframes: {
      //   bounceWave: {
      //     "0%, 100%": { transform: "translateY(0)" },
      //     "50%": { transform: "translateY(-10px)" },
      //   },
      // },
      // animation: {
      //   "bounce-wave": "bounceWave 1s infinite ease-in-out",
      // },
    },
  },
  plugins: [],
};
