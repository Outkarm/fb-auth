/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',

        // Or if using `src` directory:
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                mainBlue: '#103395',
                bgOffWhite: '#EAFAFF',
                textOffWhite: '#EAFAFF',
                bgBlue: '#0F0041',
                textBlueSection: '#0F0041',
                textSageGreen: '#263238',
                textWhite: '#F8FBFC',
                bgBlack: '#00040C',
                textBlue: '#88FCFF',
                textHover: '#e5e5e5',
                textOffBlue: '#C9E6FA',
                bgOffBlue: '#C9E6FA',
                textPink: '#A92E78',
                textDarkBlue: '#001423',
                textWhiteAlt: '#C0C0C0',
                gradientPurple: '#A5A6F6',
                gradientRed: '#AA0047',
                textWhiteAlt2: '#B5B5B5',
                bgWhiteAlt: '#F3F1F1',
                textBlueAlt: '#103395',
                bgBlueAlt: '#103395',
                bgBlueAlt2: '#003E58',
                textBlueAlt: '#003E58',
                textGreen: '#1BB55C',
                navUnderlineBlue: '#C9E6FA',
                navUnderlineBlueActive: '#88E8FF',
                navUnderlineGreyHover: '#64748b',
                bgSecondary: '#EDF2F7',
                bgPrimary: "#B5CDFF",
                textPrimary: "#103395",
                textSecondary: "#01405B",
                textThrid: "#1E1E1E",
                textFourth : "#2D3037",
                btnPrimary:"#003449",
                btnPrimaryHover: "#024058"
            },
            fontFamily: {
                sitara: ['var(--font-sitara)'],
                aBeeZee: ['var(--font-ABeeZee)'],
                inter: ['var(--font-inter)'],
            },
        },
    },
    plugins: [],
};
