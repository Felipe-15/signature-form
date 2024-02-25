/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#02295a",
          400: "#473dff",
          300: "#adbeff",
          200: "#bfe2fd",
        },
        attention: "#ed3548",
        light: {
          500: "#9699ab",
          400: "#d6d9e6",
          300: "#f0f6ff",
          200: "#fafbff",
        },
      },
    },
  },
  plugins: [],
};
