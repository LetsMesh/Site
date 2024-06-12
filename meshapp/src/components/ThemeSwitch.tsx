import { FC, useContext } from "react";

import { IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "@mui/material/styles";
import { useThemeContext } from "../themes/ThemeContextProvider";

export const ThemeSwitch: FC = () => {
  const colorMode = useThemeContext();
  const theme = useTheme();

  return (
    <IconButton onClick={colorMode.toggleThemeMode}>
      {theme.palette.mode === "dark" ? (
        <DarkModeIcon sx={{ color: "text.primary" }} />
      ) : (
        <LightModeIcon sx={{ color: "text.primary" }} />
      )}
    </IconButton>
  );
};
