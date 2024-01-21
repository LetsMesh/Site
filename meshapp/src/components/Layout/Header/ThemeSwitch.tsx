import { FC, useContext } from "react";

import { IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "@mui/material/styles";
import { useThemeContext } from "../../../theme/ThemeContextProvider";

export const ThemeSwitch: FC = () => {
  const colorMode = useThemeContext();
  const theme = useTheme();

  return (
    <IconButton
      sx={{ ml: 1, mr: 1, borderRadius: "8px" }}
      onClick={colorMode.toggleThemeMode}
    >
      {theme.palette.mode === "dark" ? (
        <DarkModeIcon sx={{ color: "white" }} />
      ) : (
        <LightModeIcon sx={{ color: "black" }} />
      )}
    </IconButton>
  );
};
