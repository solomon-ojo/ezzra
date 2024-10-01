import { nextui } from "@nextui-org/theme";
import { siteConfig } from "./config/site";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: siteConfig.colors.primary,
            card: siteConfig.colors.cardLightColor,
            background: siteConfig.colors.bgLightColor,
            bordercolor: "#EBEBEB",
            lightprimarybg: "#F3F3FC",
          },
        },
        dark: {
          colors: {
            primary: siteConfig.colors.primary,
            card: siteConfig.colors.cardDarkColor,
            background: siteConfig.colors.bgDarkColor,
            bordercolor: "#3d3d3dbb",
            lightprimarybg: siteConfig.colors.bgDarkColor,
          },
        },
      },
    }),
  ],
};
