/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'rubik':['Rubik Burned']
      }
    },
  },
  daisyui:{
    themes:["forest", "light", "dark"]
  },
  plugins: [require("daisyui")],
}