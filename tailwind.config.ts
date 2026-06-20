import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        oracle: {
          primary: "#6C63FF",
          primaryLight: "#8B85FF",
          primaryDark: "#4A44CC",
          accent: "#FF6B6B",
          green: "#00D9A0",
          amber: "#FFB347",
          blue: "#4FC3F7"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 12px 40px rgba(108, 99, 255, 0.28)"
      }
    }
  },
  plugins: []
};

export default config;
