import { Button } from "@/components/ui/button";
import { ArrowRight, Book, PlayCircle } from "lucide-react";
import Image from "next/image";
import React from "react";

function CourseCard({ course }) {
  const courseJson = course?.coursejson?.course;
//   courseJson && console.log(courseJson);

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}


  return (
    <div className="flex flex-col rounded-xl shadow-md bg-white overflow-hidden hover:shadow-lg transition-shadow duration-300 max-w-sm mx-auto md:max-w-none md:mx-0">
      {course?.bannerImageUrl && isValidUrl(course.bannerImageUrl) && (
        <div className="relative w-full h-48 md:h-56">
          <Image
            src={course.bannerImageUrl}
            alt={course?.name || "Course image"}
            fill
            className="object-cover rounded-t-xl"
            sizes="(max-width: 768px) 100vw, 400px"
            priority
          />
        </div>
      )}
      <div className="p-4 flex flex-col flex-grow gap-3">
        <h2 className="font-semibold text-xl text-gray-900 line-clamp-2">
          {course?.name}
        </h2>
        <p className="text-gray-500 text-sm line-clamp-3">
          {course?.description}
        </p>
        <div className="mt-auto flex justify-between items-center">
          <div className="flex items-center text-gray-600 gap-2">
            <Book className="w-5 h-5" />
            <span className="text-sm">
              {course?.noOfChapters || 0} Chapters
            </span>
          </div>
          <a
            href="#"
            className="flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-800 transition-colors"
          >
            <PlayCircle className="w-5 h-5" />
            View Course
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
