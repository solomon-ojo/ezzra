import { Head } from "./head";
import { NavBar } from "@/components/chat/navbar";
import { SideNav } from "@/components/chat/sidenav";
import { useState } from "react";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // State to manage the sidenav visibility
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex h-[100svh]">
      <Head />
      {/* SideNav: Hidden on smaller screens, visible on medium and larger screens */}
      <aside
        className={`absolute z-20 top-0 h-full transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:relative md:translate-x-0 w-[80%] md:w-64`}
      >
        <SideNav />
      </aside>

      <main className="flex-1 flex flex-col">
        {/* Main Navbar */}
        <NavBar openNavBar={() => setIsOpen(!isOpen)} />
        <div className="flex-1 p-2 overflow-auto flex items-center justify-center">
          {children}
        </div>
      </main>

      {/* Overlay to close the sidenav when clicked outside on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}
