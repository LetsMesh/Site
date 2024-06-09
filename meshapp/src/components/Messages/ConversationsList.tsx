import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { FC } from "react";
import {
  Conversation,
  ConversationType,
  Message,
} from "src/models/conversation";
import MeshPfp from "../svgs/mesh-pfp";
import { formatDistanceToNowStrict } from "date-fns";

interface ConversationsListProps {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  setSelectedConversation: (value: Conversation | null) => void;
}

const ConversationsList: FC<ConversationsListProps> = ({
  conversations,
  selectedConversation,
  setSelectedConversation,
}) => {
  const theme = useTheme();

  return (
    <List dense={false} sx={{ padding: 0 }}>
      {conversations.map((convo) => (
        <ListItem
          onClick={() => setSelectedConversation(convo)}
          key={convo.conversationID}
          sx={{
            padding: "0 8px",
            marginBottom: "4px",
            gap: "0px",
            width: "100%",
            borderColor: "text.secondary",
            cursor: "pointer",
            ":hover": {
              backgroundColor: theme.palette.primary.main,
            },
            borderRadius: "4px",
            backgroundColor:
              selectedConversation &&
              convo.conversationID === selectedConversation.conversationID
                ? theme.palette.action.selected
                : "transparent",
          }}
        >
          <ConversationCard conversation={convo} key={convo.conversationID} />
        </ListItem>
      ))}
    </List>
  );
};

export default ConversationsList;

interface ConversationComponentProps {
  conversation: Conversation;
}
const ConversationCard: React.FC<ConversationComponentProps> = ({
  conversation,
}) => {
  const theme = useTheme();

  const msg: Message = conversation.messages[conversation.messages.length - 1];
  return (
    <>
      <ListItemAvatar sx={{ alignItems: "center" }}>
        <Avatar>
          <MeshPfp fontSize="large" />
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
                  {formatDistanceToNowStrict(new Date(msg.timestamp), {
                    addSuffix: true,
                  })}
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
