import React from 'react';
import {NavLink, useLocation} from "react-router-dom";
import {Button} from "@mui/material";

const NavBaseLink = ({route, name}) => {
    const location = useLocation();

    const active = location.pathname === route;

    return (
        <NavLink to={route} style={{textDecoration: "none"}}>
            <Button variant="text" component="div" sx={{color: theme => active ? theme.palette.primary.main : theme.palette.text.primary, ":hover": {color: theme => active ? theme.palette.primary.dark : theme.palette.text.secondary, background: "transparent"}, "&:before": {content: '""', borderRadius: 50 + "%", position: "absolute", width: 6 + "px", height: 6 + "px", left: "-5px", opacity: 0.48, backgroundColor: "currentcolor", visibility: active ? "visible" : "hidden"}}}>{name}</Button>
        </NavLink>
    );
};

export default NavBaseLink;
