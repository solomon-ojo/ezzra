import Link from "next/link";
import { PiFramerLogoFill } from "react-icons/pi";
import { AsideButton } from "./AsideButton";
import {
  IoAddOutline,
  IoArchiveOutline,
  IoChatboxOutline,
  IoFolderOutline,
  IoHeartOutline,
  IoHelpCircleOutline,
  IoHelpOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { title } from "process";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { ChatHistoryCard } from "./ChatHistoryCard";
import { RxCaretDown } from "react-icons/rx";
import { ProfileDetailComp } from "../profileDetails";
import { IoSettingsOutline } from "react-icons/io5";

const AsideButtonObj = [
  {
    id: 0,
    title: "New Chat",
    icon: <IoAddOutline size={17} />,
    figure: 0,
  },
  {
    id: 1,
    title: "Search",
    icon: <IoSearchOutline size={17} />,
    figure: 0,
  },
  {
    id: 2,
    title: "Folder",
    icon: <IoFolderOutline size={17} />,
    figure: 4,
  },
  {
    id: 3,
    title: "Favourite",
    icon: <IoHeartOutline size={17} />,
    figure: 12,
  },
  {
    id: 4,
    title: "Archive",
    icon: <IoArchiveOutline size={17} />,
    figure: 3,
  },
];

const HistoryChatObj = [
  {
    id: 0,
    title: "Compose a blog of...",
    description: "to provide you with an...",
    time: "15m",
  },
  {
    id: 1,
    title: "Compose a blog of...",
    description: "to provide you with an...",
    time: "17m",
  },
  {
    id: 2,
    title: "Compose a blog of...",
    description: "to provide you with an...",
    time: "22m",
  },
  {
    id: 3,
    title: "Compose a blog of...",
    description: "to provide you with an...",
    time: "23m",
  },
];

export const SideNav = () => {
  const [active, setActive] = useState(0);
  const [activeHistory, setActiveHistory] = useState(2);

  return (
    <aside className="w-full md:w-64 bg-card h-full relative scrollbar-hide overflow-scroll border-r border-bordercolor">
      {/* Header */}
      <div>
        <Link
          href={siteConfig.sitePaths.chatHome}
          className="h-[45px] flex items-center px-4 gap-2 border-b border-bordercolor"
        >
          <PiFramerLogoFill size={20} color={siteConfig.colors.primary} />
          <p className="font-extrabold text-[18px]">{siteConfig.shortName}</p>
        </Link>

        {/* Links */}
        <nav className="p-3 flex flex-col gap-1">
          {AsideButtonObj.map((v) => (
            <AsideButton
              key={v.id}
              isActive={active == v.id}
              icon={v.icon}
              title={v.title}
              figure={v.figure}
              action={() => setActive(v.id)}
            />
          ))}

          {/* Chat History */}
          <div className="mt-6 flex flex-col gap-1">
            {HistoryChatObj.map((v) => (
              <ChatHistoryCard
                key={v.id}
                action={() => setActiveHistory(v.id)}
                time={v.time}
                isActive={activeHistory == v.id}
                description={v.description}
                title={v.title}
              />
            ))}
            <div className="h-[35px] cursor-pointer flex items-center gap-1 shadow-sm justify-center rounded-lg w-full border border-bordercolor">
              <p className="text-[13px] font-medium">Show more</p>
              <RxCaretDown
                className="mt-[2px]"
                color={siteConfig.colors.primary}
              />
            </div>
          </div>
        </nav>
      </div>

      {/* Bottom */}
      <div className=" absolute bottom-0 w-full bg-card z-10">
        <div className="p-3 flex flex-col gap-3">
          <div className="px-2 cursor-pointer flex items-center gap-2">
            <IoSettingsOutline />
            <p className="text-[14px]">Settings</p>
          </div>
          <div className="px-2 cursor-pointer flex items-center gap-2">
            <IoHelpCircleOutline />
            <p className="text-[14px]">Help</p>
          </div>
        </div>
        <div className="p-3 border-t border-bordercolor">
          <ProfileDetailComp />
        </div>
      </div>
    </aside>
  );
};
