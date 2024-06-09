import {
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { FC } from "react";
import { Conversation } from "src/models/conversation";

interface ConversationSelectProps {
  conversations: Conversation[];
  conversation: Conversation | null;
  setConvo: (value: Conversation | null) => void;
}

const ConversationSelect: FC<ConversationSelectProps> = ({
  conversations,
  conversation,
  setConvo,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    // Find the selected conversation by its ID
    const selectedConvo = conversations.find(
      (c) => c.conversationID.toString() === event.target.value
    );
    setConvo(selectedConvo || null);
  };

  return (
    <div>
      <FormControl sx={{ minWidth: 120 }} fullWidth variant="standard">
        <InputLabel id="conversation-select-label">Conversation</InputLabel>
        <Select
          labelId="conversation-select-label"
          id="conversation-select"
          value={conversation?.conversationID.toString() || ""}
          onChange={handleChange}
          label="Select a conversation"
        >
          {conversations.map((convo) => (
            <MenuItem
              key={convo.conversationID}
              value={convo.conversationID.toString()}
            >
              {convo.participants[0].name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default ConversationSelect;
