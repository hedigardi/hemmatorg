export const darkMode = 'class';
export const content = ['./src/**/*.{js,jsx}'];
export const theme = {
    extend: {
        colors: {
            brand: {
                DEFAULT: '#f97316', // orange-500
                dark: '#ea580c', // orange-600
                light: '#fdba74', // orange-300
            },
        },
        fontFamily: {
            sans: ['Inter', 'sans-serif'],
        },
        borderRadius: {
            xl: '1rem',
            '2xl': '1.5rem',
        },
    },
};
export const plugins = [];