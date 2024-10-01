import { title } from "@/components/primitives";
import ChatLayout from "@/layouts/chat";

const ChatPage = () => {
  return (
    <ChatLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="max-w-lg text-center flex items-center justify-center">
          <h1 className={`${title()} mt-[100px]`}>Chat Interface</h1>
        </div>
      </section>
    </ChatLayout>
  );
};

export default ChatPage;
