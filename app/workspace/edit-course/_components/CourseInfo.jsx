"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Book,
  Clock,
  LucideLoader,
  Sparkle,
  TrendingUpIcon,
} from "lucide-react";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";

function CourseInfo({ course }) {
  const courseLayout = course?.courseJson;
  const router = useRouter();

  useEffect(() => {
    // console.log(courseLayout);
    console.log(course);
  }, [courseLayout]);

  const [loading, setLoading] = useState(false);

  if (!course) return <div>Loading...</div>;

  const GenerateCourseContent = async () => {
    setLoading(true);
    try {
      console.log("Sending courseLayout:", courseLayout);
      const result = await axios.post("/api/generate-course-content", {
        course: courseLayout,
        courseId: course.cid,
      });

      console.log(result.data);
      router.replace("/workspace");
      toast.success("Course-content Generated Succesfully ✅");
    } catch (error) {
      router.replace("/workspace");
      console.error(error);
      toast.error("Server side error, Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 p-4 md:p-8 bg-white rounded-2xl shadow-xl w-full max-w-full">
      <div className="flex-1 w-full">
        <h2 className="text-3xl font-bold mb-2 text-gray-800">{course.name}</h2>
        <p className="line-clamp-3 text-gray-600 mb-4 leading-relaxed">
          {course.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
          {[
            {
              icon: <Clock className="text-red-600 w-8 h-8" />,
              title: "Duration",
              value: "2 Hour",
            },
            {
              icon: <Book className="text-blue-500 w-8 h-8" />,
              title: "Chapters",
              value: course.noOfChapters,
            },
            {
              icon: <TrendingUpIcon className="text-green-600 w-8 h-8" />,
              title: "Difficulty",
              value: course.level,
            },
          ].map(({ icon, title, value }, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-3 py-3 rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition-all"
            >
              {icon}
              <section>
                <h3 className="font-semibold font-sans text-gray-800">
                  {title}
                </h3>
                <p className="text-gray-600 text-sm">{value}</p>
              </section>
            </div>
          ))}
        </div>
        <Button
          onClick={GenerateCourseContent}
          type="submit"
          className="w-full text-white gap-2"
          disabled={loading}
        >
          {loading ? (
            <LucideLoader className="animate-spin" />
          ) : (
            <Sparkle className="w-4 h-4" />
          )}
          {loading ? "Just few Seconds Content is getting Ready..." : "Generate Content"}
        </Button>
      </div>

      <div className="w-full md:w-[400px] h-[240px] rounded-2xl overflow-hidden shadow-xl flex-shrink-0">
        <Image
          src={course?.bannerImageUrl}
          alt="bannerImage"
          width={400}
          height={240}
          className="w-full h-full object-cover"
          priority
        />
      </div>
    </div>
  );
}

export default CourseInfo;
