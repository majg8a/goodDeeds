/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        "bg-base": "rgb(var(--color-bg-base) / <alpha-value>)",
        "text-base": "rgb(var(--color-text-base) / <alpha-value>)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
