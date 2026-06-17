import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xs': '320px',
      'sm': '480px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '4k': '2560px',
    },
    extend: {
      colors: {
        base: "var(--bg-base)",
        surface: "var(--bg-surface)",
        elevated: "var(--bg-elevated)",
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        muted: "var(--text-muted)",
        'accent-cork': "var(--accent-cork)",
        'accent-pin': "var(--accent-pin)",
        'accent-blue': "var(--accent-blue)",
        'accent-green': "var(--accent-green)",
        'accent-yellow': "var(--accent-yellow)",
        border: "var(--border)",
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        display: ['var(--font-space-grotesk)'],
        mono: ['var(--font-jetbrains-mono)'],
      },
      fontSize: {
        'xs': '0.6875rem',
        'sm': '0.8125rem',
        'base': '0.9375rem',
        'lg': '1.125rem',
        'xl': '1.375rem',
        '3xl': '2.75rem',
        '4xl': '3.75rem',
      },
      boxShadow: {
        card: "var(--shadow-card)",
      }
    },
  },
  plugins: [],
};
export default config;
