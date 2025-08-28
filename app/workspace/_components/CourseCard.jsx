import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Book,
  LoaderCircle,
  PlayCircle,
  SettingsIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

function CourseCard({ course }) {
  // const courseJson = course?.coursejson?.course;
  const [loading, setLoading] = useState(false);
  //   courseJson && console.log(courseJson);

 
  const onEnrollCourse = async () => {
    try {
      setLoading(true);
      const result = await axios.post("/api/enroll-course", {
        courseId: course?.cid,
      });
      console.log(result.data);
      if(result.data?.response){
        toast.warning("Already Enrolled!");
      }
      else toast.success("Enrolled");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  return (
    <div className="flex flex-col rounded-xl shadow-md bg-white overflow-hidden hover:shadow-lg transition-shadow duration-300 max-w-sm md:max-w-none md:mx-0">
      {course?.bannerImageUrl && isValidUrl(course.bannerImageUrl) && (
        <div className="relative w-full h-48 md:h-56">
          <Image
            src={course.bannerImageUrl}
            alt={course?.name || "Course image"}
            fill
            className="aspect-video rounded-t-xl"
            sizes="(max-width: 628px) 100vw, 400px"
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
          {course?.courseContent?.length ? (
            <Button size={"sm"} onClick={onEnrollCourse} disabled={loading} className={'my-3'}>
              {" "}
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <PlayCircle />
              )}{" "}
              Enroll Course{" "}
            </Button>
          ) : (
            <Link href={`workspace/edit-course/${course?.cid}`}>
              <Button variant="outline">
                {" "}
                <SettingsIcon /> Generate Course{" "}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
