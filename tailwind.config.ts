import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'tolf-black':   '#0A0A0A',
        'tolf-dark':    '#0D0D0D',
        'tolf-card':    '#111111',
        'tolf-divider': '#1A1A1A',
        'tolf-gold':    '#C9A84C',
        'tolf-gold-dark':'#A8873A',
        'tolf-muted':   '#555555',
        'tolf-secondary':'#888888',
      },
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
      },
      transitionTimingFunction: {
        'luxury':   'cubic-bezier(0.25, 0.10, 0.00, 1.00)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.30, 1)',
        'in-out':   'cubic-bezier(0.83, 0, 0.17, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
