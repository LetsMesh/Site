// src/components/MessageBar/types/Conversation.ts

export interface ConversationUser {
  accountID: number;
  name: string;
  isMentor: boolean;
  isMentee: boolean;
}

export interface Message {
  messageID: number;
  fromAccountID: number;
  toAccountID: number;
  message: string;
  timestamp: string;
}

export interface Conversation {
  with: ConversationUser;
  messages: Message[];
}
