"use client";
import AppHeader from "@/app/workspace/_components/AppHeader";
import React, { useEffect, useState } from "react";
import ChapterListSidebar from "../_components/ChapterListSidebar";
import { useParams } from "next/navigation";
import axios from "axios";
import ChapterContent from "../_components/ChapterContent";
import { Menu } from "lucide-react";

function page() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { courseId } = useParams();
  const [courseInfo, setCourseInfo] = useState();

  useEffect(() => {
    GetEnrolledCourseById();
  }, []);

  const GetEnrolledCourseById = async () => {
    const result = await axios.get("/api/enroll-course?courseId=" + courseId);
    console.log(result.data);
    setCourseInfo(result.data);
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <AppHeader hideSidebar={true} showMyLearningButton={true}/>

      <div className="flex-1 min-h-0 overflow-hidden flex">
        {/* Sidebar (drawer for <md, static for ≥md) */}
        <div
          className={`fixed md:relative z-40 top-0 left-0 h-full w-72 bg-white  shadow-lg border-r border-gray-200 transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:w-80`}
        >
          <ChapterListSidebar courseInfo={courseInfo} />
        </div>

        {/* Dark overlay (only on <md) */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0 min-h-0 overflow-y-auto overscroll-contain relative">
          {/* Toggle button (only visible on <md) */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="absolute top-4 left-4 md:hidden p-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            <Menu className="w-5 h-5" />
          </button>

          <ChapterContent courseInfo={courseInfo} />
        </main>
      </div>
    </div>
  );
}

export default page;
