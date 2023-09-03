import React from 'react';
import {Routes, Route} from 'react-router-dom';
import NavWrapper from "./layouts/NavWrapper";
import NavAuthWrapper from "./layouts/NavAuthWrapper";
import NavDashboardWrapper from "./layouts/NavDashboardWrapper";

const App = () => {
    return (
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
    );
};

export default App;
