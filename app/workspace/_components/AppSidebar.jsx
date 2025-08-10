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
        <div className="flex items-center mx-2 my-2 px-2 py-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg animate-fade-in">
          <Image
            src="/EasyPrepAI.png"
            alt="Logo"
            width={110}
            height={50}
            className="rounded-lg shadow-lg shadow-violet-700 transition-transform duration-300 hover:scale-105"
          />
          <div className="ml-4">
            <p className="text-white text-sm text-[12px] tracking-wide animate-slide-in">
             <i> Simple Steps to Mastery</i>
            </p>
          </div>
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
                  <SidebarMenuButton asChild className={"p-5"}>
                    <Link
                      href={item.path}
                      className={`text-[15px] px-3 py-4 mt-1 rounded-md transition-colors ${
                        path === item.path
                          ? "bg-violet-200 text-primary font-bold"
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
