/** @type {import('tailwindcss').Config} */
module.exports = {
purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  content: [],
  theme: {
    colors:{
       primary: "var(--theme-primary)",
      secondary: "var(--theme-secondary)",
      white:"var(--theme-white)",
      btnBottomNavbar:"var(--theme-btnbottomNavbar)"
    },
    extend: {},
  },
  plugins: [],
}

