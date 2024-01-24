import { Theme } from "@mui/material/styles";

import { lightTheme } from "./light";
import { darkTheme } from "./dark";

export const themes: Record<string, Theme> = {
  light: lightTheme,
  dark: darkTheme,
};
