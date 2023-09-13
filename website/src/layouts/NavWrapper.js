import React, {useContext} from 'react';
import {NavLink, Outlet} from 'react-router-dom';
import {AppBar, Avatar, Box, Button, Stack, Toolbar} from "@mui/material";
import ModeMUIContext from "../context/ModeMUI";
import CrimsonAeon from "../assets/Crimson Aeon.jpg";
import NavBaseLink from "../components/NavBaseLink";

const NavWrapper = () => {
    const {mode, toggleMode} = useContext(ModeMUIContext);

    const isConnected = false;

    return (
        <>
            <Box sx={{backgroundColor: theme => mode === "dark" ? theme.palette.grey["900"] : "#fff", height: 100 + "vh", width: 100 + "%", transition: "background ease 500ms"}}>
                <AppBar position="fixed" component="header" sx={{minHeight: 64 + "px", backdropFilter: "blur(5px)", background: "transparent", width: 100 + "%", boxShadow: "none", zIndex: 1001, transition: "all ease 500ms"}}>
                    <Toolbar>
                        <Stack direction="row" sx={{alignItems: "center", height: 36 + "px"}}>
                            <NavLink to={"/"}>
                                <img src={CrimsonAeon} loading="lazy" alt="Crimson Aeon Logo" style={{width: 40 + "px", height: 40 + "px", borderRadius: 50 + "%"}}/>
                            </NavLink>
                        </Stack>
                        <Stack direction="row" sx={{justifyContent: "flex-end", alignItems: "center", flexGrow: 1}} useFlexGap spacing={1}>
                            <Stack direction="row" component="nav" useFlexGap spacing={0.5}>
                                <NavBaseLink route={"/home"} name="Home"/>
                                <NavBaseLink route={"/story"} name="Story"/>
                                <NavBaseLink route={"/leaderboards"} name="Leaderboards"/>
                                <NavBaseLink route={"/news"} name="News"/>
                                <NavBaseLink route={"/skills"} name="Skills"/>
                            </Stack>
                            {
                                isConnected ? (<Avatar sx={{width: 31 + "px", height: 31 + "px", outline: theme => `2px solid ${mode === "dark" ? theme.palette.grey["900"] : theme.palette.background.default}`}}>N</Avatar>)
                                    : (<NavLink to={"/auth/login"} style={{textDecoration: "none"}}><Button variant="outlined" color="grey">Login</Button></NavLink>)
                            }
                        </Stack>
                    </Toolbar>
                </AppBar>
                <Box component="main" sx={{width: "calc(100% - 2rem)", height: "calc(100vh - 64px - 1rem)", background: "transparent", zIndex: 1000, position: "absolute", left: 0, top: "0", paddingTop: "calc(64px + 1rem)", paddingX: 1 + "rem", overflowY: "auto", "::-webkit-scrollbar": {marginBlockStart: 64 + "px"}, "::-webkit-scrollbar-track": {marginBlockStart: 64 + "px"}, transition: "all ease 500ms"}}>
                    <Box sx={{width: 100 + "%", height: 100 + "%"}}>
                        <Button variant="contained" onClick={() => toggleMode()}>Toggled Mode</Button>
                        <Outlet/>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default NavWrapper;
