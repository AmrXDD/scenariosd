import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#05060a",
          900: "#0a0c13",
          800: "#101320",
          700: "#1a1f30",
        },
        bone: {
          50: "#f5f3ee",
          100: "#ece8df",
          200: "#d9d2c2",
        },
        rust: {
          500: "#b85c38",
          600: "#8a4124",
        },
      },
      fontFamily: {
        display: [
          "'Fraunces'",
          "'PP Editorial New'",
          "'Editorial New'",
          "ui-serif",
          "Georgia",
          "serif",
        ],
        sans: [
          "'Inter'",
          "'Neue Haas Grotesk'",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "'JetBrains Mono'",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },
      fontSize: {
        "fluid-xs": "clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)",
        "fluid-sm": "clamp(0.875rem, 0.8rem + 0.4vw, 1rem)",
        "fluid-base": "clamp(0.95rem, 0.9rem + 0.3vw, 1.0625rem)",
        "fluid-lg": "clamp(1.125rem, 1rem + 0.5vw, 1.375rem)",
        "fluid-xl": "clamp(1.375rem, 1.2rem + 0.9vw, 2rem)",
        "fluid-2xl": "clamp(1.75rem, 1.4rem + 1.5vw, 2.75rem)",
        "fluid-3xl": "clamp(2.25rem, 1.6rem + 2.8vw, 4rem)",
        "fluid-4xl": "clamp(2.75rem, 2rem + 3.6vw, 5.25rem)",
        "fluid-5xl": "clamp(3.25rem, 2.2rem + 4.8vw, 6.5rem)",
        "fluid-hero": "clamp(1.875rem, 1.3rem + 2.6vw, 4.25rem)",
      },
      letterSpacing: {
        tightest: "-0.025em",
        crushed: "-0.035em",
        airy: "0.01em",
      },
      spacing: {
        section: "clamp(6rem, 4rem + 8vw, 12rem)",
        gutter: "clamp(1.25rem, 0.8rem + 2vw, 2.5rem)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-cinema": "cubic-bezier(0.7, 0, 0.15, 1)",
        "in-cinema": "cubic-bezier(0.85, 0, 0.5, 1)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 600ms ease-out forwards",
        ticker: "ticker 40s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
