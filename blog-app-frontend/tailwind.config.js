/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        // '3xl': '1240px',
        '5xl': {'max': '1240px'},
        '4xl': {'max': '1185px'},
        '3xl': {'max': '832px'},
        '2xl': {'max': '768px'},
        'xl': {'max': '720px'},
        'lg' : {'max':' 695px'},
        'md' : {'max':' 650px'}

      }
    },
  },
  plugins: [],
};
