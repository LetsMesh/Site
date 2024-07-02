import { PaletteColor, PaletteColorOptions } from "@mui/material";
import { TypeText } from '@mui/material/styles';
declare module "@mui/material/styles" {
  interface Theme {}
  interface ThemeOptions {}
  interface Palette {
    cardBackground?: PaletteColor;
    notificationColor?: PaletteColor;
    messageNotiColor?: PaletteColor;
    messageBackground?: PalleteColor;
    messageText?: PalleteColor;
    sendMessageBackground?: PalleteColor;
    sendMessageBorder?: PalleteColor;
    footerLogoColor?: PalleteColor;
    mailIconColor?: PaletteColor;
    signUpDivider?: PaletteColor;
    buttonBackground?: PaletteColor;
  }

  interface PaletteOptions {
    cardBackground?: PaletteColorOptions;
    notificationColor?: PaletteColorOptions;
    messageNotiColor?: PaletteColorOptions;
    messageBackground?: PalleteColorOptions;
    messageText?: PalleteColorOptions;
    sendMessageBackground?: PalleteColorOptions;
    sendMessageBorder?: PalleteColorOptions;
    footerLogoColor?: PalleteColorOptions;
    mailIconColor?: PaletteColorOptions;
    signUpDivider?: PaletteColorOptions;
    buttonBackground?: PaletteColorOptions;
  }

  interface TypeText {
    main?: string;
  }
}
