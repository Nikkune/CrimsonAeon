import React, {useContext, useState} from 'react';
import {NavLink, Outlet} from 'react-router-dom';
import {AppBar, Avatar, Badge, Box, Button, Divider, IconButton, Popover, Stack, SvgIcon, Toolbar, Typography} from "@mui/material";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import ModeMUIContext from "../context/ModeMUI";
import {faBell, faChevronRight, faMagnifyingGlass, faTent, faUsers} from "@fortawesome/free-solid-svg-icons";
import CrimsonAeon from "../assets/Crimson Aeon.jpg";
import NavDashboardLink from "../components/NavDashboardLink";
import NavDashboardDrawer from "../components/NavDashboardDrawer";


const NavDashboardWrapper = () => {
    const {mode, toggleMode} = useContext(ModeMUIContext);
    const [toggled, setToggled] = useState(true);
    const [lang, setLang] = useState("FR");

    const [openLangPopover, setOpenLangPopover] = useState(false);
    const [anchorLangPopover, setAnchorLangPopover] = useState(null);

    const [openNotificationPopover, setOpenNotificationPopover] = useState(false);
    const [anchorNotificationPopover, setAnchorNotificationPopover] = useState(null);

    const [openContactPopover, setOpenContactPopover] = useState(false);
    const [anchorContactPopover, setAnchorContactPopover] = useState(null);

    const [openAccountPopover, setOpenAccountPopover] = useState(false);
    const [anchorAccountPopover, setAnchorAccountPopover] = useState(null);

    const handleLangClick = (event) => {
        setAnchorLangPopover(event.currentTarget);
        setOpenLangPopover((previousOpen) => !previousOpen);
    };

    const handleNotificationClick = (event) => {
        setAnchorNotificationPopover(event.currentTarget);
        setOpenNotificationPopover((previousOpen) => !previousOpen);
    };

    const handleContactClick = (event) => {
        setAnchorContactPopover(event.currentTarget);
        setOpenContactPopover((previousOpen) => !previousOpen);
    };

    const handleAccountClick = (event) => {
        setAnchorAccountPopover(event.currentTarget);
        setOpenAccountPopover((previousOpen) => !previousOpen);
    };

    const handleLangClose = () => {
        setOpenLangPopover(false);
        setAnchorLangPopover(null);
    };

    const handleContactClose = () => {
        setOpenContactPopover(false);
        setAnchorContactPopover(null);
    };

    const handleAccountClose = () => {
        setOpenAccountPopover(false);
        setAnchorAccountPopover(null);
    };

    const handleNotificationClose = () => {
        setOpenNotificationPopover(false);
        setAnchorNotificationPopover(null);
    };

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

    function getRGBA(rgb, alpha) {
        return `rgba(${rgb.toString().split("(")[1].split(")")[0].split(", ")[0]}, ${rgb.toString().split("(")[1].split(")")[0].split(", ")[1]}, ${rgb.toString().split("(")[1].split(")")[0].split(", ")[2]}, ${alpha})`
    }

    const handleLangChange = (event) => {
        setLang((prev) => prev !== event.currentTarget.id ? event.currentTarget.id : prev)
        handleLangClose();
    }

    return (
        <>
            <Box sx={{backgroundColor: theme => mode === "dark" ? theme.palette.grey["900"] : "#fff", height: 100 + "vh", width: 100 + "%", transition: "background ease 500ms"}}>
                <AppBar position="fixed" component="header" sx={{minHeight: 64 + "px", backdropFilter: "blur(5px)", background: "transparent", width: toggled ? "calc(100% - 280px)" : "calc(100% - 100px)", boxShadow: "none", zIndex: 1001, transition: "all ease 500ms"}}>
                    <Toolbar>
                        <Stack sx={{flexDirection: "row", alignItems: "center", height: 36 + "px"}}>
                            <IconButton sx={{height: 36 + "px", color: theme => theme.palette.grey["500"]}}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} style={{height: 20 + "px"}}/>
                            </IconButton>
                        </Stack>
                        <Stack sx={{flexDirection: "row", justifyContent: "flex-end", alignItems: "center", flexGrow: 1}} useFlexGap spacing={1}>
                            <IconButton sx={{":hover": {transform: "scale(1.1)"}, color: theme => theme.palette.grey["500"], backgroundColor: theme => openLangPopover ? getRGBA(theme.palette.primary.main, 0.08) : "transparent"}} onClick={handleLangClick}>
                                <Avatar alt="France" src={"https://flagsapi.com/" + lang + "/flat/64.png"} sx={{height: 30 + "px", width: 30 + "px"}}/>
                            </IconButton>
                            <IconButton sx={{":hover": {transform: "scale(1.1)"}, color: theme => theme.palette.grey["500"]}} onClick={handleNotificationClick}>
                                <Badge badgeContent={4} color="error">
                                    <FontAwesomeIcon icon={faBell} style={{height: 20 + "px", width: 20 + "px"}}/>
                                </Badge>
                            </IconButton>
                            <IconButton sx={{":hover": {transform: "scale(1.1)"}, color: theme => theme.palette.grey["500"]}} onClick={handleContactClick}>
                                <FontAwesomeIcon icon={faUsers} style={{height: 20 + "px", width: 20 + "px"}}/>
                            </IconButton>
                            <IconButton sx={{width: 40 + "px", height: 40 + "px", background: theme => openAccountPopover ? `linear-gradient(135deg, ${theme.palette.primary.lighter} 0%, ${theme.palette.primary.main} 100%)` : "transparent", ":hover": {transform: "scale(1.1)"}, color: theme => theme.palette.grey["500"]}} onClick={handleAccountClick}>
                                <Avatar sx={{width: 31 + "px", height: 31 + "px", outline: theme => `2px solid ${mode === "dark" ? theme.palette.grey["900"] : theme.palette.background.default}`}}>N</Avatar>
                            </IconButton>
                        </Stack>
                    </Toolbar>
                </AppBar>
                <Box component="nav" sx={{minWidth: toggled ? 280 + "px" : 100 + "px", height: 100 + "vh", position: "fixed", background: "transparent", borderRight: theme => mode === "dark" ? `1px dashed ${theme.palette.grey["700"]}` : `1px dashed ${theme.palette.grey["300"]}`, zIndex: 1002, transition: "all ease 500ms"}}>
                    <IconButton onClick={() => setToggled(!toggled)} sx={{width: 25 + "px", height: 25 + "px", border: theme => mode === "dark" ? `1px dashed ${theme.palette.grey["700"]}` : `1px dashed ${theme.palette.grey["300"]}`, color: theme => theme.palette.grey["500"], padding: 4 + "px", position: "absolute", top: 32 + "px", left: toggled ? 280 + "px" : 100 + "px", transform: "translate(-12.5px, -12.5px)", backgroundColor: theme => mode === "dark" ? theme.palette.grey["900"] : "#fff", "&:hover": {backgroundColor: theme => mode === "dark" ? theme.palette.grey["700"] : theme.palette.grey["200"]}, transition: "all ease 500ms"}}>
                        <SvgIcon style={{height: 100 + "%", width: 100 + "%", transform: toggled ? "rotate(180deg)" : "rotate(0deg)", transition: "transform ease 500ms"}}>
                            <FontAwesomeIcon icon={faChevronRight} id="toggleIcon"/>
                        </SvgIcon>
                    </IconButton>
                    <Box sx={{width: 100 + "%", height: 64 + "px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <NavLink to={"/"}>
                            <img src={CrimsonAeon} loading="lazy" alt="Crimson Aeon Logo" style={{width: 40 + "px", height: 40 + "px", borderRadius: 50 + "%"}}/>
                        </NavLink>
                    </Box>
                    <Box sx={{height: "calc(100% - 100px)", padding: toggled ? 16 + "px" : 8 + "px", overflowY: "auto", overflowX: "hidden", transition: "all ease 500ms"}}>
                        <NavDashboardDrawer name="Drawer 1">
                            <NavDashboardLink route={"/dashboard"} toggled={toggled} icon={faTent} name="Test 1"/>
                            <NavDashboardLink route={"/dashboard/test"} toggled={toggled} icon={faTent} name="Test 2"/>
                            <NavDashboardLink route={"/dashboard/test2"} toggled={toggled} icon={faTent} name="Test 3"/>
                        </NavDashboardDrawer>
                    </Box>
                </Box>
                <Box component="main" sx={{width: toggled ? "calc(100% - 280px - 2rem)" : "calc(100% - 100px - 2rem)", height: "calc(100vh - 64px - 1rem)", background: "transparent", zIndex: 1000, position: "absolute", left: "auto", right: 0, top: "0", paddingTop: "calc(64px + 1rem)", paddingX: 1 + "rem", overflowY: "auto", "::-webkit-scrollbar": {marginBlockStart: 64 + "px"}, "::-webkit-scrollbar-track": {marginBlockStart: 64 + "px"}, transition: "all ease 500ms"}}>
                    <Box sx={{width: 100 + "%", height: 100 + "%"}}>
                        <Button variant="contained" onClick={() => toggleMode()}>Toggled Mode</Button>
                        <Outlet/>
                    </Box>
                </Box>
            </Box>
            <Popover
                open={openLangPopover}
                anchorEl={anchorLangPopover}
                onClose={handleLangClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    sx: {background: "transparent", border: theme => `1px solid ${getRGBA(theme.palette.text.secondary, 0.2)}`, backdropFilter: "blur(5px)", overflow: "inherit", minHeight: 16 + "px", minWidth: 16 + "px", maxWidth: "calc(100% - 32px)", maxHeight: "calc(100% - 32px)", padding: 4 + "px", borderRadius: 10 + "px", width: 160 + "px"}
                }}
            >
                <Box component="span" sx={{
                    width: 14 + "px",
                    height: 14 + "px",
                    position: "absolute",
                    borderBottomLeftRadius: 3.5 + "px",
                    clipPath: "polygon(0% 0%, 100% 100%, 0% 100%)",
                    border: theme => `1px solid ${getRGBA(theme.palette.text.secondary, 0.2)}`,
                    backdropFilter: "blur(6px)",
                    background: theme => mode === "dark" ? theme.palette.grey["900"] : theme.palette.background.default,
                    top: "-6.5px",
                    transform: "rotate(135deg)",
                    boxShadow: "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)",
                    right: 15 + "px",
                }}/>
                <Stack>
                    <Stack useFlexGap spacing={2} id="FR" onClick={handleLangChange} direction="row" sx={{color: theme => lang === "FR" ? theme.palette.primary.main : theme.palette.grey["500"], margin: "0 0 4px", padding: toggled ? "4px 8px 4px 12px" : 4 + "px", minWidth: 0, minHeight: 44 + "px", borderRadius: 8 + "px", boxSizing: "border-box", justifyContent: "flex-start", alignItems: "center", verticalAlign: "middle", cursor: "pointer", transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", backgroundColor: theme => getBGColor(theme, lang === "FR").normal, ":hover": {backgroundColor: theme => getBGColor(theme, lang === "FR").hover}}}>
                        <Avatar alt="France" src={"https://flagsapi.com/FR/flat/64.png"} sx={{height: 30 + "px", width: 30 + "px"}}/>
                        <Typography variant="span" sx={{fontSize: 0.875 + "rem", fontWeight: 600}}>Français</Typography>
                    </Stack>
                    <Stack useFlexGap spacing={2} id="GB" onClick={handleLangChange} direction="row" sx={{color: theme => lang === "GB" ? theme.palette.primary.main : theme.palette.grey["500"], margin: "0 0 4px", padding: toggled ? "4px 8px 4px 12px" : 4 + "px", minWidth: 0, minHeight: 44 + "px", borderRadius: 8 + "px", boxSizing: "border-box", justifyContent: "flex-start", alignItems: "center", verticalAlign: "middle", cursor: "pointer", transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", backgroundColor: theme => getBGColor(theme, lang === "GB").normal, ":hover": {backgroundColor: theme => getBGColor(theme, lang === "GB").hover}}}>
                        <Avatar alt="France" src={"https://flagsapi.com/GB/flat/64.png"} sx={{height: 30 + "px", width: 30 + "px"}}/>
                        <Typography variant="span" sx={{fontSize: 0.875 + "rem", fontWeight: 600}}>Anglais</Typography>
                    </Stack>
                    <Stack useFlexGap spacing={2} id="ES" onClick={handleLangChange} direction="row" sx={{color: theme => lang === "SP" ? theme.palette.primary.main : theme.palette.grey["500"], margin: "0 0 4px", padding: toggled ? "4px 8px 4px 12px" : 4 + "px", minWidth: 0, minHeight: 44 + "px", borderRadius: 8 + "px", boxSizing: "border-box", justifyContent: "flex-start", alignItems: "center", verticalAlign: "middle", cursor: "pointer", transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", backgroundColor: theme => getBGColor(theme, lang === "SP").normal, ":hover": {backgroundColor: theme => getBGColor(theme, lang === "SP").hover}}}>
                        <Avatar alt="France" src={"https://flagsapi.com/ES/flat/64.png"} sx={{height: 30 + "px", width: 30 + "px"}}/>
                        <Typography variant="span" sx={{fontSize: 0.875 + "rem", fontWeight: 600}}>Espagnole</Typography>
                    </Stack>
                </Stack>
            </Popover>
            <Popover
                open={openContactPopover}
                anchorEl={anchorContactPopover}
                onClose={handleContactClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    sx: {background: "transparent", border: theme => `1px solid ${getRGBA(theme.palette.text.secondary, 0.2)}`, backdropFilter: "blur(5px)", overflow: "inherit", minHeight: 16 + "px", minWidth: 16 + "px", maxWidth: "calc(100% - 32px)", maxHeight: "calc(100% - 32px)", padding: 4 + "px", borderRadius: 10 + "px", width: 320 + "px"}
                }}
            >
                <Box component="span" sx={{
                    width: 14 + "px",
                    height: 14 + "px",
                    position: "absolute",
                    borderBottomLeftRadius: 3.5 + "px",
                    clipPath: "polygon(0% 0%, 100% 100%, 0% 100%)",
                    border: theme => `1px solid ${getRGBA(theme.palette.text.secondary, 0.2)}`,
                    backdropFilter: "blur(6px)",
                    background: theme => mode === "dark" ? theme.palette.grey["900"] : theme.palette.background.default,
                    top: "-6.5px",
                    transform: "rotate(135deg)",
                    boxShadow: "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)",
                    right: 10 + "px",
                }}/>
                <Stack>
                    <Typography variant="h6" sx={{padding: 12 + "px"}}>Contacts <Typography variant="span" sx={{fontWeight: 400}}>(20)</Typography></Typography>
                    <Stack sx={{height: 320 + "px", overflowY: "scroll"}}>
                        <Stack useFlexGap spacing={2} direction="row" sx={{color: theme => theme.palette.grey["500"], margin: "0 0 4px", padding: toggled ? "4px 8px 4px 12px" : 4 + "px", minWidth: 0, minHeight: 44 + "px", borderRadius: 8 + "px", boxSizing: "border-box", justifyContent: "flex-start", alignItems: "center", verticalAlign: "middle", cursor: "pointer", transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", backgroundColor: theme => getBGColor(theme, false).normal, ":hover": {backgroundColor: theme => getBGColor(theme, false).hover}}}>
                            <Badge
                                color="success"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                variant="dot"
                                overlap="circular"
                                sx={{"& .MuiBadge-badge": {outline: theme => `3px solid ${mode === "dark" ? theme.palette.grey["900"] : theme.palette.background.default}`}}}
                            >
                                <Avatar sx={{height: 30 + "px", width: 30 + "px"}}>N</Avatar>
                            </Badge>
                            <Typography variant="span" sx={{fontSize: 0.875 + "rem", fontWeight: 600}}>Nikkune</Typography>
                        </Stack>
                        <Stack useFlexGap spacing={2} direction="row" sx={{color: theme => theme.palette.grey["500"], margin: "0 0 4px", padding: toggled ? "4px 8px 4px 12px" : 4 + "px", minWidth: 0, minHeight: 44 + "px", borderRadius: 8 + "px", boxSizing: "border-box", justifyContent: "flex-start", alignItems: "center", verticalAlign: "middle", cursor: "pointer", transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", backgroundColor: theme => getBGColor(theme, false).normal, ":hover": {backgroundColor: theme => getBGColor(theme, false).hover}}}>
                            <Badge
                                color="success"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                variant="dot"
                                overlap="circular"
                                sx={{"& .MuiBadge-badge": {outline: theme => `3px solid ${mode === "dark" ? theme.palette.grey["900"] : theme.palette.background.default}`}}}
                            >
                                <Avatar sx={{height: 30 + "px", width: 30 + "px"}}>J</Avatar>
                            </Badge>
                            <Typography variant="span" sx={{fontSize: 0.875 + "rem", fontWeight: 600}}>John Doe</Typography>
                        </Stack>
                        <Stack useFlexGap spacing={2} direction="row" sx={{color: theme => theme.palette.grey["500"], margin: "0 0 4px", padding: toggled ? "4px 8px 4px 12px" : 4 + "px", minWidth: 0, minHeight: 44 + "px", borderRadius: 8 + "px", boxSizing: "border-box", justifyContent: "flex-start", alignItems: "center", verticalAlign: "middle", cursor: "pointer", transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", backgroundColor: theme => getBGColor(theme, false).normal, ":hover": {backgroundColor: theme => getBGColor(theme, false).hover}}}>
                            <Badge
                                color="success"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                variant="dot"
                                overlap="circular"
                                sx={{"& .MuiBadge-badge": {outline: theme => `3px solid ${mode === "dark" ? theme.palette.grey["900"] : theme.palette.background.default}`}}}
                            >
                                <Avatar sx={{height: 30 + "px", width: 30 + "px"}}>E</Avatar>
                            </Badge>
                            <Typography variant="span" sx={{fontSize: 0.875 + "rem", fontWeight: 600}}>Elisabet Eddi</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Popover>
            <Popover
                open={openAccountPopover}
                anchorEl={anchorAccountPopover}
                onClose={handleAccountClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    sx: {background: "transparent", border: theme => `1px solid ${getRGBA(theme.palette.text.secondary, 0.2)}`, backdropFilter: "blur(5px)", overflow: "inherit", minHeight: 16 + "px", minWidth: 16 + "px", maxWidth: "calc(100% - 32px)", maxHeight: "calc(100% - 32px)", padding: 4 + "px", borderRadius: 10 + "px"}
                }}
            >
                <Box component="span" sx={{
                    width: 14 + "px",
                    height: 14 + "px",
                    position: "absolute",
                    borderBottomLeftRadius: 3.5 + "px",
                    clipPath: "polygon(0% 0%, 100% 100%, 0% 100%)",
                    border: theme => `1px solid ${getRGBA(theme.palette.text.secondary, 0.2)}`,
                    backdropFilter: "blur(6px)",
                    background: theme => mode === "dark" ? theme.palette.grey["900"] : theme.palette.background.default,
                    top: "-6.5px",
                    transform: "rotate(135deg)",
                    boxShadow: "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)",
                    right: 12 + "px",
                }}/>
                <Stack>
                    <Stack useFlexGap spacing={0} direction="column" sx={{padding: "16px 16px 12px"}}>
                        <Typography variant="span" sx={{fontSize: 0.875 + "rem", fontWeight: 600}}>Nikkune</Typography>
                        <Typography variant="span" sx={{fontSize: 0.875 + "rem", fontWeight: 200, color: theme => theme.palette.text.secondary}}>nikkune.dev@protonmail.com</Typography>
                    </Stack>
                    <Divider/>
                    <Stack sx={{padding: 8 + "px"}} useFlexGap spacing={0.5}>
                        <Box sx={{padding: "6px 8px", borderRadius: 6 + "px", cursor: "pointer", ":hover": {backgroundColor: theme => getRGBA(theme.palette.grey["500"], 0.2)}}}>
                            <Typography variant="span" sx={{fontSize: 0.875 + "rem", fontWeight: 400}}>Home</Typography>
                        </Box>
                        <Box sx={{padding: "6px 8px", borderRadius: 6 + "px", cursor: "pointer", ":hover": {backgroundColor: theme => getRGBA(theme.palette.grey["500"], 0.2)}}}>
                            <Typography variant="span" sx={{fontSize: 0.875 + "rem", fontWeight: 400}}>Profile</Typography>
                        </Box>
                        <Box sx={{padding: "6px 8px", borderRadius: 6 + "px", cursor: "pointer", ":hover": {backgroundColor: theme => getRGBA(theme.palette.grey["500"], 0.2)}}}>
                            <Typography variant="span" sx={{fontSize: 0.875 + "rem", fontWeight: 400}}>Settings</Typography>
                        </Box>
                    </Stack>
                    <Divider/>
                    <Box sx={{padding: 8 + "px"}}>
                        <Box sx={{padding: "6px 8px", borderRadius: 6 + "px", cursor: "pointer", ":hover": {backgroundColor: theme => getRGBA(theme.palette.grey["500"], 0.2)}}}>
                            <Typography variant="span" sx={{fontSize: 0.875 + "rem", fontWeight: 600, color: theme => theme.palette.primary.main}}>Logout</Typography>
                        </Box>
                    </Box>
                </Stack>
            </Popover>
        </>
    );
};

export default NavDashboardWrapper;
