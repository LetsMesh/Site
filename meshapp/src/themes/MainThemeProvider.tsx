import { FC, PropsWithChildren } from "react";
import { useThemeContext } from "./ThemeContextProvider";
import { ThemeProvider } from "@mui/material";

//This returns a ThemeProvider for the main theme that uses the current theme from the provided context
export const MainThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useThemeContext();
  return <ThemeProvider children={children} theme={theme} />;
};
