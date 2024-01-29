// src/components/MessageBar/components/ConversationComponent.tsx

import React from "react";
import {
  Conversation,
  ConversationType,
  Message,
} from "../../utils/types/Conversation";
import {
  Avatar,
  ListItemAvatar,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import { relativeTimeFromDates } from "../../utils/utils/relativeTimestamp";

interface ConversationComponentProps {
  conversation: Conversation;
}

/**
 * ### ConversationCard Component
 *
 * #### Overview:
 * This component renders a single conversation item for display in a list of conversations.
 * It shows the latest message, participants, and the time since the last message was sent.
 *
 * #### Props:
 * - `conversation`: An object representing the conversation. It includes details such as the participants,
 *   conversation type, and messages.
 *
 * #### Functionality:
 * - Displays the latest message in the conversation and the relative time since it was sent.
 * - Shows the names of the participants involved in the conversation.
 * - Utilizes an Avatar icon for visual representation.
 * - Handles long text gracefully with ellipsis for overflow.
 *
 * #### Styling:
 * - Uses Material-UI's Avatar, ListItemAvatar, ListItemText, and Typography components for layout and styling.
 * - Dynamically adjusts styles based on theme context.
 *
 * #### Dependencies:
 * - Material-UI components: Avatar, ListItemAvatar, ListItemText, Typography, useTheme.
 * - Icon component: FolderIcon from Material-UI for the Avatar.
 * - Utility function: relativeTimeFromDates to display relative time.
 * - Types: Conversation, ConversationType, Message from "../../utils/types/Conversation".
 *
 * #### Usage:
 * This component is intended for use in a list of conversations, such as in a messaging sidebar or chat application.
 *
 * #### Example:
 * ```
 * <ConversationCard conversation={aConversation} />
 * ```
 */
const ConversationCard: React.FC<ConversationComponentProps> = ({
  conversation,
}) => {
  const theme = useTheme();

  const msg: Message = conversation.messages[conversation.messages.length - 1];
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
            <div style={{ maxWidth: "100%", marginRight: "8px" }}>
              <Typography
                sx={{
                  fontFamily: "sans-serif",
                  color: "text.primary",
                  fontSize: "14px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {conversation.conversation_type === ConversationType.DM
                  ? conversation.participants[0].name
                  : conversation.participants
                      .map((user) => user.name)
                      .join(", ")}
              </Typography>
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
                  {relativeTimeFromDates(new Date(msg.timestamp))}
                </div>
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
