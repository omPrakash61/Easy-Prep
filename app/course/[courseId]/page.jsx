"use client";
import AppHeader from "@/app/workspace/_components/AppHeader";
import React, { useEffect, useState } from "react";
import ChapterListSidebar from "../_components/ChapterListSidebar";
import { useParams } from "next/navigation";
import axios from "axios";
import ChapterContent from "../_components/ChapterContent";

function page() {
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
    <div className="flex flex-col min-h-screen">
      <AppHeader hideSidebar={true} />
      <div className="flex flex-1">
        <ChapterListSidebar courseInfo={courseInfo} />
        <div className="flex-1 p-5">
          <ChapterContent courseInfo={courseInfo}/>
        </div>
      </div>
    </div>
  );
}

export default page;
