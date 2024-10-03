import ChatLayout from "@/layouts/chat";
import { IoCameraOutline, IoMicOutline } from "react-icons/io5";
import { VscSend } from "react-icons/vsc";
import { useState, useRef, useEffect } from "react";
import { MessageTypes } from "@/lib/types";
import { getCurrentTimestamp } from "@/lib/functions";
import { Spinner } from "@nextui-org/spinner";
import { Avatar } from "@nextui-org/avatar";
import { PiFramerLogoFill } from "react-icons/pi";
import { siteConfig } from "@/config/site";
import { VscEdit } from "react-icons/vsc";
import { AiOutlineLike } from "react-icons/ai";
import { getChatGPTResponse, GetChatGPTResponse } from "@/lib/helper";
import { BiDislike } from "react-icons/bi";

const ChatPage = () => {
  const [message, setMessage] = useState(""); // Input message state
  const [messages, setMessages] = useState<MessageTypes[]>([]); // Empty initial messages
  const [isTyping, setIsTyping] = useState(false); // Typing indicator

  const textareaRef = useRef<HTMLTextAreaElement>(null); // Ref for auto-height adjustment
  const chatAreaRef = useRef<HTMLDivElement>(null); // Ref for auto-scroll

  // Handle input changes for the message
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  // Handle sending the message and fetching the AI response
  const handleSendMessage = async () => {
    if (message.trim()) {
      const newMessage: MessageTypes = {
        id: messages.length + 1,
        text: message.trim(),
        sender: "user",
        timestamp: getCurrentTimestamp(),
        timeago: "Just now",
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage(""); // Clear the input

      // Show typing indicator
      setIsTyping(true);

      try {
        // Get response from AI
        const aiResponse: any = await getChatGPTResponse(newMessage.text);
        const aiMessage: MessageTypes = {
          id: messages.length + 2,
          text: aiResponse,
          sender: "bot",
          timestamp: getCurrentTimestamp(),
          timeago: "Just now",
        };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      } catch (error) {
        console.error("Error fetching AI response:", error);
      } finally {
        setIsTyping(false); // Hide typing indicator
      }
    }
  };

  // Adjust textarea height dynamically
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 128)}px`; // Max height of 128px
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
          {/* Display the messages */}
          {messages.map((msg) => (
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
                      {msg.sender == "bot"
                        ? `${siteConfig.shortName}AI`
                        : "You"}
                    </h1>
                    <span className="inline-block w-[6px] h-[6px] bg-gray-500 rounded-full"></span>
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
                  <div className="h-[28px] w-[50px] justify-between px-[5px] rounded-lg border border-bordercolor flex items-center gap-1">
                    <AiOutlineLike size={15} />
                    <BiDislike size={15} />
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Display typing indicator */}
          {isTyping && (
            <div className="flex items-center justify-center gap-2 p-2 w-full">
              <Spinner color="secondary" size="sm" />
              <p className="text-sm text-gray-500">
                {siteConfig.shortName}AI is typing...
              </p>
            </div>
          )}
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
            {siteConfig.shortName}AI can make mistakes. Learn more.
          </p>
        </div>
      </section>
    </ChatLayout>
  );
};

export default ChatPage;
