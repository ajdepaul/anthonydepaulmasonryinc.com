import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'theme-gold': '#FFAD0B',
        'theme-light-gray': '#C5C0BD',
        'theme-dark-gray': '#373737'
      },
    },
  },
  plugins: [],
} satisfies Config;
