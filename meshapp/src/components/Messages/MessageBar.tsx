// src/components/MessageBar/index.tsx

import { IconButton, useTheme } from "@mui/material";
import { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import { useAccountContext } from "../../contexts/UserContext";
import MessageBox, { messageBoxWidth } from "./MessageBox";
import { useLocation } from "react-router-dom";
import { paths } from "../../routing/RoutePaths";

const MessageBar = () => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const { account } = useAccountContext();

  const [showSearch, setShowSearch] = useState(false);

  if (!account) return null;

  return (
    <>
      <MessageBox showSearch={showSearch} setShowSearch={setShowSearch} />
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
          zIndex: 100,
          borderTop: "sold black 1px",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "0 10px",
            width: messageBoxWidth,
            height: "100%",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {pathname !== paths.messages && (
            <IconButton
              sx={{ color: "primary.contrastText", borderRadius: 0 }}
              onClick={() => setShowSearch(!showSearch)}
            >
              <EmailIcon />
            </IconButton>
          )}
        </div>
      </div>
    </>
  );
};

export default MessageBar;
