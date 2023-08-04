/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

const primary = {
  400: colors.orange[400],
  500: colors.orange[500],
  600: colors.orange[600],
};

const secondary = {
  400: "#F6D3C5",
  500: "#F6C5B1",
  600: "#F4A07E",
};

const blueGray = {
  200: "#e2e8f0",
  400: "#94a3b8",
  600: "#475569",
  800: "#1e293b",
};

const base = {
  white: "#F8F7FB",
  black: "#222222",
  disabled: "#78716C",
  error: "#f44336",
  warning: "#ffb300",
  info: "#2196f3",
  success: "#4caf50",
};

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary,
        secondary,
        blueGray,
        info: base.info,
        success: base.success,
        white: base.white,
        black: base.black,
      },
      fontSize: {
        small: ["0.875rem", "1.25rem"] /* 14px with 20px line height */,
        medium: ["1rem", "1.5rem"] /* 16px with 24px line height */,
        large: ["1.125rem", "1.75rem"] /* 18px with 28px line height */,
        xlarge: ["1.25rem", "1.75rem"] /* 20px with 28px line height */,
        huge: ["1.5rem", "2rem"] /* 24px with 32px line height */,
      },
    },
  },
  plugins: [],
};
