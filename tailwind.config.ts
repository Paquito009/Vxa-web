import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#080808",
        "bg-secondary": "#0A0A0A",
        "bg-card": "#0F0F0F",
        "accent-primary": "#00E5A0",
        "accent-secondary": "#00E5A0",
        "text-primary": "#EFEFEF",
        "text-secondary": "#5A5A5A",
        "text-muted": "#3A3A3A",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 32px rgba(0,229,160,0.08)",
        "glow-md": "0 0 48px rgba(0,229,160,0.12)",
      },
      animation: {
        "fade-in": "fadeIn 0.35s cubic-bezier(0.23,1,0.32,1) forwards",
        "typing-bounce": "typingBounce 1.4s infinite ease-in-out both",
        "line-grow": "lineGrow 0.6s cubic-bezier(0.23,1,0.32,1) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        typingBounce: {
          "0%, 80%, 100%": { transform: "scale(0.6)", opacity: "0.4" },
          "40%": { transform: "scale(1)", opacity: "1" },
        },
        lineGrow: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
