"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CourseInfo from "../_components/CourseInfo";
import ChapterTopicList from "../_components/ChapterTopicList";

function EditCourse() {
  const params = useParams();
  const courseId = params?.courseId?.toString();
  const [course, setCourse] = useState();

  useEffect(() => {
    if (!courseId) return;
    GetCourseInfo();
  }, [courseId]);

  const GetCourseInfo = async () => {
    try {
      const result = await axios.get(`/api/courses?courseId=${courseId}`);
      console.log(result.data);
      setCourse(result.data);
    } catch (err) {
      console.error("Error fetching course info:", err);
    }
  };

  return (
    <>
      <CourseInfo course={course} />
      { course && <ChapterTopicList course={course}/> }
    </>
  );
}

export default EditCourse;
