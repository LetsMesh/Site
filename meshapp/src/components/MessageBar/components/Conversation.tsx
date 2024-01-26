// src/components/MessageBar/components/ConversationComponent.tsx
import React from "react";
import { Conversation, Message } from "../types/Conversation";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";

interface ConversationComponentProps {
  conversation: Conversation;
}

const ConversationComponent: React.FC<ConversationComponentProps> = ({
  conversation,
}) => {
  const theme = useTheme();

  const msg: Message = conversation.messages[0];
  return (
    <ListItem
      key={conversation.with.accountID}
      sx={{
        padding: "0 8px",
        marginBottom: "8px",
        gap: "0px",
        width: "100%",
        borderBottom: "solid 1px",
        borderColor: "text.secondary",
        cursor: "pointer",
        ":hover": {
          backgroundColor: theme.palette.secondary.dark,
        },
        borderRadius: "4px 4px 0 0 ",
      }}
    >
      <ListItemAvatar>
        <Avatar
          sx={{
            width: 36,
            height: 36,
          }}
        >
          <FolderIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        sx={{ marginLeft: "-10px" }}
        primary={
          <Typography
            sx={{
              color: "text.primary",
              fontSize: "14px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {conversation.with.name}
          </Typography>
        }
        secondary={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ maxWidth: "calc(100% - 130px)", marginRight: "8px" }}>
              <Typography
                sx={{
                  fontFamily: "sans-serif",
                  fontSize: "11px",
                  color: "text.secondary",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {msg.message}
              </Typography>
            </div>
            <div
              style={{
                fontFamily: "sans-serif",
                fontSize: "11px",
                color: theme.palette.text.secondary,
                flexShrink: 0,
              }}
            >
              {new Date(msg.timestamp).toLocaleString()}
            </div>
          </div>
        }
      />
    </ListItem>
  );
};

export default ConversationComponent;
