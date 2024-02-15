const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // for next-themes
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",

    "./node_modules/tailwind-datepicker-react/dist/**/*.js", 

  ],
  theme: {
    extend: {
      colors: {
        primary: '#fee357',
        background: '#000000',
        skin: {
          50: '#f5f5f5',
          100: '#ffe357',
          200:'#ffd54a',
          300: '#ffc73c',
          400: '#ffb92f',
          500:'#ffac20',
          600: '#f59e0b',
          700: '#e59100',
          800: '#d58516',
          900: '#c67800',
        }
      },
      fontFamily: {
        sans: ["var(--skin-font-sans)", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
