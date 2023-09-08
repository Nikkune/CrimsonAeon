import React, {useContext, useState} from 'react';
import {Outlet} from 'react-router-dom';
import {AppBar, Box, Button, IconButton, SvgIcon} from "@mui/material";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import ModeMUIContext from "../context/ModeMUI";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";


const NavDashboardWrapper = () => {
    const {mode, toggleMode} = useContext(ModeMUIContext);
    const [toggled, setToggled] = useState(false);

    return (
        <>
            <Box sx={{backgroundColor: theme => mode === "dark" ? theme.palette.grey["900"] : "#fff", height: 100 + "vh", width: 100 + "%", transition: "background ease 500ms"}}>
                <AppBar position="fixed" component="header" sx={{minHeight: 64 + "px", backdropFilter: "blur(5px)", background: "transparent", width: toggled ? "calc(100% - 280px)" : "calc(100% - 90px)", boxShadow: "none", zIndex: 1001, transition: "all ease 500ms"}}>

                </AppBar>
                <Box component="nav" sx={{minWidth: toggled ? 280 + "px" : 90 + "px", height: 100 + "vh", position: "fixed", background: "transparent", borderRight: mode === "dark" ? "1px dashed white" : "1px dashed black", zIndex: 1002, transition: "all ease 500ms"}}>
                    <IconButton onClick={() => setToggled(!toggled)} sx={{width: 25 + "px", height: 25 + "px", border: mode === "dark" ? "1px dashed white" : "1px dashed black", padding: 4 + "px", position: "absolute", top: 32 + "px", left: toggled ? 280 + "px" : 90 + "px", transform: "translate(-12.5px, -12.5px)", backgroundColor: theme => mode === "dark" ? theme.palette.grey["900"] : "#fff", "&:hover": {backgroundColor: theme => mode === "dark" ? theme.palette.grey["700"] : theme.palette.grey["200"]}, transition: "all ease 500ms"}}>
                        <SvgIcon style={{height: 100 + "%", width: 100 + "%", transform: toggled ? "rotate(180deg)" : "rotate(0deg)", transition: "transform ease 500ms"}}>
                            <FontAwesomeIcon icon={faChevronRight} id="toggleIcon"/>
                        </SvgIcon>
                    </IconButton>
                </Box>
                <Box component="main" sx={{width: toggled ? "calc(100% - 280px - 2rem)" : "calc(100% - 90px - 2rem)", height: "calc(100vh - 64px - 1rem)", background: "transparent", zIndex: 1000, position: "absolute", left: "auto", right: 0, top: "0", paddingTop: "calc(64px + 1rem)", paddingX: 1 + "rem", transition: "all ease 500ms"}}>
                    <Button variant="contained" onClick={() => toggleMode()}>Toggled Mode</Button>
                </Box>
                <Outlet/>
            </Box>
        </>
    );
};

export default NavDashboardWrapper;
