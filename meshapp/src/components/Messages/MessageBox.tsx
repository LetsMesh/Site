import { Box, useTheme } from "@mui/material";

import ConversationsBox from "./ConversationsBox";
import { useEffect, useState } from "react";
import ChatBox from "./ChatBox";
import { Conversation, Message } from "src/models/conversation";
import useFetchConversations from "src/hooks/useFetchConversations";
import LoadingProgress from "../ui/LoadingSpinner";

/**
 * A constant defines the width of the MessageBox, ensuring consistent
 * styling across the application.
 * */
export const messageBoxWidth = 400;

interface MessageBoxProps {
  showSearch: boolean;
  setShowSearch: (value: boolean) => void;
}

const MessageBox: React.FC<MessageBoxProps> = ({
  showSearch,
  setShowSearch,
}) => {
  const theme = useTheme();

  // Fetch conversations using a hook
  const {
    conversations: fetchedConversations,
    isLoading,
    error,
  } = useFetchConversations();

  // State to manage the list of conversations
  const [conversations, setConversations] =
    useState<Conversation[]>(fetchedConversations);

  // Update the state when new conversations are fetched
  useEffect(() => {
    setConversations(fetchedConversations);
  }, [fetchedConversations]);

  // State to manage the currently selected conversation
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  // Function to update messages in the currently selected conversation
  const updateConversationMessages = (newMessages: Message[]) => {
    if (selectedConversation) {
      const updatedSelectedConvo = {
        ...selectedConversation,
        messages: newMessages,
      };
      setSelectedConversation(updatedSelectedConvo);

      // Also update the conversation in the overall list
      const updatedConversations = conversations.map((convo) =>
        convo.conversationID === selectedConversation.conversationID
          ? updatedSelectedConvo
          : convo
      );
      setConversations(updatedConversations);
    }
  };

  // Conditional rendering based on whether the search is active
  if (!showSearch) return null;

  // Display loading progress or error messages if applicable
  if (isLoading) return <LoadingProgress />;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        right: 0,
        width: messageBoxWidth,
        backgroundColor: theme.palette.secondary.light,
        boxShadow: "0px -2px 4px rgba(0,0,0,0.2)",
        zIndex: 101,
        borderTopLeftRadius: "6px",
        padding: "10px 10px 0 10px",
        minHeight: "200px",
        height: "50vh",
      }}
    >
      {/* Display the conversation list or the chat box based on the state selectedConversation */}
      {selectedConversation === null ? (
        <ConversationsBox
          conversations={conversations}
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          setSelectedConversation={setSelectedConversation}
          selectedConversation={selectedConversation}
        />
      ) : (
        <ChatBox
          updateMessages={updateConversationMessages}
          conversation={selectedConversation}
          setConvo={setSelectedConversation}
        />
      )}
    </Box>
  );
};

export default MessageBox;
