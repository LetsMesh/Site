import { IconButton, useTheme } from "@mui/material";
import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import { useAccountContext } from "../../contexts/UserContext";
const MessageBar = () => {
  const theme = useTheme();

  const { account } = useAccountContext();

  if (!account) return null;
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        backgroundColor: theme.palette.secondary.main,
        width: "100%",
        height: "40px",

        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",

        borderTop: "sold black 1px",
      }}
    >
      <div style={{ display: "flex", padding: "0 10px" }}>
        <IconButton>
          <EmailIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default MessageBar;
