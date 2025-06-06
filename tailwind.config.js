// /home/user/hemmatorg/tailwind.config.js
export const darkMode = 'class';
export const content = [
    './index.html', // Inkludera index.html
    './src/**/*.{js,jsx,css}', // Inkludera css-filer i src, och js/jsx
];
export const theme = {
    extend: { // Använd extend för att lägga till dina färger till standardpaletten
        fontFamily: {
            body: ['PT Sans', 'sans-serif'],
            headline: ['PT Sans', 'sans-serif'],
            code: ['Source Code Pro', 'monospace'],
          },
        colors: {
            primary: {
                main: '#e06627',    // Omdöpt från DEFAULT till main
                dark: '#c75a22',    // En mörkare variant
                light: '#f3a074',   // En ljusare variant
            },
            accent: {
                DEFAULT: '#f3b749', // Din gula/orange accentfärg (korrigerad från #f3b747 om det var ett typo)
                light: '#f7c96f',   // Ljusare variant för hover
            },
            pageTheme: { // Omdöpt från 'background'
                // Du kan definiera DEFAULT här om du vill ha en specifik standard för bg-background
                light: '#efe4de',   // Din ljusa beige för sidbakgrund
                card: '#eed8cb',    // Din mörkare beige för kort/sektioner (blir bg-pageTheme-card)
                hero: '#f0dacd',   // Ny bakgrundsfärg för hero-sektionen
                heroDark: '#283143', // Ny bakgrundsfärg för hero-sektionen (mörkt tema)
            },
            textColors: { // Ny kategori för specifika textfärger
                onAccent: '#281d17', // Mörk textfärg för accentbakgrund
            },
            simplebeige: '#efe4de', // Ny, enkel definition för testning
            // Tailwinds standardfärger (gray, blue, red, etc.) kommer fortfarande att finnas tillgängliga
            // Om du vill anpassa t.ex. gray, kan du göra det här:
            // gray: {
            //   ... dina anpassade grå nyanser ...
            // }
        },
        borderRadius: {
            xl: '1rem',
            '2xl': '1.5rem',
        },
    },
};
export const plugins = [
    require('@tailwindcss/line-clamp'),
];
