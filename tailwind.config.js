/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        democracy: ['"Baskervville SC"', defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
}

