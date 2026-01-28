/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        blob: "blob 7s infinite",
        'pulse-slow': 'buttonPulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        buttonPulse: {
          '0%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(236, 72, 153, 0.6)' },
          '70%': { transform: 'scale(1.03)', boxShadow: '0 0 0 25px rgba(236, 72, 153, 0)' },
          '100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(236, 72, 153, 0)' },
        }
      },
    },
  },
  plugins: [],
}