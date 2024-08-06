/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#3AAFA9",
        primary2:"#FEFFFF",
        primary3:"#DEF2F1"
      },
    },
  },
  plugins: [],
}