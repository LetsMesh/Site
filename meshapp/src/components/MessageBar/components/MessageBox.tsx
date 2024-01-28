// src/components/MessageBar/components/MessageBox.tsx

import { Box, useTheme } from "@mui/material";

import Conversations from "./Conversations";
import { useState } from "react";
import ChatBox from "./ChatBox";
import { Conversation } from "../types/Conversation";

export const messageBoxWidth = 400;

interface MessageBoxProps {
  showSearch: boolean;
  setShowSearch: (value: boolean) => void;
}

const MessageBox: React.FC<MessageBoxProps> = ({
  showSearch,
  setShowSearch,
}) => {
  const theme = useTheme();
  const [convo, setConvo] = useState<Conversation | null>(null);

  if (!showSearch) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        right: 0,
        width: messageBoxWidth,
        backgroundColor: theme.palette.secondary.light,
        boxShadow: "0px -2px 4px rgba(0,0,0,0.2)",
        zIndex: 101,
        borderTopLeftRadius: "6px",
        padding: "10px 10px 0 10px",
        minHeight: "200px",
        height: "50vh",
      }}
    >
      {convo === null ? (
        <Conversations
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          setConvo={setConvo}
        />
      ) : (
        <ChatBox conversation={convo} setConvo={setConvo} />
      )}
    </Box>
  );
};

export default MessageBox;
