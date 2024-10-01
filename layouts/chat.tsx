import { Head } from "./head";
import { NavBar } from "@/components/chat/navbar";
import { SideNav } from "@/components/chat/sidenav";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-[100svh]">
      <Head />
      {/* SideNav: Hidden on smaller screens, visible on medium and larger screens */}
      <aside className="hidden md:block md:w-64 ">
        <SideNav />
      </aside>
      <main className="flex-1">
        {/* Main Navbar */}
        <NavBar />
        <div className="p-6 overflow-auto">{children}</div>
      </main>
    </div>
  );
}
