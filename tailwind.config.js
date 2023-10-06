/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "rgb(30, 31, 33)",
        "gray-dark": "rgb(86, 87, 89)",
        border: "rgb(64,64,64)",
        blue: "rgb(63, 127, 223)",
        gray: "rgb(230,230,230)",
      },

      gridTemplateColumns: {
        app: "15rem 1fr",
      },

      gridTemplateRows: {
        app: "4.5rem 1fr",
        grid: "3rem repeat(6, 1fr)",
      },
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
  },
  plugins: [],
}
