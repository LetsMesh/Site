// src/components/MessageBar/examples/conversations.ts

import { Conversation } from "../types/Conversation";

export const dummy_conversations: Conversation[] = [
  {
    with: {
      accountID: 1,
      name: "John Doe",
      isMentor: true,
      isMentee: false,
    },
    messages: [
      {
        messageID: 101,
        fromAccountID: 1,
        toAccountID: 2,
        message: "Hi there! How can I help you today?",
        timestamp: "2024-01-25T09:00:00Z",
      },
      {
        messageID: 102,
        fromAccountID: 2,
        toAccountID: 1,
        message: "I'm looking for advice on learning React.",
        timestamp: "2024-01-25T09:05:00Z",
      },
    ],
  },
  {
    with: {
      accountID: 2,
      name: "Alice Smith",
      isMentor: false,
      isMentee: true,
    },
    messages: [
      {
        messageID: 103,
        fromAccountID: 2,
        toAccountID: 1,
        message: "Hey, have you completed the project?",
        timestamp: "2024-01-24T15:30:00Z",
      },
      {
        messageID: 104,
        fromAccountID: 1,
        toAccountID: 2,
        message: "Not yet, still working on the final touches.",
        timestamp: "2024-01-24T16:00:00Z",
      },
    ],
  },
  {
    with: {
      accountID: 3,
      name: "Emily Johnson",
      isMentor: true,
      isMentee: false,
    },
    messages: [
      {
        messageID: 105,
        fromAccountID: 3,
        toAccountID: 4,
        message: "Can we schedule a meeting for tomorrow?",
        timestamp: "2024-01-26T10:00:00Z",
      },
    ],
  },
  {
    with: {
      accountID: 4,
      name: "Michael Brown",
      isMentor: false,
      isMentee: true,
    },
    messages: [
      {
        messageID: 106,
        fromAccountID: 4,
        toAccountID: 3,
        message: "Sure, what time works best for you?",
        timestamp: "2024-01-26T10:05:00Z",
      },
    ],
  },
  {
    with: {
      accountID: 5,
      name: "Sophia Davis",
      isMentor: true,
      isMentee: false,
    },
    messages: [
      {
        messageID: 107,
        fromAccountID: 5,
        toAccountID: 6,
        message: "I've reviewed your application. Let's discuss.",
        timestamp: "2024-01-26T08:00:00Z",
      },
    ],
  },
  {
    with: {
      accountID: 6,
      name: "Oliver Wilson",
      isMentor: false,
      isMentee: true,
    },
    messages: [
      {
        messageID: 108,
        fromAccountID: 6,
        toAccountID: 5,
        message: "Thanks! Looking forward to your feedback.",
        timestamp: "2024-01-26T08:30:00Z",
      },
    ],
  },
  {
    with: {
      accountID: 7,
      name: "Charlotte Miller",
      isMentor: true,
      isMentee: false,
    },
    messages: [
      {
        messageID: 109,
        fromAccountID: 7,
        toAccountID: 8,
        message: "Reminder: our session starts in 15 minutes.",
        timestamp: "2024-01-26T11:45:00Z",
      },
    ],
  },
  {
    with: {
      accountID: 8,
      name: "Lucas Anderson",
      isMentor: false,
      isMentee: true,
    },
    messages: [
      {
        messageID: 110,
        fromAccountID: 8,
        toAccountID: 7,
        message: "Got it. I'm logging in now.",
        timestamp: "2024-01-26T11:50:00Z",
      },
    ],
  },
  {
    with: {
      accountID: 9,
      name: "Amelia Rodriguez",
      isMentor: true,
      isMentee: false,
    },
    messages: [
      {
        messageID: 111,
        fromAccountID: 9,
        toAccountID: 10,
        message: "New resources available on our platform. Check them out!",
        timestamp: "2024-01-27T09:00:00Z",
      },
    ],
  },
  {
    with: {
      accountID: 10,
      name: "Mason Martinez",
      isMentor: false,
      isMentee: true,
    },
    messages: [
      {
        messageID: 112,
        fromAccountID: 10,
        toAccountID: 9,
        message: "Thanks, will do!",
        timestamp: "2024-01-27T09:30:00Z",
      },
    ],
  },
];
