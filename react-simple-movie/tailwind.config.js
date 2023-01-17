/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["DM Sans", "san-serif"],
      },
      colors: {
        primary: "#F62682",
        secondary: "#7D6AFF",
      },
    },
  },
  plugins: [],
};
