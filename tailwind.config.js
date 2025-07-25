/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      rotate: {
        y180: "180deg",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
