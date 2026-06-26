import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50:  "#f2f7ec",
          100: "#deecd0",
          200: "#bcd9a3",
          300: "#93c270",
          400: "#71ab47",
          500: "#558f30",
          600: "#427226",
          700: "#2D5016",
          800: "#254213",
          900: "#1a2f0d",
        },
        sage: {
          50:  "#f4f7f0",
          100: "#e4edda",
          200: "#c9dbb7",
          300: "#a5c38d",
          400: "#7A9E5F",
          500: "#5e8444",
          600: "#496834",
          700: "#3a5229",
          800: "#2e4120",
          900: "#243318",
        },
        terracotta: {
          50:  "#fdf3ee",
          100: "#fae3d5",
          200: "#f5c4a8",
          300: "#eda074",
          400: "#e47a4a",
          500: "#C46B3F",
          600: "#a85530",
          700: "#874228",
          800: "#6e3522",
          900: "#5a2c1d",
        },
        cream: "#F7F3EC",
        charcoal: "#1C1C1C",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans:  ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
