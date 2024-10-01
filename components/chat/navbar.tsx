import { ThemeSwitch } from "../theme-switch";
import { CgMenuRight } from "react-icons/cg";
import { TbMenu } from "react-icons/tb";
export const NavBar = () => {
  return (
    <div className="flex h-[45px] bg-card shadow-sm items-center px-3 border-bordercolor justify-between">
      <div className="flex gap-3 items-center">
        <TbMenu size={23} className="flex md:hidden" />
        <p className="font-medium">Chat</p>
      </div>
      <ThemeSwitch />
    </div>
  );
};
