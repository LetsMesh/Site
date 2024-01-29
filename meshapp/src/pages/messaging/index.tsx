import { useEffect, useState } from "react";
import ChatBox from "../../components/Messages/ChatBox";
import ConversationsList from "../../components/Messages/ConversationsList";
import { Conversation, Message } from "../../utils/types/Conversation";
import { GridContainer } from "../../components/resuables/Grids";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import ConversationSelect from "./components/ConversationSelect";
import useFetchConversations from "../../utils/hooks/useFetchConversations";
import LoadingProgress from "../../components/resuables/LoadingProgress";

const MessagePage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const {
    conversations: fetchedConversations,
    isLoading,
    error,
  } = useFetchConversations();
  const [conversations, setConversations] =
    useState<Conversation[]>(fetchedConversations);

  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  useEffect(() => {
    setConversations(fetchedConversations);
  }, [fetchedConversations]);

  const updateConversationMessages = (newMessages: Message[]) => {
    if (selectedConversation) {
      // Update the selected conversation's messages
      const updatedSelectedConvo = {
        ...selectedConversation,
        messages: newMessages,
      };
      setSelectedConversation(updatedSelectedConvo);

      // Find and update the conversation in the conversations array
      const updatedConversations = conversations.map((convo) =>
        convo.conversationID === selectedConversation.conversationID
          ? updatedSelectedConvo
          : convo
      );
      setConversations(updatedConversations);
    }
  };

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
