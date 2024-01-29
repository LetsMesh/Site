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
