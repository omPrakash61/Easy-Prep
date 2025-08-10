"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AddNewCourseDialog from "./AddNewCourseDialog";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import CourseCard from "./CourseCard";

function CourseList() {
  const [courseList, setCourseList] = useState([]);
  const user = useUser();

  useEffect(() => {
    if (user) {
      getCourseList();
    }
  }, []);

  const getCourseList = async () => {
    try {
      const result = await axios.get("/api/courses");
      setCourseList(result.data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-3xl my-6 mx-4 font-semibold text-gray-800">Courses</h2>
      {courseList.length === 0 ? (
        <div className="flex p-10 items-center justify-center flex-col rounded-xl border-1 my-3 bg-sky-50">
          <Image
            src={"/learning.png"}
            width={100}
            height={100}
            alt="learning-image"
          />
          <h2 className="text-xl my-2 font-semibold">
            Looks like you haven't created any Course yet
          </h2>
          <AddNewCourseDialog>
            <Button>+ Create Your first Course</Button>
          </AddNewCourseDialog>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {courseList.map((course, index) => (
            <CourseCard course={course} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseList;