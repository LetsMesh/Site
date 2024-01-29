import { List, ListItem, useTheme } from "@mui/material";
import { FC } from "react";
import ConversationCard from "./ConversationCard";
import { Conversation } from "../../utils/types/Conversation";

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
