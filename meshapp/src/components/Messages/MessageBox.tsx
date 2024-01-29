// src/components/MessageBar/components/MessageBox.tsx

import { Box, useTheme } from "@mui/material";

import ConversationsBox from "./ConversationsBox";
import { useEffect, useState } from "react";
import ChatBox from "./ChatBox";
import { Conversation, Message } from "../../utils/types/Conversation";
import useFetchConversations from "../../utils/hooks/useFetchConversations";
import LoadingProgress from "../resuables/LoadingProgress";

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

  const {
    conversations: fetchedConversations,
    isLoading,
    error,
  } = useFetchConversations();

  const [conversations, setConversations] =
    useState<Conversation[]>(fetchedConversations);

  useEffect(() => {
    setConversations(fetchedConversations);
  }, [fetchedConversations]);

  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

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

  if (!showSearch) return null;
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
