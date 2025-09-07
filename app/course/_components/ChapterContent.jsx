"use client";
import { Button } from "@/components/ui/button";
import { SelectedChapterIndexContext } from "@/context/SelectedChapterIndexContext";
import axios from "axios";
import { jsonrepair } from "jsonrepair";
import { CheckCircle, Loader2Icon, TypeOutline, X, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useContext, useState, useEffect } from "react";
import YouTube from "react-youtube";
import { toast } from "sonner";

function ChapterContent({ courseInfo, userId }) {
  const router = useRouter();
  const { selectedChapterIndex } = useContext(SelectedChapterIndexContext);
  const [chapterContent, setChapterContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const completedChapters = courseInfo?.enrollCourse?.completeChapters || [];

  const courseJson = courseInfo?.courses?.courseJson ?? [];
  const courseContent =
    courseInfo?.courses?.courseContent[selectedChapterIndex]?.contentResponse;
  const videoData =
    courseInfo?.courses?.courseContent[selectedChapterIndex]?.youtubeVideos;

  const currentChapter =
    typeof selectedChapterIndex === "number" && courseJson[selectedChapterIndex]
      ? courseJson[selectedChapterIndex]
      : null;

  function refreshData() {
    router.refresh(); // ✅ Re-fetches server components / DB queries
  }

  useEffect(() => {
    if (courseContent) {
      try {
        const repaired = jsonrepair(courseContent);
        const parsed = JSON.parse(repaired);
        if (!Array.isArray(parsed.topics)) parsed.topics = [];
        setChapterContent(parsed);
      } catch (err) {
        console.error("Invalid JSON in courseContent:", err, courseContent);
        setChapterContent({ topics: [] });
      }
    }
  }, [courseContent]);

  useEffect(() => {
    if (currentChapter?.id && userId) {
      const completedChapters =
        courseInfo?.enrollCourse?.completedChapters ?? [];
      setCompleted(completedChapters.includes(currentChapter.id));
    }
  }, [currentChapter?.id, courseInfo, userId]);

  const markAsCompleted = async () => {
    setLoading(true);

    try {
      const completedChapters =
        courseInfo?.enrollCourse?.completeChapters ||
        new Array(courseInfo?.courses?.noOfChapters);
      completedChapters[selectedChapterIndex] = 1;

      const result = await axios.put("/api/enroll-course", {
        courseId: courseInfo?.courses?.cid,
        completeChapters: completedChapters,
      });

      console.log(result);
      refreshData();
      toast.success("Chapter Completed!");
    } catch (err) {
      console.error(err);
      toast.warning("Something went wrong or Server Site Error!");
    } finally {
      setLoading(false);
    }
  };

  const markAsIncompleted = async() => {
    setLoading(true);

    try {
      const completedChapters =
        courseInfo?.enrollCourse?.completeChapters || [];
      completedChapters[selectedChapterIndex] = 0;

      const result = await axios.put("/api/enroll-course", {
        courseId: courseInfo?.courses?.cid,
        completeChapters: completedChapters,
      });

      console.log(result);
      refreshData();
      toast.success("Chapter Marked In-Completed!");
    } catch (err) {
      console.error(err);
      toast.warning("Something went wrong or Server Site Error!");
    } finally {
      setLoading(false);
    }
  }

  return (
     <div className="p-4 sm:p-7 md:px-10">
      {currentChapter ? (
        <div>
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-2xl sm:text-3xl md:text-4xl font-sans font-semibold">
            <h2 className="text-center md:text-left">{currentChapter.chapterName}</h2>
            <div className="flex justify-center md:justify-end">
              {!completedChapters[selectedChapterIndex] ? (
                <Button disabled={loading} onClick={() => { markAsCompleted() }}>
                  { loading ? <Loader2Icon className="animate-spin" /> : <CheckCircle />}
                  <span className="ml-2 text-base sm:text-lg">Mark as Complete</span>
                </Button>
              ) : (
                <Button variant="outline" disabled={loading} onClick={() => { markAsIncompleted() }}>
                  {loading ? <Loader2Icon className="animate-spin" /> : <X />}
                  <span className="ml-2 text-base sm:text-lg">Mark Incomplete</span>
                </Button>
              )}
            </div>
          </div>

          {/* Videos */}
          <h2 className="text-2xl sm:text-3xl font-sans mb-4">Related Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b pb-6">
            {videoData?.slice(0, 2).map((video, index) => (
              <div key={index} className="my-2 md:my-4 w-full">
                <div className="relative w-full pb-[56.25%] h-0 overflow-hidden rounded-lg">
                  <YouTube
                    videoId={video?.videoId}
                    opts={{ playerVars: { autoplay: 0 } }}
                    className="absolute top-0 left-0 w-full h-full"
                  />
                </div>
                {video?.title && (
                  <p className="text-lg sm:text-xl py-4 font-sans text-center">
                    {video.title}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Chapter content */}
          <div className="mt-6">
            {chapterContent?.topics?.map((topic, i) => (
              <div key={i} className="my-6">
                <h3 className="font-semibold text-white text-xl sm:text-2xl bg-gradient-to-br from-blue-500 via-indigo-800 to-pink-700 p-5 text-center rounded-sm mb-2">
                  {topic?.topic ?? "Untitled Topic"}
                </h3>
                <div
                  className="text-base leading-8 sm:text-lg md:text-xl my-4 font-sans bg-gray-100 p-5 sm:p-8 rounded-sm overflow-x-auto"
                  dangerouslySetInnerHTML={{
                    __html: topic?.content || "<p>No content available</p>",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h2 className="text-xl text-gray-500">Select a chapter to view content</h2>
      )}
    </div>
  );
}

export default ChapterContent;
