import { PaletteColor, PaletteColorOptions } from "@mui/material";
declare module "@mui/material/styles" {
  interface Theme {}
  interface ThemeOptions {}
  interface Palette {
    cardBackground?: PaletteColor;
    avatarBackground?: PaletteColor;
    chipBackground?: PaletteColor;
  }

  interface PaletteOptions {
    cardBackground?: PaletteColorOptions;
    avatarBackground?: PaletteColorOptions;
    chipBackground?: PaletteColorOptions;
  }
}
