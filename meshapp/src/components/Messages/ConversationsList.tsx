import { List, ListItem, useTheme } from "@mui/material";
import { FC } from "react";
import ConversationCard from "./ConversationCard";
import { Conversation } from "../../utils/types/Conversation";

interface ConversationsListProps {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  setSelectedConversation: (value: Conversation | null) => void;
}

/**
 * ### ConversationsList Component
 *
 * #### Overview:
 * This component renders a list of available conversations, allowing the user to view and select
 * from their ongoing conversations. Each conversation is represented by a ConversationCard component.
 *
 * #### Props:
 * - `conversations`: Array of Conversation objects. Each object represents a conversation.
 * - `selectedConversation`: The currently selected conversation object, if any.
 * - `setSelectedConversation`: Function to update the currently selected conversation.
 *
 * #### Functionality:
 * - Displays a list of conversations.
 * - Allows the user to select a conversation, updating the selectedConversation state.
 * - Highlights the currently selected conversation for better user experience.
 *
 * #### Styling:
 * - Utilizes Material-UI's List and ListItem components for structuring the list.
 * - Each conversation is displayed as a ListItem, which is clickable.
 * - The background color of the selected conversation changes to indicate the current selection.
 *
 * #### Dependencies:
 * - Material-UI components: List, ListItem, useTheme.
 * - ConversationCard component to represent each conversation in the list.
 * - Types: Conversation from "../../utils/types/Conversation".
 *
 * #### Usage:
 * This component is intended to be used in messaging-related features where the user needs to view
 * and select from a list of their ongoing conversations.
 *
 * #### Example:
 * ```
 * <ConversationsList
 *   conversations={userConversations}
 *   selectedConversation={currentConversation}
 *   setSelectedConversation={setCurrentConversation}
 * />
 * ```
 */
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
