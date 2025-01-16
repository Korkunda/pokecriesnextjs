import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gameOver: "red",
        titleRound: "greenyellow"
      },
      spacing: {
        min: '1rem',
        mid: '2rem',
        big: '4rem',
        max: '8rem'
      }
    },
  },
  plugins: [],
};
export default config;
