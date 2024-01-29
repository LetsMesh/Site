import {
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { FC } from "react";
import { Conversation } from "../../../utils/types/Conversation";

interface ConversationSelectProps {
  conversations: Conversation[];
  conversation: Conversation | null;
  setConvo: (value: Conversation | null) => void;
}

/**
 * ### ConversationSelect Component
 *
 * #### Overview:
 * The `ConversationSelect` component provides a dropdown menu interface for selecting a conversation from a list.
 * It is particularly useful in scenarios where screen space is limited, such as on mobile devices.
 *
 * #### Props:
 * - `conversations`: An array of `Conversation` objects to be displayed in the dropdown.
 * - `conversation`: The currently selected conversation.
 * - `setConvo`: A function to update the currently selected conversation.
 *
 * #### Functionality:
 * - Renders a dropdown menu containing all available conversations.
 * - Allows users to select a conversation, which updates the current conversation state.
 * - Utilizes Material-UI's `Select` and `MenuItem` components for a consistent and intuitive UI.
 *
 * #### Styling:
 * - Uses Material-UI's `FormControl`, `InputLabel`, `Select`, and `MenuItem` components.
 * - Can be styled further using Material-UI's system or custom CSS.
 *
 * #### Dependencies:
 * - Material-UI components for the dropdown interface.
 * - `Conversation` type from "../../../utils/types/Conversation" for type checking.
 *
 * #### Usage:
 * This component is ideal for mobile views or any other situation where a compact conversation selection interface is needed.
 *
 * #### Example Implementation:
 * ```
 * <ConversationSelect
 *   conversations={listOfConversations}
 *   conversation={currentConversation}
 *   setConvo={setCurrentConversation}
 * />
 * ```
 *
 * #### Notes:
 * - Ensure that the `conversations` prop is populated with the correct data for the dropdown to function properly.
 * - The component is responsive to changes in the `conversations` array, automatically updating the dropdown options.
 */
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
