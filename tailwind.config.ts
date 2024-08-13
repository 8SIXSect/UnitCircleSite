/** @type {import('tailwindcss').Config} */

const tailwindConfig = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            width: {
                "base": "80vw"
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],

};


export default tailwindConfig;

