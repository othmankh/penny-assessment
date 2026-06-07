import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        penny: {
          teal: {
            DEFAULT: "#006165",
            dark: "#003A3C",
            light: "#328083",
            soft: "#E6F4F4",
          },
          navy: {
            DEFAULT: "#161F2A",
            soft: "#202D3C",
            muted: "#25334A",
          },
          blue: "#0C407B",
          success: "#00B755",
          mint: "#61CE70",
        },
      },
      boxShadow: {
        glow: "0 0 30px rgba(0, 97, 101, 0.28)",
        card: "0 18px 50px rgba(12, 18, 24, 0.18)",
      },
      animation: { float: "float 5s ease-in-out infinite" },
      keyframes: { float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } } },
    },
  },
  plugins: [],
};
export default config;
