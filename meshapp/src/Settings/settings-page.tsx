import React, { useState, useEffect } from "react";
import { 
    Divider, 
    FormGroup, 
    FormControlLabel, 
    Switch, 
    Typography } 
    from "@mui/material";

import { AccountSettings } from "./types/account-settings";

/** 
 * React component that renders the settings page
 * Displays settings that are set by the user for their account
 * 
 * @param props - Properties of component
 * @param {number} props.accountID - user accoutn ID
 * @param {boolean} props.isVerified - flag to check if user is verified
 * @param {string} props.verificationToken - token for verification
 * @param {boolean} props.hasContentFilterEnabled - flag to check if content is filtered
 * @param {number} props.displayTheme - display theme
 * @param {boolean} props.is2FAEnabled - flag to check if user is registered for 2FactAuth
 */ 
export default function Settings(props: AccountSettings) {
    return (
        <Divider>
            <Typography variant="h2" textAlign={"left"}>
                Settings
            </Typography>
            <Divider>
                <TwoFactorAuth is2FAEnabled={props.is2FAEnabled}/>
            </Divider>
        </Divider>
    )
};

/**
 * Display user's 2FactAuth setting 
 * 
 * @param props - Properties of component
 * @param {boolean} props.is2FAEnabled - flag to check if user is registered for 2FactAuth
 */
const TwoFactorAuth = (props: { is2FAEnabled: boolean }) => { 
    const {is2FAEnabled} = props
    return (
        <Divider>
            <FormGroup>
                    <FormControlLabel control={is2FAEnabled ? <Switch defaultChecked/> : <Switch />} label="2 Factor Authentication: " /> 
            </FormGroup>
        </Divider>
    )
}