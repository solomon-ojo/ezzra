// Define the Message type
export type MessageTypes = {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: string;
  timeago: string;
};
