"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AddNewCourseDialog from "./AddNewCourseDialog";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import CourseCard from "./CourseCard";

function AllCourseList() {
  const [courseList, setCourseList] = useState([]);
  const user = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      getCourseList();
    }
  }, []);

  const getCourseList = async () => {
    try {
      setLoading(true);
      const result = await axios.post("/api/courses", {
        isAllCourse: true,
      });
      setCourseList(result.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:mt-8 md:mt-4 mt-3 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {courseList.map((course, index) => (
            <CourseCard course={course} key={index} />
          ))}
        </div>
  );
}

export default AllCourseList;
