import { ThemeSwitch } from "../theme-switch";
import { CgMenuRight } from "react-icons/cg";
import { TbMenu } from "react-icons/tb";

type Types = {
  openNavBar: () => void;
};

export const NavBar = ({ openNavBar }: Types) => {
  return (
    <div className="flex h-[50px] md:h-[45px] bg-card shadow-sm items-center px-3 border-bordercolor justify-between">
      <div className="flex gap-3 items-center">
        <TbMenu
          role="presentation"
          onClick={openNavBar}
          size={23}
          className="flex md:hidden outline-none"
        />
        <p className="font-medium text-[18px]">Chat</p>
      </div>
      <div className="h-[32px] w-[32px] border border-bordercolor shrink-0 flex items-center justify-center rounded-full bg-background">
        <ThemeSwitch />
      </div>
    </div>
  );
};
