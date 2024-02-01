import { FormControlLabel, Typography } from "@mui/material";
import Switch from "@mui/material/Switch";
import { useThemeContext } from "./ThemeContextProvider";

//This component returns switch button for enabling/disabling dark mode
export default function ThemeToggleSwitch() {
  const { mode, toggleThemeMode } = useThemeContext();

  return (
    <FormControlLabel
      label={<Typography color={"text.primary"}>Enable Dark Mode</Typography>}
      control={
        <Switch
          checked={mode === "dark" ? true : false}
          onChange={toggleThemeMode}
        />
      }
    />
  );
}
