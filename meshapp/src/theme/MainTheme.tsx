import { PaletteMode, createTheme, Typography } from "@mui/material";

//gets pallete colors and component colors based on mode
const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...getPalette(mode),
  },

  components: {
    ...getComponents(mode),
  },
  typography: {
    fontFamily: [
      "Cocogoose",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

//returns custom palette colors based on dark or light mode
function getPalette(mode: PaletteMode) {
  //light mode
  return {
    ...(mode === "light"
      ? {
          primary: {
            // dark green (theme color)
            main: "#0B7D66",
            light: "#87bfb4",
            dark: "#096452",
            contrastText: "#fff",
          },
          secondary: {
            // beige
            main: "#F2E8DE",
            light: "#f6efe8",
            dark: "#c2bab2",
            contrastText: "#000000",
          },
          success: {
            // green
            main: "#74D194",
            light: "#74D194",
            dark: "#5da777",
            contrastText: "#fff",
          },
          cardBackground: {
            main: "#fff",
          },
          action: {
            active: "#0000008F",
            selected: "#00000014",
            diasbled: "#00000061",
            disabledBackground: "#0000001F",
          },
          text: {
            primary: "#000000DE",
            secondary: "#00000099",
            disabled: "#00000061",
            main: "#26383A",
          },
          input: {
            outlined: {
              enabledBorder: "#0000003B",
            },
            standard: {
              enabledBorder: "#0000006B",
            },
          },
          messageBackground: {
            main: "#74D194",
          },
          messageText: {
            main: "#000000",
          },
          footerLogoColor: {
            main: "#1DB272",
          },
          mailIconColor: {
            main: "#74D194",
          },
          signUpDivider: {
            main: "#000000",
          },
        }
      : //dark mode
        {
          primary: {
            main: "#27383A",
          },
          secondary: {
            main: "#969696",
          },
          cardBackground: {
            main: "#212121",
          },
          action: {
            active: "#F2E8DE8F",
            selected: "#F2E8DE14",
            disabled: "#F1E8DF61",
            disabledBackground: "#F1E8DF1F",
          },
          text: {
            primary: "#F1E8DFDE",
            secondary: "#F2E8DE99",
            disabled: "#F2E8DE61",
            main: "#F2E8DE",
          },
          input: {
            outlined: {
              enabledBorder: "#F2E8DE3B",
            },
            standard: {
              enabledBorder: "#F2E8DE6B",
            },
          },
          messageBackground: {
            main: "#247C67",
          },
          messageText: {
            main: "#F1E8DF",
          },
          footerLogoColor: {
            main: "#26383A",
          },
          mailIconColor: {
            main: "#247C67",
          },
          signUpDivider: {
            main: "#F1E8DF",
          },
        }),
    //universal
    avatar: {
      fill: "#BDBDBD",
    },
    chip: {
      defaultCloseFill: "#000000",
    },
    error: {
      main: "#D32F2F",
    },
    alert: {
      errorContent: "#5F2120",
      errorFill: "#FDEDED",
    },
    notiColor: {
      main: "#DE8888",
    },
    messageNotiColor: {
      main: "#CE808B",
    },
    sendMessageBackground: {
      main: "#D9D9D966",
    },
    sendMessageBorder: {
      main: "#000000CC",
    },
  };
}

//returns custom component theme based on dark or light mode
function getComponents(mode: PaletteMode) {
  const universalStyles = {
    MuiAlert: {
      styleOverrides: {
        root: {
          "&.MuiAlert-standardError": {
            backgroundColor: "#FDEDED",
            color: "#5F2120",
          },
        },
      },
    },
    MuiStepConnector: {
      styleOverrides: {
        root: {
          ".MuiStepConnector-line": {
            borderColor: "#BDBDBD",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: "500",
          fontSize: "14px",
          padding: "calc(0.5em - 1px) 1em",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
  };

  //light mode
  return {
    ...universalStyles,
    ...(mode === "light"
      ? {
          MuiCheckbox: {
            styleOverrides: {
              root: {
                "&.Mui-checked": {
                  color: "#74D194",
                },
              },
            },
          },
          MuiStepIcon: {
            styleOverrides: {
              root: {
                "&.Mui-completed,&.Mui-active": {
                  color: "#74D194",
                },
              },
            },
          },
        }
      : {
          MuiCheckbox: {
            styleOverrides: {
              root: {
                "&.Mui-checked": {
                  color: "#247C67",
                },
              },
            },
          },
          MuiStepIcon: {
            styleOverrides: {
              root: {
                "&.Mui-completed,&.Mui-active": {
                  color: "#247C67",
                },
              },
            },
          },
        }),
  };
}

/*
This function creates and returns theme based on input mode
*/
export default function getMainTheme(mode: PaletteMode) {
  return createTheme(getDesignTokens(mode));
}
