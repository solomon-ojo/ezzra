import ChatLayout from "@/layouts/chat";
import { IoCameraOutline, IoMicOutline } from "react-icons/io5";
import { VscSend } from "react-icons/vsc";
import { useState, useRef, useEffect } from "react";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  // Adjusts textarea height dynamically
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height to auto to shrink it first
      textarea.style.height = `${Math.min(textarea.scrollHeight, 128)}px`; // Set height to scrollHeight, but limit to 128px (4 rows)
    }
  }, [message]);

  return (
    <ChatLayout>
      <section className="w-full max-w-[580px] flex flex-col h-full">
        {/* Chats area */}
        <div className="flex-1 overflow-auto scrollbar-hide p-2">
          <p>Lor</p>
        </div>

        {/* Chat footer */}
        <div className="p-3">
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
                className="flex-1 resize-none scrollbar-hide bg-transparent outline-none max-h-[8rem] overflow-y-auto  text-sm"
              />
              <IoMicOutline size={24} className="opacity-60" />
            </div>
            <button className="bg-primary rounded-lg p-3">
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
