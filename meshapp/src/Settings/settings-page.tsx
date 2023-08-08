import React, { useState, useEffect } from "react";
import { 
    Divider, 
    FormGroup, 
    FormControlLabel, 
    Switch, 
    Typography } 
    from "@mui/material";

export default function Settings() {
    return (
        <Divider>
            <Typography variant="h2" textAlign={"left"}>
                Settings
            </Typography>
            <Divider>
                <TwoFactorAuth />
            </Divider>
        </Divider>
    )
};

const TwoFactorAuth = () => {
    return (
        <Divider>
            <FormGroup>
                <FormControlLabel control={<Switch />} label="2 Factor Authentication" />
            </FormGroup>
        </Divider>
    )
}
