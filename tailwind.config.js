/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rollz: {
          blue: "#20A9E0",
          red: "#F20D18",
          dark: "#111111",
          gray: "#F7F7F7",
        }
      },
      fontFamily: {
        condensed: ['"Barlow Condensed"', '"Bebas Neue"', 'Impact', 'sans-serif'],
        sans: ['"Outfit"', 'system-ui', 'sans-serif'],
      },
      screens: {
        'xs': '420px',
      },
      boxShadow: {
        'rollz-red': '0 10px 25px -5px rgba(242, 13, 24, 0.4), 0 8px 10px -6px rgba(242, 13, 24, 0.2)',
        'rollz-card': '0 20px 40px -15px rgba(0, 0, 0, 0.08)',
        'food-glow': '0 30px 60px -20px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}
