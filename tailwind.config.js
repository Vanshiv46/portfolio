/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#070606",
        panel: "#100d0d",
        line: "#2a2020",
        text: "#f1ecea",
        muted: "#a39a98",
        red: { DEFAULT: "#d4202c", deep: "#7a0d15" },
      },
      fontFamily: {
        display: ["'Anton'", "Impact", "sans-serif"],
        body: ["'Outfit'", "system-ui", "sans-serif"],
        script: ["'Mrs Saint Delafield'", "cursive"],
      },
    },
  },
  plugins: [],
}
