import React from 'react';
import {Stack, SvgIcon, Typography} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {NavLink, useLocation} from "react-router-dom";

const NavDashboardLink = ({toggled, route, icon, name}) => {
    const location = useLocation();

    function getBGColor(theme, active) {
        if (active)
            return {
                normal: `rgba(${theme.palette.primary.main.split("(")[1].split(")")[0].split(", ")[0]}, ${theme.palette.primary.main.split("(")[1].split(")")[0].split(", ")[1]}, ${theme.palette.primary.main.split("(")[1].split(")")[0].split(", ")[2]}, 0.08)`,
                hover: `rgba(${theme.palette.primary.main.split("(")[1].split(")")[0].split(", ")[0]}, ${theme.palette.primary.main.split("(")[1].split(")")[0].split(", ")[1]}, ${theme.palette.primary.main.split("(")[1].split(")")[0].split(", ")[2]}, 0.16)`
            }
        else return {
            normal: 'transparent',
            hover: `rgba(${theme.palette.grey["500"].split("(")[1].split(")")[0].split(", ")[0]}, ${theme.palette.grey["500"].split("(")[1].split(")")[0].split(", ")[1]}, ${theme.palette.grey["500"].split("(")[1].split(")")[0].split(", ")[2]}, 0.08)`
        }
    }

    const active = location.pathname === route;

    return (
        <NavLink to={route} style={{textDecoration: "none"}}>
            <Stack useFlexGap direction={toggled ? "row" : "column"} sx={{color: theme => active ? theme.palette.primary.main : theme.palette.grey["500"], margin: "0 0 4px", padding: toggled ? "4px 8px 4px 12px" : 4 + "px", minWidth: 0, minHeight: 44 + "px", borderRadius: 8 + "px", boxSizing: "border-box", justifyContent: "flex-start", alignItems: "center", verticalAlign: "middle", cursor: "pointer", transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", backgroundColor: theme => getBGColor(theme, active).normal, ":hover": {backgroundColor: theme => getBGColor(theme, active).hover}}}>
                <SvgIcon sx={{width: 24 + "px", height: 24 + "px", marginRight: toggled ? 16 + "px" : 0}}>
                    <FontAwesomeIcon icon={icon}/>
                </SvgIcon>
                <Typography variant="span" sx={{fontSize: toggled ? 0.875 + "rem" : 10 + "px", fontWeight: toggled ? 600 : 700}}>{name}</Typography>
            </Stack>
        </NavLink>
    );
};

export default NavDashboardLink;
