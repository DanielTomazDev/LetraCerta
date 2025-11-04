import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#6C63FF",
        secondary: "#4F46E5",
        dark: {
          bg: "#0F0F1E",
          surface: "#1A1A2E",
          card: "#16213E",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

