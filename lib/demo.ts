import { MessageTypes } from "./types";

export const DummyMessages: MessageTypes[] = [
  {
    id: 1,
    text: "Hello! How can I assist you today?",
    sender: "bot",
    timestamp: "2024-10-01 09:00:00",
    timeago: "1 hour ago",
  },
  {
    id: 2,
    text: "Can you help me with understanding React hooks?",
    sender: "user",
    timestamp: "2024-10-01 09:01:00",
    timeago: "44 min ago",
  },
  {
    id: 3,
    text: "Of course! React hooks are functions that let you use state and other React features without writing a class.",
    sender: "bot",
    timestamp: "2024-10-01 09:02:00",
    timeago: "12 min ago",
  },
  {
    id: 4,
    text: "Oh, I see. Can you give me an example?",
    sender: "user",
    timestamp: "2024-10-01 09:03:00",
    timeago: "2 min ago",
  },
  {
    id: 5,
    text: "Sure! Here's a simple example of using the `useState` hook...",
    sender: "bot",
    timestamp: "2024-10-01 09:04:00",
    timeago: "Just now",
  },
];
