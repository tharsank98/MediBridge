/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#50C878",
        buttonPrimary: "#3cbece", // Custom button color
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fill,minmax(200px,1fr))",
      },
      keyframes: {
        arrowMove: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(5px)" },
        },
      },
      animation: {
        arrowMove: "arrowMove 1s infinite",
      },
    },
  },
  plugins: [],
};
