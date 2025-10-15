// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // This line tells Tailwind to look in the 'index.html' file at the root
    "./index.html", 
    
    // THIS IS THE CRITICAL LINE: 
    // It scans all files ending in .js, .jsx, .ts, or .tsx 
    // within the 'src' directory and its subdirectories (like components/).
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}