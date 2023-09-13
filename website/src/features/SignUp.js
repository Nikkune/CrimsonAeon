import React, {useContext} from 'react';
import {Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography} from "@mui/material";
import ModeMUIContext from "../context/ModeMUI";
import {NavLink} from "react-router-dom";
import CrimsonAeon from "../assets/Crimson Aeon.jpg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight, faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import Landscape from "../assets/Landscape.jpg";

const SignUp = () => {
    const {mode, toggleMode} = useContext(ModeMUIContext);
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <Stack component="main" direction="row" sx={{width: "calc(100% - 1rem)", height: "calc(100vh - 1rem)", backgroundColor: theme => mode === "dark" ? theme.palette.grey["900"] : theme.palette.background.default, zIndex: 1000, position: "absolute", left: 0, top: "0", padding: 0.5 + "rem", overflowY: "auto", transition: "all ease 500ms"}}>
            <Stack direction="column" sx={{paddingX: 64 + "px", maxWidth: 352 + "px", height: 100 + "%"}}>
                <NavLink to={"/"}>
                    <img src={CrimsonAeon} loading="lazy" alt="Crimson Aeon Logo" style={{width: 40 + "px", height: 40 + "px", borderRadius: 50 + "%", marginBlock: 64 + "px"}}/>
                </NavLink>
                <form>
                    <Stack direction="column" useFlexGap gap={2} sx={{marginBottom: 40 + "px"}}>
                        <Typography variant="h6" sx={{color: theme => theme.palette.text.primary}}>Get started absolutely free</Typography>
                        <Stack direction="row" useFlexGap gap={0.5}>
                            <Typography variant="p" sx={{color: theme => theme.palette.text.primary, fontWeight: 300}}>Already have an account?</Typography>
                            <NavLink to="/auth/login" style={{textDecoration: "none"}}>
                                <Typography variant="a" sx={{color: theme => theme.palette.primary.main, fontWeight: 300, cursor: "pointer", ":hover": {textDecoration: "underline"}}}>Login</Typography>
                            </NavLink>
                        </Stack>
                    </Stack>
                    <Stack direction="column" useFlexGap gap={3}>
                        <TextField label="Username" color="secondary" variant="outlined"/>
                        <TextField label="Email address" color="secondary" variant="outlined"/>

                        <FormControl color="secondary" variant="outlined">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput id="password" type={showPassword ? "text" : "password"} endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <FontAwesomeIcon icon={faEye} style={{height: 20 + "px", width: 20 + "px"}}/> : <FontAwesomeIcon icon={faEyeSlash} style={{height: 20 + "px", width: 20 + "px"}}/>}
                                    </IconButton>
                                </InputAdornment>}
                                           label="Password"/>
                        </FormControl>
                        <Button variant="contained" endIcon={<FontAwesomeIcon icon={faChevronRight} style={{marginLeft: "calc(145px - 1rem)"}}/>}>Create account</Button>
                        <Typography variant="p" sx={{color: theme => theme.palette.text.secondary, fontWeight: 200, fontSize: 0.75 + "rem"}}>
                            {"By signing up, I agree to "}
                            <Typography variant="a" sx={{color: theme => theme.palette.text.primary, cursor: "pointer", ":hover": {textDecoration: "underline"}}}>Terms of Service</Typography>
                            {" and "}
                            <Typography variant="a" sx={{color: theme => theme.palette.text.primary, cursor: "pointer", ":hover": {textDecoration: "underline"}}}>Privacy Policy</Typography>
                            .
                        </Typography>
                    </Stack>
                </form>
            </Stack>
            <Box sx={{height: 100 + "%", flexGrow: 1, position: "relative"}}>
                <img src={Landscape} style={{top: 16 + "px", left: 16 + "px", borderRadius: 20 + "px", objectFit: "cover", position: "absolute", width: "calc(100% - 32px)", height: "calc(100% - 32px)"}} alt="auth"/>
            </Box>
        </Stack>
    );
};

export default SignUp;
