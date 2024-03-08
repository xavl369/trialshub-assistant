import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: {
        '69vw': '69vw',
      },
      fontSize: {
        '4.5xl': '2.50rem'
      }
    },
  },
  plugins: [],
};
export default config;
