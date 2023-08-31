import React, { useState, useEffect } from 'react';
import { Switch, FormControlLabel, Container, Typography } from '@mui/material';

//import { AccountSettings } from "./types/account-settings";
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

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    //isVerified: false,
    is2FAEnabled: false
  });
  const [loading, setLoading] = useState(false);

  const handleToggleChange = (settingName: any) => (event: any) => {
    setSettings({ ...settings, [settingName]: event.target.checked });
  };

  /* useEffect(() => {
    // Make a GET request to the backend API to retrieve account settings
    axiosInstance.get('/accountSettings/settings')
      .then((response) => {
        setSettings(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching account settings:', error);
        setLoading(true);
      });
  }, []); // Empty dependency array to run the effect once when the component mounts */

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