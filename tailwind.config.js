/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        lg: "1020px",
        xl: "1180px",
      },
    },
    extend: {
      fontFamily: {
        primary: ["'Afacad'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
