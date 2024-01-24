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
        fontWeight: "bold",
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
