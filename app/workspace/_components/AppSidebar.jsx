"use client";

import React from "react";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  BookOpen,
  Bot,
  Compass,
  CreditCard,
  LayoutDashboard,
  Rocket,
  User,
} from "lucide-react";
import { usePathname } from "next/navigation";
import AddNewCourseDialog from "./AddNewCourseDialog";

const SidebarOptions = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/workspace",
  },
  {
    title: "My Learning",
    icon: BookOpen,
    path: "/workspace/my-courses",
  },
  {
    title: "Explore Courses",
    icon: Compass,
    path: "/workspace/explore",
  },
  {
    title: "AI Tools",
    icon: Bot,
    path: "/workspace/ai-tools",
  },
  {
    title: "Billing",
    icon: CreditCard,
    path: "/workspace/billing",
  },
  {
    title: "Profile",
    icon: User,
    path: "/workspace/profile",
  },
];

function AppSidebar() {
  const path = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-3 rounded-sm my-1 px-2">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md">
              <Rocket className="w-5 h-5" />
            </div>
            <span className="hidden px-2 sm:inline-block font-sans font-bold text-xl">
              Easy-Prep
            </span>
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <AddNewCourseDialog>
            <Button className="w-full text-white">Create New Course</Button>
          </AddNewCourseDialog>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SidebarOptions.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild className={"p-7"}>
                    <Link
                      href={item.path}
                      className={`text-[15px] px-3 py-4 mt-1 rounded-md transition-colors ${
                        path === item.path
                          ? "bg-violet-200 text-primary"
                          : "hover:bg-violet-100 text-gray-700"
                      }`}
                    >
                      <item.icon className="h-10 w-10" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

export default AppSidebar;
