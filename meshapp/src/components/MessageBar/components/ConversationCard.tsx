// src/components/MessageBar/components/ConversationComponent.tsx
import React from "react";
import { Conversation, ConversationType, Message } from "../types/Conversation";
import {
  Avatar,
  Chip,
  ListItemAvatar,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";

interface ConversationComponentProps {
  conversation: Conversation;
}

const ConversationCard: React.FC<ConversationComponentProps> = ({
  conversation,
}) => {
  const theme = useTheme();

  const msg: Message = conversation.messages[0];
  return (
    <>
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
                  color: "text.primary",
                  fontSize: "14px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {conversation.conversation_type == ConversationType.DM
                  ? conversation.participants[0].name
                  : conversation.participants
                      .map((user) => user.name)
                      .join(", ")}
              </Typography>
            </div>
            <div>
              <Chip
                label={conversation.conversation_type}
                size="small"
                sx={{ fontSize: "11px" }}
                color={
                  conversation.conversation_type == ConversationType.DM
                    ? "primary"
                    : "info"
                }
              />
            </div>
          </div>
        }
        secondary={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {msg ? (
              <>
                <div
                  style={{ maxWidth: "calc(100% - 130px)", marginRight: "8px" }}
                >
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
                </div>{" "}
              </>
            ) : (
              <Typography
                sx={{
                  fontFamily: "sans-serif",
                  fontSize: "11px",
                  color: "text.secondary",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  fontStyle: "italic",
                }}
              >
                {"Send a direct message"}
              </Typography>
            )}
          </div>
        }
      />
    </>
  );
};

export default ConversationCard;