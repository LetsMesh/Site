import React, { useState, useEffect } from 'react';
import { Switch, FormControlLabel, Container, Typography } from '@mui/material';

import { AccountSettings } from "./types/account-settings"
import { axiosInstance } from "../config/axiosConfig";

interface SettingsProps {
  value: any,
  label: string,
  onChange: (event: any) => void,
}

const SettingSwitch = (props: SettingsProps) => {
  return (
    <FormControlLabel
      control={<Switch checked={props.value} onChange={props.onChange} />}
      label={props.label}
    />
  );
}

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
  }, []); // Empty dependency array to run the effect once when the component mounts 

  useEffect(() => {
    // Make a PATCH request to the backend API to update account settings
    axiosInstance.patch("settings/settings/" + props.accountID + "/", {...settings}) // NOTE: Use accountSettings api name when merging
      .then((response) => {
        console.log("Patch Response: " + response)
        setLoading(false);
        console.log("After Set: " + settings.is2FAEnabled)
      })
      .catch((error) => {
        console.error('Error patching account settings:', error);
        setLoading(true);
      });
  }, [settings])

  const handleToggleChange = (settingName: any) => (event: any) => {
    console.log("Before Set: " + settings.is2FAEnabled)
    setSettings({ ...settings, [settingName]: event.target.checked });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
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