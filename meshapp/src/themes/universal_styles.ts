export const componentsUniversalStyles = {
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
        padding: "calc(0.5em - 1px) 1em",
        borderRadius: "8px",
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
  MuiLink: {
    styleOverrides: {
      root: {
        textDecoration: "underline",
        fontWeight: "500",
        color: "inherit",
        "&:hover": {
          filter: "brightness(2)",
          transition: "200ms ease-in",
        },
      },
    },
  },
};
