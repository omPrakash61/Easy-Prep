import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import React from "react";

function AppHeader({ hideSidebar=false }) {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <span
          className="p-2 rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400"
          aria-label="Open sidebar"
        >
          {!hideSidebar && <SidebarTrigger />}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <UserButton />
      </div>
    </header>
  );
}

export default AppHeader;
