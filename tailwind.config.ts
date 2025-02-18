import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",  // Ensures black background
        foreground: "var(--foreground)",
      },
      screens: {
        // Mobile first breakpoints (in pixels)
        'sm': '480px',   // Small mobile
        'md': '768px',   // Tablets
        'lg': '1024px',  // Small desktop
        'xl': '1180px',  // Larger desktop
        
        // Responsive for large screens with viewport width
        '2xl': '1600px', // Very large screens (extra wide)
        // You can optionally add these for very specific responsive needs
        'xxl': '2000px', // Ultra large screens
      },
      fontSize: {
        // Set font size using rem or em for better readability on high res
        'base': '1rem',  // Base font size
        'lg': '1.125rem', // Slightly larger font for readability
        'xl': '1.25rem', // Larger for headers
        '2xl': '1.5rem', // Even larger for bigger displays
      },
    },
  },
  plugins: [],
} satisfies Config;