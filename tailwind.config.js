/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "375px",
      sm: "768px",
      md: "1024px",
      lg: "1280px",
      xl: "1650px",
    },
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
      },
      colors: {
        primary: "#F62682",
        secondary: "#6F5CF1",
        titleMovie: "#c39913",
        contentSecond: "#999999",
      },
    },
  },
  plugins: [],
};
