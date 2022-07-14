/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "alpha-dark": "url('/assets/images/bg_alpha.svg')",
        "white-styled": "url('/assets/images/bg_white.svg')",
      },
      gridTemplateRows: {
        7: "repeat(7, minmax(0, 1fr))",
        8: "repeat(8, minmax(0, 1fr))",
        9: "repeat(9, minmax(0, 1fr))",
        10: "repeat(10, minmax(0, 1fr))",
        11: "repeat(11, minmax(0, 1fr))",
        12: "repeat(12, minmax(0, 1fr))",
        13: "repeat(13, minmax(0, 1fr))",
        14: "repeat(14, minmax(0, 1fr))",
      },
    },
  },
  variants: {
    extend: {
      backgroundImage: ["dark"],
    },
  },
  plugins: [],
};
