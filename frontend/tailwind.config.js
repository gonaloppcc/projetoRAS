/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                WHITE: '#ffffff',
                CULTURED: '#F5F3F4',
                BLACK_SHADOW: '#B1A7A6',
                LIGHT_GRAY: '#D3D3D3',
                IMPERIAL_RED: '#E5383B',
                CARNELIAN: '#BA181B',
                RUBY_RED: '#A4161A',
                BLOOD_RED: '#660708',
                EERIE_BLACK: '#161A1D',
                RICH_BLACK: '#0B090A',
                SPECIAL: '#FFCC00',
                SPECIAL_DARK: '#E6B800',
                FADE_BLACK: 'rgba(0, 0, 0, 0.1)',
                RIGHT_GREEN: '#60C625',
            },
            fontFamily: {
                sans: ['Roboto', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
