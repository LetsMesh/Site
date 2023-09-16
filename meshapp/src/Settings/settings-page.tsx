import React, { useState, useEffect } from 'react';
import { Switch, FormControlLabel, Container, Typography, createTheme, ThemeProvider } from '@mui/material';

import { AccountSettings } from "./types/account-settings"
import { axiosInstance } from "../config/axiosConfig";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1cba9a",
    },
  },
  typography: {
    h1: {
      fontFamily: "cocogoose",
      fontWeight: "bold",
      color: "#ffffff",
    },
  },
}); 

interface SettingsProps {
  value: any,
  label: string,
  onChange: (event: any) => void,
}

/**
 * React component that represents a single setting
 * Represented through a React Switch
 * 
 * @param props - properties of the component
 */
const SettingSwitch = (props: SettingsProps) => {
  return (
    <ThemeProvider theme={theme}>
      <FormControlLabel
      control={<Switch checked={props.value} onChange={props.onChange} />}
      label={<span style={{ color: 'white' }}>{props.label}</span>}
      />
    </ThemeProvider>
  );
}

/**
 * React component to render settings page.
 * Displays setting options for the account.
 * 
 * @param props 
 * @param {number} props.accountID - ID for account that settings represent
 * @param {boolean} props.isVerified - flag for is account if verified
 * @param {string} props.verificationToken - Token for verification
 * @param {boolean} props.hasContentFilterEnabled - flag for content filtering
 * @param {char} props.displayTheme - Char for display theme
 * @param {boolean} props.is2FAEnabled - flag for if account has TwoFactorAuthentication is enabled
 * 
 */
const SettingsPage = (props: AccountSettings) => {
  const [settings, setSettings] = useState({
    accountID: props.accountID,
    isVerified: props.isVerified,
    verificationToken: props.verificationToken,
    hasContentFilterEnabled: props.hasContentFilterEnabled,
    displayTheme: props.displayTheme,
    is2FAEnabled: false
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Make a GET request to update the settings page with user settings
    axiosInstance.get("settings/settings/" + props.accountID + "/")   // NOTE: settings/settings is old api, use accountSettings when merging
      .then((response) => {
        setLoading(false);
        let settingsData = JSON.parse(response.data)[0]["fields"]
        setSettings({...settings, 
          isVerified: settingsData.isVerified,
          verificationToken: settingsData.verificationToken,
          hasContentFilterEnabled: settingsData.hasContentFilterEnabled,
          displayTheme: settingsData.displayTheme,
          is2FAEnabled: settingsData.is2FAEnabled});
      })
      .catch((error) => {
        console.error('Error patching account settings:', error);
        setLoading(true);
      });
  }, []); 

  /** 
   *  NOTE: Second useEffect for sending patch request to update account settings each time settings is modified.
   *        The patch request is made every time the setting switch is changed.
   *        This may want to be changed in the future to ensure that only one 
   *        patch request is made for multiple settings.
   */
  useEffect(() => {
    // Make a PATCH request to the backend API to update account settings 
    axiosInstance.patch("settings/settings/" + props.accountID + "/", {...settings}) // NOTE: Use accountSettings api name when merging
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error patching account settings:', error);
        setLoading(true);
      });
  }, [settings])

  const handleToggleChange = (settingName: any) => (event: any) => {
    setSettings({ ...settings, [settingName]: event.target.checked }); // TODO: Implement Confirm Authentication for 2FactAuth
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Typography variant="h4" color="white" gutterBottom>
        Account Settings
      </Typography>
      <SettingSwitch
        label="Enable Two Factor Authentication"
        value={settings.is2FAEnabled}
        onChange={handleToggleChange('is2FAEnabled')}
      /> 
    </Container>
  );
}

export default SettingsPage;