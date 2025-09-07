"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import { MoveLeftIcon } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

function AppHeader({ hideSidebar = false, showMyLearningButton = false }) {
  const router = useRouter();
  return (
    <header className="w-full bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <span
          className="p-2 rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400"
          aria-label="Open sidebar"
        >
          {!hideSidebar && <SidebarTrigger />}
          {showMyLearningButton && (
            <button
              onClick={() => router.push("/workspace/my-courses")}
              className="group flex items-center gap-2 px-3 py-2 rounded-md 
               text-md font-medium text-gray-700
               transition-colors hover:text-purple-800"
            >
              <MoveLeftIcon
                className="w-4 h-4 transform transition-transform duration-300
                 group-hover:-translate-x-1 group-hover:text-purple-600"
              />
              <span className="font-semibold text-md group-hover:text-purple-600">
                My Learning
              </span>
            </button>
          )}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <UserButton />
      </div>
    </header>
  );
}

export default AppHeader;
