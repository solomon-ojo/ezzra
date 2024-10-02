import ChatLayout from "@/layouts/chat";
import { IoCameraOutline, IoMicOutline } from "react-icons/io5";
import { VscSend } from "react-icons/vsc";
import { useState, useRef, useEffect } from "react";
import { MessageTypes } from "@/lib/types";
import { getCurrentTimestamp, timeAgo, timeAgoFunction } from "@/lib/functions";
import { DummyMessages } from "@/lib/demo"; // Import the dummy messages
import { Spinner } from "@nextui-org/spinner";
import { Avatar } from "@nextui-org/avatar";
import { TbMenu } from "react-icons/tb";
import { PiFramerLogoFill } from "react-icons/pi";
import { siteConfig } from "@/config/site";
import { VscEdit } from "react-icons/vsc";
import { AiOutlineLike } from "react-icons/ai";

const ChatPage = () => {
  // Manage the input message and the array of messages
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageTypes[]>([]); // Initially empty, will populate later
  const [isLoadingMessages, setIsLoadingMessages] = useState(true); // Renamed for clarity

  // References to manage textarea auto-height and chat auto-scroll
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatAreaRef = useRef<HTMLDivElement>(null);

  // Simulate fetching initial messages from a server (after a delay)
  useEffect(() => {
    // Simulate network delay with setTimeout
    const fetchInitialMessages = async () => {
      // Simulate fetching messages from an API
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
      setMessages(DummyMessages); // Populate with dummy data
      setIsLoadingMessages(false); // Set loading to false after data is fetched
    };

    fetchInitialMessages();
  }, []); // Empty dependency array ensures it runs only once

  // Handle input changes for the message
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  // Handle sending the message
  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: MessageTypes = {
        id: messages.length + 1,
        text: message.trim(),
        sender: "user",
        timestamp: getCurrentTimestamp(),
        timeago: "Just now",
      };

      // Add the new message to the array and clear the input
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage(""); // Clear the input
    }
  };

  // Adjusts textarea height dynamically
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 128)}px`;
    }
  }, [message]);

  // Auto-scroll chat area to the bottom when messages change
  useEffect(() => {
    const chatArea = chatAreaRef.current;
    if (chatArea) {
      chatArea.scrollTo({
        top: chatArea.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <ChatLayout>
      <section className="w-full max-w-[580px] flex flex-col h-full">
        {/* Chats area */}
        <div
          ref={chatAreaRef}
          className="flex-1 flex flex-col gap-0 overflow-auto scrollbar-hide"
        >
          {/* Display the spinner while messages are loading */}
          {isLoadingMessages && (
            <div className="h-[50svh] flex items-center justify-center">
              <Spinner color="default" size="sm" />
            </div>
          )}

          {/* Display the messages once they are loaded */}
          {!isLoadingMessages &&
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`my-2 p-2 flex items-start justify-between rounded-lg ${
                  msg.sender === "bot" ? "bg-card shadow-sm" : "bg-transparent"
                }`}
              >
                {/* Left */}
                <div className="flex items-start gap-3">
                  <div>
                    {msg.sender == "user" ? (
                      <Avatar
                        className="h-[35px] w-[35px] rounded-lg shrink-0"
                        src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                        size="sm"
                      />
                    ) : (
                      <div className="h-[35px] w-[35px] border border-bordercolor bg-card flex items-center justify-center rounded-lg shrink-0">
                        <PiFramerLogoFill
                          size={20}
                          color={siteConfig.colors.primary}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <h1 className="font-semibold text-[15px]">
                        {msg.sender == "bot" ? "EzzraAI" : "You"}
                      </h1>
                      <span className=" inline-block w-[6px] h-[6px] bg-gray-500 rounded-full"></span>
                      <p className="text-[13px] opacity-65">{msg.timeago}</p>
                    </div>
                    {/* Chat message */}
                    <p className="text-[13px] break-words overflow-wrap-anywhere">
                      {msg.text}
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div>
                  {msg.sender == "user" ? (
                    <div
                      className="h-[28px] w-[28px] rounded-lg border border-bordercolor flex items-center justify-center
                  "
                    >
                      <VscEdit size={13} />
                    </div>
                  ) : (
                    <div
                      className="h-[28px] w-[50px] justify-between px-[5px] rounded-lg border border-bordercolor flex items-center gap-1
                  "
                    >
                      <AiOutlineLike size={15} />
                      <AiOutlineLike size={15} />
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>

        {/* Chat footer */}
        <div className="pt-3">
          <div className="flex items-end gap-2">
            <div className="bg-card p-3 rounded-lg justify-between flex items-end flex-1 gap-2">
              <IoCameraOutline size={24} className="opacity-60" />
              <textarea
                ref={textareaRef}
                value={message}
                onChange={handleInputChange}
                maxLength={500}
                placeholder="Enter a prompt here..."
                rows={1}
                className="flex-1 resize-none scrollbar-hide bg-transparent outline-none max-h-[8rem] overflow-y-auto text-sm"
              />
              <IoMicOutline size={24} className="opacity-60" />
            </div>
            <button
              onClick={handleSendMessage}
              className="bg-primary rounded-lg p-3"
            >
              <VscSend size={24} color="white" />
            </button>
          </div>
          <p className="text-[11px] opacity-70 p-2 text-center">
            EzzraAI can make mistakes. Learn more.
          </p>
        </div>
      </section>
    </ChatLayout>
  );
};

export default ChatPage;
