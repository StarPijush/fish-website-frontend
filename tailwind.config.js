/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "rgb(var(--color-border) / <alpha-value>)", // muted blue
        input: "rgb(var(--color-input) / <alpha-value>)", // white
        ring: "rgb(var(--color-ring) / <alpha-value>)", // accent cyan
        background: "rgb(var(--color-background) / <alpha-value>)", // light ocean
        foreground: "rgb(var(--color-foreground) / <alpha-value>)", // dark text
        primary: {
          DEFAULT: "rgb(var(--color-primary) / <alpha-value>)", // ocean blue
          foreground: "rgb(var(--color-primary-foreground) / <alpha-value>)", // white
        },
        secondary: {
          DEFAULT: "rgb(var(--color-secondary) / <alpha-value>)", // coral
          foreground: "rgb(var(--color-secondary-foreground) / <alpha-value>)", // white
        },
        destructive: {
          DEFAULT: "rgb(var(--color-destructive) / <alpha-value>)", // red-500
          foreground: "rgb(var(--color-destructive-foreground) / <alpha-value>)", // white
        },
        muted: {
          DEFAULT: "rgb(var(--color-muted) / <alpha-value>)", // muted blue
          foreground: "rgb(var(--color-muted-foreground) / <alpha-value>)", // muted text
        },
        accent: {
          DEFAULT: "rgb(var(--color-accent) / <alpha-value>)", // aqua cyan
          foreground: "rgb(var(--color-accent-foreground) / <alpha-value>)", // dark
        },
        popover: {
          DEFAULT: "rgb(var(--color-popover) / <alpha-value>)", // white
          foreground: "rgb(var(--color-popover-foreground) / <alpha-value>)", // dark
        },
        card: {
          DEFAULT: "rgb(var(--color-card) / <alpha-value>)", // white
          foreground: "rgb(var(--color-card-foreground) / <alpha-value>)", // dark
        },
        success: {
          DEFAULT: "rgb(var(--color-success) / <alpha-value>)", // emerald-500
          foreground: "rgb(var(--color-success-foreground) / <alpha-value>)", // white
        },
        warning: {
          DEFAULT: "rgb(var(--color-warning) / <alpha-value>)", // amber-500
          foreground: "rgb(var(--color-warning-foreground) / <alpha-value>)", // white
        },
        error: {
          DEFAULT: "rgb(var(--color-error) / <alpha-value>)", // red-500
          foreground: "rgb(var(--color-error-foreground) / <alpha-value>)", // white
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['DM Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "bubble-rise": {
          "0%": { transform: "translateY(0) scale(0)", opacity: "0" },
          "10%": { opacity: "0.6" },
          "90%": { opacity: "0.6" },
          "100%": { transform: "translateY(-100vh) scale(1.2)", opacity: "0" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "float": "float 6s ease-in-out infinite",
        "bubble": "bubble-rise 15s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}