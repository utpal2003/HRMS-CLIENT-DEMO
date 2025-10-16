/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Geist', 'sans-serif'],
      },
      colors: {
        nav: '#4da6ff',
        background: '#e6f2ff',
        shadow: '#cce6ff',
        card: '#ffffff',
        sidebar: '#cce6ff',
        text: '#2b2c34',
        button: '#FF4500',
        primary: 'white',
        secondary: '#CBD5E1',
        'indomitech-blue': '#3F51B5',
        'light-grey': '#E0E0E0',
        'dark-grey-text': '#607D8B',




        // Primary Brand Color (Orange/Amber theme)
        'brandPrimary': '#F97316',     // Main actionable color (e.g., CTA buttons, active icons)
        'brandHover': '#EA580C',       // Darker shade for hover states
        'brandLight': '#FFEDD5',       // Light background for headers (e.g., table header)
        'brandBackground': '#FFF7ED',  // Page background/surface light (e.g., bg-orange-50)
        'brandText': '#7C2D12',        // Dark text/headings

        // Secondary Colors (For navigation/text that contrasts with orange)
        'secondaryText': '#4B5563',    // General body text color (Gray-600)
        'surfaceNeutral': '#F3F4F6',   // Neutral light background (Gray-100)

        // Status Colors
        'success': '#10B981',          // Green for published/success states
        'successLight': '#D1FAE5',     // Light green for success badge background
        'error': '#EF4444',            // Red for unpublished/error states
        'errorLight': '#FEE2E2',       // Light red for error badge background



      },
    },
  },
  plugins: [],
}
