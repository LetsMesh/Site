import { PaletteMode } from "@mui/material";
import { useMemo, useState } from "react";
import getMainTheme from "./MainTheme";
import { useAccountContext } from "../contexts/UserContext";

export const useColorTheme = () => {
  const { account } = useAccountContext();

  // Get stored theme mode from local storage
  const storedMode = localStorage.getItem("themeMode");

  // Determine the initial theme mode
  const determineInitialMode = (): PaletteMode => {
    if (account && account.settings && account.settings.displayTheme) {
      // If user is logged in and has a display theme setting
      return account.settings.displayTheme.toLowerCase() == "light"
        ? "light"
        : "dark";
    } else if (storedMode === "dark" || storedMode === "light") {
      // Use stored mode if it's valid
      return storedMode;
    }
    // Default to light mode
    return "light";
  };

  const initialMode: PaletteMode = determineInitialMode();

  // Store state of current theme mode
  const [mode, setMode] = useState<PaletteMode>(initialMode);

  // Handles toggling theme mode state and updating local storage
  const toggleThemeMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  // Create current theme based on current mode
  const currentTheme = useMemo(() => getMainTheme(mode), [mode]);

  return {
    theme: currentTheme,
    mode,
    toggleThemeMode,
  };
};
