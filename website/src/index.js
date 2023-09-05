import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        type: 'dark', // Mode sombre
        primary: {
            main: '#ff5722', // Couleur primaire personnalisée
        },
    },
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </React.StrictMode>
);
