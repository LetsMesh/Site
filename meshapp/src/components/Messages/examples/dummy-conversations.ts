import { Conversation, ConversationType } from "src/models/conversation";

export const dummy_conversations: Conversation[] = [
  {
    conversationID: 1,
    participants: [
      {
        accountID: 2,
        name: "Alice Smith",
        isMentor: true,
        isMentee: false,
      },
    ],
    conversation_type: ConversationType.DM,
    messages: [
      {
        messageID: 101,
        account_id: 2,
        message: "Hi there! How can I help you today?",
        timestamp: "2024-01-25T09:00:00Z",
      },
      {
        messageID: 102,
        account_id: 1,
        message:
          "I'm looking for advice on learning React. I want to unlock my potential with your expert guidance and support.",
        timestamp: "2024-01-25T09:05:00Z",
      },
    ],
  },
];
