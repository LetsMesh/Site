import {
  Box,
  Chip,
  IconButton,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Close, Send } from "@mui/icons-material";
import { Conversation, ConversationType } from "../types/Conversation";
import { useAccountContext } from "../../../contexts/UserContext";
import { messageBoxWidth } from "./MessageBox";

interface ChatBoxProps {
  conversation: Conversation;
  setConvo: (value: Conversation | null) => void;
}

const ChatBox: FC<ChatBoxProps> = ({ conversation, setConvo }) => {
  const theme = useTheme();
  const { account } = useAccountContext();
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState(conversation.messages);

  useEffect(() => {
    // Establish WebSocket connection for the specific conversation
    const conversationId = conversation.conversationID;
    const webSocket = new WebSocket(
      `ws://localhost:8000/ws/chat/${conversationId}/`
    ); // Unique URL per conversation
    setWs(webSocket);

    webSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("data", data);

      if (data.message) {
        setMessages((prev) => [...prev, data]);
      }
    };

    return () => {
      webSocket.close();
    };
  }, [conversation.conversationID]); // Reconnect if conversationID changes

  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (ws && newMessage.trim() && newMessage.trim() !== "") {
      ws.send(
        JSON.stringify({
          accountID: account?.accountID,
          message: newMessage,
        })
      );
      setNewMessage("");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      spacing={1}
      style={{ height: "100%" }}
    >
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            maxWidth: "calc(100% - 150px)",
            justifyContent: "center",
            padding: "0 8px",
          }}
        >
          <Typography
            sx={{
              color: "primary.contrastText",
              fontSize: "14px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {conversation.conversation_type === ConversationType.DM
              ? conversation.participants[0].name
              : conversation.participants.map((user) => user.name).join(", ")}
          </Typography>
        </div>
        <div style={{ display: "flex", gap: "2px", alignItems: "center" }}>
          <Chip
            label={conversation.participants[0].isMentee ? "Mentee" : "Mentor"}
            size="small"
            sx={{ fontSize: "11px" }}
            color={"success"}
          />
        </div>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          borderTop: `solid ${theme.palette.secondary.contrastText} 1px`,
          paddingRight: "10px",
        }}
      >
        <List dense={false} sx={{ padding: 0 }}>
          {messages.map((message) => (
            <ListItem
              key={message.messageID}
              sx={{
                width: "100%",
                padding: "0",
                display: "flex",
                justifyContent:
                  message.account_id === account?.accountID
                    ? "flex-end"
                    : "flex-start",
              }}
            >
              <MessageChip content={message.message} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box
        style={{
          width: "100%",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          borderTop: `solid ${theme.palette.secondary.contrastText} 1px`,
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "0",
            width: messageBoxWidth,
            height: "100%",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "8px",
          }}
        >
          <TextField
            fullWidth
            value={newMessage}
            onChange={handleInputChange}
            placeholder="Type a message..."
            variant="standard"
            size="small"
          />
          <IconButton
            onClick={sendMessage}
            sx={{ color: "primary.contrastText", borderRadius: 0 }}
          >
            <Send />
          </IconButton>
          <IconButton
            sx={{ color: "primary.contrastText", borderRadius: 0 }}
            onClick={() => setConvo(null)}
          >
            <Close />
          </IconButton>
        </div>
      </Box>
    </Stack>
  );
};

export default ChatBox;

const MessageChip: FC<{ content: String }> = ({ content }) => {
  const theme = useTheme();

  return (
    <div
      style={{
        background: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
        padding: "8px 12px",
        borderRadius: "16px",
        fontSize: "12px",
        lineHeight: "16px",
        maxWidth: "70%", // Maximum width of the chip
        width: "fit-content",
        whiteSpace: "normal", // Allows text to wrap
        wordBreak: "break-word", // Breaks long words that exceed the width
        marginBottom: "5px", // Add some space between messages
        alignContent: "left",
      }}
    >
      {content}
    </div>
  );
};
