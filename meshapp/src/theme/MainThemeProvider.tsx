import { ThemeProvider } from "@emotion/react";
import getMainTheme from "./MainTheme";
import { PaletteMode } from "@mui/material";

/*
This component returns a theme provider for light/dark mode
*/
export default function MainThemeProvider(props: {
  children: React.ReactNode;
}) {
  //get mode from local storage
  let storedMode = localStorage.getItem("themeMode");

  //validate stored mode, if it exists and is a valid mode use it, otherwise use light mode
  let mode: PaletteMode =
    storedMode && (storedMode === "light" || storedMode === "dark")
      ? storedMode
      : "light";
  let theme = getMainTheme(mode);

  return <ThemeProvider children={props.children} theme={theme} />;
}
