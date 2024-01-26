// src/components/MessageBar/components/MessageBox.tsx

import {
  Box,
  IconButton,
  List,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import { Close as CloseIcon, Search as SearchIcon } from "@mui/icons-material";
import { dummy_conversations } from "../examples/conversations";
import ConversationComponent from "./Conversation";

const messageBoxWidth = 400;

interface MessageBoxProps {
  showSearch: boolean;
  setShowSearch: (value: boolean) => void;
}

const MessageBox: React.FC<MessageBoxProps> = ({
  showSearch,
  setShowSearch,
}) => {
  const theme = useTheme();

  if (!showSearch) return null;

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
      }}
    >
      <Stack>
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
            overflowY: "auto",
            maxHeight: "50vh",
          }}
        >
          <List dense={false}>
            {dummy_conversations.map((convo) => (
              <ConversationComponent
                conversation={convo}
                key={convo.with.accountID}
              />
            ))}
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
            borderTop: "sold black 1px",
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
              sx={{ color: "black" }}
              onClick={() => setShowSearch(!showSearch)}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      </Stack>
    </Box>
  );
};

export default MessageBox;
