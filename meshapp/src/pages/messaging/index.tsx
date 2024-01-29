import { useEffect, useState } from "react";
import ChatBox from "../../components/Messages/ChatBox";
import ConversationsList from "../../components/Messages/ConversationsList";
import { Conversation, Message } from "../../utils/types/Conversation";
import { GridContainer } from "../../components/resuables/Grids";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import ConversationSelect from "./components/ConversationSelect";
import useFetchConversations from "../../utils/hooks/useFetchConversations";
import LoadingProgress from "../../components/resuables/LoadingProgress";

/**
 * ### MessagePage Component
 *
 * The `MessagePage` component serves as the primary interface for the messaging feature of the application.
 * It orchestrates the display and interaction of the entire messaging system, including the list of conversations
 * and the chat interface for selected conversations.
 *
 * #### Props:
 * This component does not accept external props but manages its internal state and behavior.
 *
 * #### Functionality:
 * - Displays a list of conversations and a detailed chat interface for the selected conversation.
 * - Dynamically updates in response to screen size changes, adapting the layout for different devices.
 * - Utilizes `useFetchConversations` hook to fetch and display conversation data.
 * - Manages the state of the selected conversation and updates it as users interact with the messaging system.
 * - Handles loading and error states to provide feedback to the user.
 *
 * #### Usage:
 * ```
 * <MessagePage />
 * ```
 * This component should be used as a dedicated page for messaging within the application's routing structure.
 *
 * #### Dependencies:
 * - Material-UI components: Box, Grid, Typography, useMediaQuery.
 * - React hooks: useEffect, useState.
 * - Custom components: ChatBox, ConversationsList, ConversationSelect.
 * - Custom hooks: useFetchConversations.
 * - Utilities: LoadingProgress.
 * - Types: Conversation, Message.
 *
 * #### State Management:
 * - Manages the list of conversations and the currently selected conversation.
 * - Utilizes responsive design features to adapt the layout based on screen size.
 * - Updates the messages in the selected conversation in real-time.
 *
 * The `MessagePage` component integrates various sub-components and hooks to create a cohesive and responsive
 * messaging experience for the user. It ensures that all parts of the messaging feature are coordinated
 * and updated in real-time, providing an intuitive and efficient communication platform within the application.
 */
const MessagePage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  // Fetch conversations from the backend and manage their state.
  const {
    conversations: fetchedConversations,
    isLoading,
    error,
  } = useFetchConversations();
  const [conversations, setConversations] =
    useState<Conversation[]>(fetchedConversations);

  // State to track the selected conversation.
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  // Effect to update the local state when the fetched conversations change.
  useEffect(() => {
    setConversations(fetchedConversations);
  }, [fetchedConversations]);

  // Function to update the messages of the selected conversation.
  const updateConversationMessages = (newMessages: Message[]) => {
    if (selectedConversation) {
      const updatedSelectedConvo = {
        ...selectedConversation,
        messages: newMessages,
      };
      setSelectedConversation(updatedSelectedConvo);

      // Also update the conversation in the overall conversations array.
      const updatedConversations = conversations.map((convo) =>
        convo.conversationID === selectedConversation.conversationID
          ? updatedSelectedConvo
          : convo
      );
      setConversations(updatedConversations);
    }
  };

  // Show loading progress or error messages if necessary.
  if (isLoading) return <LoadingProgress />;
  if (error) return <div>Error: {error}</div>;

  return (
    <GridContainer
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "90vh",
        padding: 0,
        margin: 0,
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          boxShadow: 10,
          margin: "auto",
          width: "90%",
          maxWidth: "1280px",
          height: "90%",
          minHeight: "500px",
          bgcolor: "secondary.main",
          color: "text.primary",
          borderRadius: "12px",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            height: "100%",
          }}
        >
          {/* Mobile-specific UI for conversation selection */}
          <Box
            sx={{
              display: { xs: "block", md: "none" },
              bgcolor: "secondary.dark",
              padding: "10px",
              borderRadius: "12px 12px 0 0",
            }}
          >
            <ConversationSelect
              conversations={conversations}
              conversation={selectedConversation}
              setConvo={setSelectedConversation}
            />
          </Box>

          {/* Display conversations list */}
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              width: "300px",
              bgcolor: "secondary.dark",
              padding: "10px",
              borderRadius: "12px 0 0 12px",
            }}
          >
            <ConversationsList
              conversations={conversations}
              selectedConversation={selectedConversation}
              setSelectedConversation={setSelectedConversation}
            />
          </Box>
          {/* Display selectedConversation chatbox */}
          <Box
            sx={{
              flexGrow: 1,
              height: { xs: "80%", md: "97%" },
              padding: "10px",
            }}
          >
            {selectedConversation ? (
              <ChatBox
                conversation={selectedConversation}
                setConvo={setSelectedConversation}
                showUserHeader={!isSmallScreen}
                updateMessages={updateConversationMessages}
              />
            ) : (
              <Typography>Select a conversation to start messaging</Typography>
            )}
          </Box>
        </Box>
      </Box>
    </GridContainer>
  );
};

export default MessagePage;
