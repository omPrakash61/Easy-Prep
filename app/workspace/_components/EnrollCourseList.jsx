"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import EnrollCourseCard from "./EnrollCourseCard";

function EnrollCourseList() {
  const [enrolledCourseList, setEnrolledCourseList] = useState([]);

  useEffect(() => {
    GetEnrolledCourse();
  }, []);

  const GetEnrolledCourse = async () => {
    const result = await axios.get("/api/enroll-course");
    console.log(result.data);
    setEnrolledCourseList(result.data);
  };

  return (
    <div className="my-8">
      <h2 className="text-3xl font-semibold py-5">Continue Learning Your Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {enrolledCourseList?.map((course, index) => (
          <EnrollCourseCard
            course={course?.courses}
            enrollCourse={course?.enrolledCourseList}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default EnrollCourseList;
