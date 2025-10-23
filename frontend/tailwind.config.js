/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        screens: {
          sm: "600px",
          md: "728px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1600px", // 👈 this gives wide Flipkart-like layout
        },
      },
    },
  },
  plugins: [],
};
