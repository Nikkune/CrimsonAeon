import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import NavWrapper from "./layouts/NavWrapper";
import NavAuthWrapper from "./layouts/NavAuthWrapper";
import NavDashboardWrapper from "./layouts/NavDashboardWrapper";
import {createTheme} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";
import ModeMUIContext from "./context/ModeMUI";
import Loader from "./features/Loader";
import Login from "./features/Login";
import SignUp from "./features/SignUp";
import ForgetPassword from "./features/ForgetPassword";
import CheckEmail from "./features/CheckEmail";

const getDesignTokens = (mode) => ({
    palette: {
        mode,
        primary: {
            main: "rgb(255, 48, 48)",
            lighter: "rgb(255, 227, 213)",
            darker: "rgb(122, 9, 48)"
        },
        secondary: {
            main: "rgb(142, 51, 255)",
            lighter: "rgb(239, 214, 255)",
            darker: "rgb(39, 9, 122)"
        },
        info: {
            main: "rgb(0, 184, 217)",
            lighter: "rgb(202, 253, 245)",
            darker: "rgb(0, 55, 104)"
        },
        success: {
            main: "rgb(34, 197, 94)",
            lighter: "rgb(211, 252, 210)",
            darker: "rgb(6, 94, 73)"
        },
        warning: {
            main: "rgb(255, 171, 0)",
            lighter: "rgb(255, 245, 204)",
            darker: "rgb(122, 65, 0)"
        },
        error: {
            main: "rgb(255, 86, 48)",
            lighter: "rgb(255, 233, 213)",
            darker: "rgb(122, 9, 22)"
        },
        grey: {
            main: "rgb(145, 158, 171)",
            "100": "rgb(249, 250, 251)",
            "200": "rgb(244, 246, 248)",
            "300": "rgb(223, 227, 232)",
            "400": "rgb(196, 205, 213)",
            "500": "rgb(145, 158, 171)",
            "600": "rgb(99, 115, 129)",
            "700": "rgb(69, 79, 91)",
            "800": "rgb(33, 43, 54)",
            "900": "rgb(22, 28, 36)"
        },
    },
    typography: {
        fontFamily: 'Poppins',
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
                        <Route path="*" element={<Loader/>}/>
                    </Route>
                    <Route path="/auth" element={<NavAuthWrapper/>}>
                        <Route index element={<SignUp/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="forgetPW" element={<ForgetPassword/>}/>
                        <Route path="checkEmail" element={<CheckEmail/>}/>
                        {/* Exemple : <Route path="/" element={<SignUp/>}/>*/}
                    </Route>
                    <Route path="/dashboard" element={<NavDashboardWrapper/>}>
                        {/* Exemple : <Route path="/" element={<Dashboard/>}/>*/}
                        <Route path="*" element={<Loader/>}/>
                    </Route>
                </Routes>
            </ThemeProvider>
        </ModeMUIContext.Provider>
    );
};

export default App;
