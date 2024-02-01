import { PaletteMode } from "@mui/material";
import { useMemo, useState, useEffect } from "react";
import getMainTheme from "./MainTheme";
import { useAccountContext } from "../contexts/UserContext";
import { useUpdateAccountSetting } from "../utils/hooks/useUpdateAccount";

export const useColorTheme = () => {
  const { account } = useAccountContext();
  const { updateAccount } = useUpdateAccountSetting();

  // Get stored theme mode from local storage
  const storedMode = localStorage.getItem("themeMode");

  // Determine the initial theme mode
  const determineInitialMode = (): PaletteMode => {
    if (account && account.settings && account.settings.displayTheme) {
      return account.settings.displayTheme.toLowerCase() === "0"
        ? "light"
        : "dark";
    } else if (storedMode === "dark" || storedMode === "light") {
      return storedMode;
    }
    return "light";
  };

  const [mode, setMode] = useState<PaletteMode>(determineInitialMode());

  // Update mode when account changes
  useEffect(() => {
    const newMode = determineInitialMode();
    if (newMode !== mode) {
      setMode(newMode);
      localStorage.setItem("themeMode", newMode);
    }
  }, [account]);

  // Toggle theme mode and update account settings
  const toggleThemeMode = async () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);

    if (account) {
      await updateAccount(account.accountID, {
        displayTheme: newMode === "light" ? "0" : "1",
      });
    }
  };

  // Create current theme based on current mode
  const currentTheme = useMemo(() => getMainTheme(mode), [mode]);

  return {
    theme: currentTheme,
    mode,
    toggleThemeMode,
  };
};
