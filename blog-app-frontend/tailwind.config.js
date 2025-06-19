/** @type {import('tailwindcss').Config} */
export default {
  // Add this line here, at the same level as 'content' and 'theme'
  darkMode: 'class', // <--- ADD THIS LINE FOR DARK MODE

  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        // Your existing custom breakpoints
        // '3xl': '1240px', // This one is commented out in your original
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