import { PaletteMode } from "@mui/material";
import { useMemo, useState } from "react";
import getMainTheme from "./MainTheme";

//this returns the value to be used with the Theme context
export const useColorTheme = () => {
  //get stored theme mode, if invalid or undefined initalize current mode and stored theme mode as light mode
  let storedMode = localStorage.getItem("themeMode");
  let themeMode: PaletteMode =
    storedMode && (storedMode === "dark" || storedMode === "light")
      ? storedMode
      : "light";
  if (!storedMode) {
    localStorage.setItem("themeMode", "light");
  }

  //stores state of current theme mode
  const [mode, setMode] = useState<PaletteMode>(themeMode);

  //handles toggling theme mode state and updating local storage theme mode
  const toggleThemeMode = () => {
    setMode(mode === "light" ? "dark" : "light");
    localStorage.setItem("themeMode", mode === "light" ? "dark" : "light");
  };

  //creates current theme based on current mode
  const currentTheme = useMemo(() => getMainTheme(mode), [mode]);

  return {
    theme: currentTheme,
    mode,
    toggleThemeMode,
  };
};
