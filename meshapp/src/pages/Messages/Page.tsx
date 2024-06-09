import { useEffect, useState } from "react";
import ChatBox from "../../components/Messages/ChatBox";
import ConversationsList from "../../components/Messages/ConversationsList";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import useFetchConversations from "src/hooks/useFetchConversations";
import { Conversation, Message } from "src/models/conversation";
import LoadingProgress from "src/components/ui/LoadingSpinner";
import { GridContainer } from "src/components/ui/Grid";
import ConversationSelect from "./components/ConversationsSelect";

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
            <Typography sx={{ fontWeight: "600" }}>
              Your conversations
            </Typography>
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
