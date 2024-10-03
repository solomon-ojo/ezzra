import { IoChatboxOutline } from "react-icons/io5";

type Types = {
  title: string;
  description: string;
  isActive: boolean;
  time: string;
  action: () => void;
};

export const ChatHistoryCard = ({
  isActive,
  action,
  description,
  title,
  time,
}: Types) => {
  return (
    <div
      role="presentation"
      onClick={action}
      className={`w-full border ${isActive && "border-primary bg-lightprimarybg"} cursor-pointer py-1 px-3 rounded-lg border-bordercolor justify-between flex items-start`}
    >
      <div className="flex items-start gap-2">
        <div className={`mt-1 ${isActive && "text-primary"} `}>
          <IoChatboxOutline size={14} />
        </div>
        <div>
          <h1 className="text-[14px] md:text-[13px] font-medium">{title}</h1>
          <p className="text-[13px] md:text-[12px] opacity-70">{description}</p>
        </div>
      </div>
      <div>
        <p className="text-[12px] opacity-70">{time}</p>
      </div>
    </div>
  );
};
