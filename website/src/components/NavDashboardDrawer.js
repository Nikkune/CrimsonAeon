import React, {useState} from 'react';
import {Stack, Typography} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronUp} from "@fortawesome/free-solid-svg-icons";

const NavDashboardDrawer = ({name, children}) => {
    const [drawerToggled, setDrawerToggled] = useState(true);
    return (
        <>
            <Typography onClick={() => {
                setDrawerToggled(!drawerToggled)
            }} sx={{textTransform: "uppercase", padding: "16px 0px 8px 4px", marginBottom: 4 + "px", boxSizing: "border-box", cursor: "pointer", transition: "color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", fontSize: 11 + "px", fontWeight: 700, color: theme => theme.palette.grey["500"], ":hover": {color: theme => theme.palette.text.primary}}}>
                {name}
                <FontAwesomeIcon icon={faChevronUp} style={{marginLeft: 5 + "px", transform: drawerToggled ? "rotate(0deg)" : "rotate(180deg)", transition: "transform ease 300ms"}}/>
            </Typography>
            <Stack useFlexGap direction="column" spacing="2" sx={{minHeight: 0, height: drawerToggled ? 48 * children.length + "px" : 0 + "px", transitionDuration: "300ms", overflow: "hidden", transition: "height 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"}}>
                {
                    children
                }
            </Stack>
        </>
    );
};

export default NavDashboardDrawer;
