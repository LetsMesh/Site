// src/components/MessageBar/components/Conversations.tsx

import { Box, IconButton, Stack, TextField, useTheme } from "@mui/material";
import { Close as CloseIcon, Search as SearchIcon } from "@mui/icons-material";
import { Conversation } from "../../utils/types/Conversation";
import { messageBoxWidth } from "./MessageBox";
import ConversationsList from "./ConversationsList";

interface ConversationsProps {
  conversations: Conversation[];
  showSearch: boolean;
  setShowSearch: (value: boolean) => void;
  selectedConversation: Conversation | null;
  setSelectedConversation: (value: Conversation | null) => void;
}

/**
 * ### ConversationsBox Component
 *
 * This component is responsible for rendering the user interface for viewing a list of conversations.
 * It allows users to view their existing conversations and select one to view or continue messaging.
 *
 * #### Functionality:
 * - Displays a search field to filter through conversations.
 * - Renders a list of conversations using the ConversationsList component.
 * - Allows users to select a conversation to view.
 * - Contains a close button to hide the ConversationsBox.
 *
 * #### Props:
 * - `conversations`: Array of Conversation objects to be displayed.
 * - `showSearch`: Boolean to determine if the ConversationsBox should be displayed.
 * - `setShowSearch`: Function to toggle the visibility of the ConversationsBox.
 * - `selectedConversation`: The currently selected conversation.
 * - `setSelectedConversation`: Function to update the currently selected conversation.
 *
 * #### Styling:
 * - Uses Material-UI's Box, IconButton, Stack, and TextField components for layout and UI elements.
 * - Adheres to the theme palette for consistency in styling.
 *
 * #### Dependencies:
 * - Material-UI components: Box, IconButton, Stack, TextField, useTheme.
 * - Material-UI icons: CloseIcon, SearchIcon.
 * - Custom components: ConversationsList.
 * - Types: Conversation from "../../utils/types/Conversation".
 *
 * #### Usage:
 * This component is used in the messaging system to display the list of conversations to the user.
 * It should be rendered where access to view and select conversations is needed.
 *
 * #### Example:
 * ```
 * <ConversationsBox
 *   conversations={userConversations}
 *   showSearch={showConversations}
 *   setShowSearch={setShowConversations}
 *   selectedConversation={currentConversation}
 *   setSelectedConversation={setCurrentConversation}
 * />
 * ```
 */
const ConversationsBox: React.FC<ConversationsProps> = ({
  conversations,
  showSearch,
  setShowSearch,
  selectedConversation,
  setSelectedConversation,
}) => {
  const theme = useTheme();

  if (!showSearch) return null;

  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      spacing={1}
      style={{ height: "100%" }}
    >
      {/* --------- conversation search bar ---------  */}
      <TextField
        fullWidth
        variant="standard"
        placeholder="Search conversations"
        InputProps={{
          startAdornment: <SearchIcon />,
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
      {/* --------- lists of active conversations --------- */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          maxHeight: "50vh",
        }}
      >
        <ConversationsList
          conversations={conversations}
          selectedConversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
        />
      </Box>
      {/* --------- close button --------- */}
      <div
        style={{
          backgroundColor: theme.palette.secondary.main,
          width: "100%",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          zIndex: 100,
          borderTop: `solid ${theme.palette.secondary.contrastText} 1px`,
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "0",
            width: messageBoxWidth,
            backgroundColor: showSearch
              ? theme.palette.secondary.light
              : theme.palette.secondary.main,
            height: "100%",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <IconButton
            sx={{
              color: theme.palette.secondary.contrastText,
              borderRadius: 0,
            }}
            onClick={() => setShowSearch(!showSearch)}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </div>
    </Stack>
  );
};

export default ConversationsBox;
