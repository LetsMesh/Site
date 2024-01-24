import { Theme } from "@emotion/react";
import { PaletteMode, createTheme } from "@mui/material";
import { FC, PropsWithChildren, createContext, useContext } from "react";
import { useColorTheme } from "./useColorTheme";

//type of the theme context
type ThemeContextType = {
  mode: PaletteMode;
  toggleThemeMode: () => void;
  theme: Theme;
};

//initialization of the context with provided default value
//the default value provided here doesn't matter as we are passing in the real used value in ThemeContextProvider
export const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
  toggleThemeMode: () => {},
  theme: createTheme(),
});

//hook to be used in other components to access theme context
export const useThemeContext = () => {
  return useContext(ThemeContext);
};

//provides context with the actual value from the top level
export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const value = useColorTheme();
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
