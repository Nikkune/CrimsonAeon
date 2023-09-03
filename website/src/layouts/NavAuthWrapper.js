import React from 'react';
import {Outlet} from 'react-router-dom';

const NavAuthWrapper = () => {
    return (
        <>
            <Outlet/>
        </>
    );
};

export default NavAuthWrapper;
