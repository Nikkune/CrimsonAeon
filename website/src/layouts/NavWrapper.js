import React from 'react';
import {Outlet} from 'react-router-dom';

const NavWrapper = () => {
    return (
        <>
            <Outlet/>
        </>
    );
};

export default NavWrapper;
