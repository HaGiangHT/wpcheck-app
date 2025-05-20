import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1E3384',
        },
        secondary: {
            main: '#8eacbb',
        },
        background: {
            default: '#ffffff',
        },

    },
    typography: {
        fontFamily: '"Source Sans Pro", sans-serif',
        h5: {
            fontWeight: 500,
            fontSize: '1.6rem',
            // Responsive Anpassungen
            '@media (max-width:600px)': {
                fontSize: '1.3rem',
            },
            '@media (min-width:600px) and (max-width:960px)': {
                fontSize: '1.45rem',
            },
        },
        body1: {
            fontSize: '1.05rem',
            '@media (max-width:600px)': {
                fontSize: '0.95rem',
            },
            '@media (min-width:600px) and (max-width:960px)': {
                fontSize: '1rem',
            },
        },
        button: {
            fontSize: '1.3rem',
            // Responsive Anpassungen
            '@media (max-width:600px)': {
                fontSize: '1rem',
            },
            '@media (min-width:600px) and (max-width:960px)': {
                fontSize: '1.25rem',
            },
            textTransform: 'none',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    padding: '8px 16px',
                    '@media (max-width:600px)': {
                        padding: '6px 12px',
                    },
                },
            },
        },
    },
});

export default theme;
