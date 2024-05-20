/** @type {import('tailwindcss').Config} */

module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  variants: {
    extend: {
      fontFamily: {
        sans: ['var(--font-itim)'],
        mono: ['var(--font-irish-grover)'],
      },
      display: ["focus:group"],
      gradientColorStops: theme => ({
        ...theme('colors'),
        'pink-bottom': '#DD2F6E', // Pink color for the bottom gradient
      }),
    }
  }
}

