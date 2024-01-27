// src/components/MessageBar/components/Conversations.tsx

import {
  Box,
  IconButton,
  List,
  ListItem,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import { Close as CloseIcon, Search as SearchIcon } from "@mui/icons-material";
import { dummy_conversations } from "../examples/conversations";
import ConversationCard from "./ConversationCard";
import { Conversation } from "../types/Conversation";
import { messageBoxWidth } from "./MessageBox";
import useFetchConversations from "../hooks/useFetchConversations";
import { useAccountContext } from "../../../contexts/UserContext";
import LoadingProgress from "../../resuables/LoadingProgress";

interface ConversationsProps {
  showSearch: boolean;
  setShowSearch: (value: boolean) => void;
  setConvo: (value: Conversation | null) => void;
}

const Conversations: React.FC<ConversationsProps> = ({
  showSearch,
  setShowSearch,
  setConvo,
}) => {
  const theme = useTheme();
  const { account } = useAccountContext();

  const { conversations, isLoading, error } = useFetchConversations();

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
        <List dense={false} sx={{ padding: 0 }}>
          {isLoading ? (
            <LoadingProgress />
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            conversations.map((convo) => (
              <ListItem
                onClick={() => setConvo(convo)}
                key={convo.conversationID}
                sx={{
                  padding: "0 8px",
                  marginBottom: "4px",
                  gap: "0px",
                  width: "100%",
                  borderColor: "text.secondary",
                  cursor: "pointer",
                  ":hover": {
                    backgroundColor: theme.palette.secondary.dark,
                  },
                  borderRadius: "4px",
                }}
              >
                <ConversationCard
                  conversation={convo}
                  key={convo.conversationID}
                />
              </ListItem>
            ))
          )}
        </List>
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

export default Conversations;
