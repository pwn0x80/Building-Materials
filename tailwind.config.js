export default {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  content: [],
  theme: {
    extend: {
      colors: {
        primary: "var(--theme-primary)",
        secondary: "var(--theme-secondary)",
        white: "var(--theme-white)",
        btnBottomNavbar: "var(--theme-btnbottomNavbar)",
      },
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
      },
    },
    boxShadow: {
      card: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      button: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
  },
  plugins: [],

};


