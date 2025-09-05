"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function EnrollCourseCard({ course, enrollCourse }) {
  const noOfChapters = course?.noOfChapters || 0;
  const completeChapters = enrollCourse?.completeChapters || {};
  const [progress, setProgress] = useState(0);

  function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  const calculateProgress = () => {
    if (noOfChapters === 0) return 0;

    const completedCount = Object.values(completeChapters).filter(
      (value) => value === 1
    ).length;

    return Math.round((completedCount / noOfChapters) * 100);
  };

  useEffect(() => {
    setProgress(calculateProgress());
  }, [course, enrollCourse]);

  return (
    <div className="flex flex-col rounded-xl border shadow-sm bg-white overflow-hidden hover:shadow-md transition-shadow duration-300 w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto">
      {course?.bannerImageUrl && isValidUrl(course.bannerImageUrl) && (
        <div className="relative w-full h-40 sm:h-48 md:h-56">
          <Image
            src={course.bannerImageUrl}
            alt={course?.name || "Course image"}
            fill
            className="rounded-t-xl object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
            priority
          />
        </div>
      )}

      <div className="p-5 flex flex-col flex-grow gap-4">
        <div>
          <h2 className="font-semibold text-lg sm:text-xl text-gray-900 line-clamp-2">
            {course?.name}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-1 line-clamp-3">
            {course?.description}
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
            <span className="text-primary">Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Link href={`/workspace/view-course/${course?.cid}`}>
          <Button
            variant={progress === 0 ? "outline" : "default"}
            className="w-full mt-4 flex items-center justify-center gap-2"
          >
            <PlayCircle className="w-4 h-4" />
            {progress === 0 ? "Start Learning" : "Continue Learning"}
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default EnrollCourseCard;
