import React, {useContext} from 'react';
import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import Landscape from "../assets/Landscape.jpg";
import ModeMUIContext from "../context/ModeMUI";
import {faChevronLeft, faChevronRight, faUnlockKeyhole} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {NavLink} from "react-router-dom";

const ForgetPassword = () => {
    const {mode, toggleMode} = useContext(ModeMUIContext);
    return (
        <Stack component="main" sx={{width: 100 + "%", height: 100 + "vh", backgroundImage: `url(${Landscape})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center", zIndex: 1000, position: "absolute"}}>
            <Box sx={{width: "calc(100% - 1rem)", height: "calc(100% - 1rem)", backdropFilter: "blur(40px)", padding: 0.5 + "rem", overflowY: "auto", transition: "all ease 500ms", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Box sx={{backgroundColor: theme => mode === "dark" ? theme.palette.grey["900"] : theme.palette.background.default, color: theme => theme.palette.text.primary, padding: "40px 24px", maxWidth: "calc(420px - 48px)", borderRadius: 16 + "px"}}>
                    <form style={{width: 100 + "%"}}>
                        <FontAwesomeIcon icon={faUnlockKeyhole} style={{width: 100 + "%", height: 96 + "px"}}/>
                        <Stack useFlexGap spacing={2} sx={{marginBlock: 40 + "px"}}>
                            <Typography variant="h3" sx={{fontSize: 1.875 + "rem", fontWeight: 700, textAlign: "center", color: theme => theme.palette.text.primary}}>Forgot your password?</Typography>
                            <Typography variant="p" sx={{fontSize: 0.875 + "rem", textAlign: "center", color: theme => theme.palette.text.secondary}}>Please enter the email address associated with your account and We will email you a link to reset your password.</Typography>
                        </Stack>
                        <Stack useFlexGap spacing={3}>
                            <TextField label="Email address" color="secondary" variant="outlined"/>
                            <Button variant="contained" endIcon={<FontAwesomeIcon icon={faChevronRight} style={{marginLeft: "calc(420px - 14rem)"}}/>}>Send Request</Button>
                            <NavLink to={"/auth/login"} style={{textDecoration: "none", width: 100 + "%", textAlign: "center"}}>
                                <Typography variant="p" sx={{color: theme => theme.palette.text.primary, fontWeight: 500, fontSize: 0.75 + "rem", cursor: "pointer", ":hover": {textDecoration: "underline"}}}><FontAwesomeIcon icon={faChevronLeft}/> Return to sign in</Typography>
                            </NavLink>
                        </Stack>
                    </form>
                </Box>
            </Box>
        </Stack>
    );
};

export default ForgetPassword;