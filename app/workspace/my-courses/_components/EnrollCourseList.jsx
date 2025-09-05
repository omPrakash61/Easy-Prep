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
    <div className="my-4">
      <h2 className="text-4xl font-bold font-sans pb-6 leading-snug">
        Continue Your{" "}
        <span className="bg-gradient-to-r from-purple-400 to-purple-600 text-white px-3 py-2 rounded-lg  text-lg shadow-md">
          Self-paced Learning
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {enrolledCourseList?.map((course, index) => (
          <EnrollCourseCard
            course={course?.courses}
            enrollCourse={course?.enrollCourse}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default EnrollCourseList;
