import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function EnrollCourseCard({ course, enrollCourse }) {
  console.log(course);

  function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  const CalculateProgress = () => {
    return (
      (enrollCourse?.completedChapters?.length ??
        0 / course?.courseContent?.length) * 100
    );
  };

  return (
    <div className="flex flex-col rounded-xl border shadow-sm bg-white overflow-hidden hover:shadow-md transition-shadow duration-300 w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto">
      {/* Banner Image */}
      {course?.bannerImageUrl && isValidUrl(course.bannerImageUrl) && (
        <div className="relative w-full h-40 sm:h-48 md:h-56">
          <Image
            src={course?.bannerImageUrl}
            alt={course?.name || "Course image"}
            fill
            className="rounded-t-xl object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
            priority
          />
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow gap-4">
        {/* Title & Description */}
        <div>
          <h2 className="font-semibold text-lg sm:text-xl text-gray-900 line-clamp-2">
            {course?.name}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-1 line-clamp-3">
            {course?.description}
          </p>
        </div>

        {/* Progress */}
        <div>
          <div className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
            <span className="text-primary">Progress</span>
            <span>{CalculateProgress()}%</span>
          </div>
          <Progress value={CalculateProgress()} className="h-2" />
        </div>

        {/* CTA Button */}
        <Link href={'/workspace/courses/'+course?.cid}>
          <Button className="w-full mt-4 flex items-center justify-center gap-2">
            <PlayCircle className="w-4 h-4" />
            Continue Learning
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default EnrollCourseCard;
