import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import NavWrapper from "./layouts/NavWrapper";
import NavAuthWrapper from "./layouts/NavAuthWrapper";
import NavDashboardWrapper from "./layouts/NavDashboardWrapper";
import {createTheme} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";
import ModeMUIContext from "./context/ModeMUI";

const getDesignTokens = (mode) => ({
    palette: {
        mode,
        primary: {
            main: "#FF3030"
        },
        secondary: {
            main: "#8E33FF"
        },
        info: {
            main: "#00B8D9"
        },
        success: {
            main: "#22C55E"
        },
        warning: {
            main: "#FFAB00"
        },
        error: {
            main: "#FF5630"
        },
        grey: {
            "100": "#F9FAFB",
            "200": "#F4F6F8",
            "300": "#DFE3E8",
            "400": "#C4CDD5",
            "500": "#919EAB",
            "600": "#637381",
            "700": "#454F5B",
            "800": "#212B36",
            "900": "#161C24"
        },
    },
});


const App = () => {
    const [mode, setMode] = useState('dark');
    const [theme, setTheme] = useState(createTheme(getDesignTokens(mode)));

    // Update the theme only if the mode changes
    useEffect(() => {
        setTheme(createTheme(getDesignTokens(mode)));
    }, [mode]);


    const toggleMode = useCallback(
        () => {
            setMode(m => m === "dark" ? "light" : "dark");
        }, []
    );

    const value = useMemo(() => {
        return {
            mode: mode,
            toggleMode
        }
    }, [mode, toggleMode]);

    return (
        <ModeMUIContext.Provider value={value}>
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route path="/" element={<NavWrapper/>}>
                        {/* Exemple : <Route path="/" element={<Home/>}/>*/}
                    </Route>
                    <Route path="/auth" element={<NavAuthWrapper/>}>
                        {/* Exemple : <Route path="/" element={<SignUp/>}/>*/}
                    </Route>
                    <Route path="/dashboard" element={<NavDashboardWrapper/>}>
                        {/* Exemple : <Route path="/" element={<Dashboard/>}/>*/}
                    </Route>
                </Routes>
            </ThemeProvider>
        </ModeMUIContext.Provider>
    );
};

export default App;
