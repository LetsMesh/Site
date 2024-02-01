// src/components/MessageBar/types/Conversation.ts

export interface ConversationUser {
  accountID: number;
  name: string;
  isMentor: boolean;
  isMentee: boolean;
}

export interface Message {
  messageID: number;
  account_id: number;
  message: string;
  timestamp: string;
}

export enum ConversationType {
  DM = "Direct Message",
  GROUP = "Group Conversation",
}

export interface Conversation {
  conversationID: number;
  participants: ConversationUser[];
  conversation_type: ConversationType;
  messages: Message[];
}
