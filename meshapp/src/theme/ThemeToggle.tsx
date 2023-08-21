import { FormControlLabel, Typography } from "@mui/material";
import Switch from "@mui/material/Switch";
import { useEffect, useState } from "react";
import { text } from "stream/consumers";

/*
This component returns switch button for enabling/disabling dark mode
*/
export default function ThemeToggleSwitch() {
  //store mode in local storage
  //if it doesn't exist or is not a valid mode, initalize as light mode
  let mode = localStorage.getItem("themeMode");
  if (!mode || (mode !== "light" && mode !== "dark")) {
    localStorage.setItem("themeMode", "light");
    mode = "light";
  }

  //tracks if theme toggle switch is checked or not
  //checked == dark, not checked == light
  const [isChecked, setChecked] = useState(mode === "light" ? false : true);

  //handles checking switch, reloads window to apply theme changes
  const handleChange = () => {
    setChecked(!isChecked);
    window.location.reload();
  };

  //update theme in local storage depending on whether switch is checked
  useEffect(
    () => localStorage.setItem("themeMode", isChecked ? "dark" : "light"),
    [isChecked]
  );

  return (
    <FormControlLabel
      label={<Typography color={"text.primary"}>Enable Dark Mode</Typography>}
      control={<Switch checked={isChecked} onChange={handleChange} />}
    />
  );
}
