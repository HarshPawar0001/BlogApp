/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        // '3xl': '1240px',
        '3xl': {'max': '1240px'},
        '2xl': {'max': '720px'},


      }
    },
  },
  plugins: [],
};
