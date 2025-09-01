"use client";
import { SelectedChapterIndexContext } from "@/context/SelectedChapterIndexContext";
import { jsonrepair } from "jsonrepair";
import React, { useContext, useState, useEffect } from "react";
import YouTube from "react-youtube";

function ChapterContent({ courseInfo }) {
  const { selectedChapterIndex } = useContext(SelectedChapterIndexContext);
  const [chapterContent, setChapterContent] = useState(null);

  const courseJson = courseInfo?.courses?.courseJson ?? [];
  const courseContent =
    courseInfo?.courses?.courseContent[selectedChapterIndex]?.contentResponse; // JSON string
  const videoData =
    courseInfo?.courses?.courseContent[selectedChapterIndex]?.youtubeVideos;

  useEffect(() => {
    if (courseContent) {
      try {
        // Fix common Gemini JSON issues
        const cleaned = courseContent
          .replace(/,\s*}/g, "}") // remove trailing commas in objects
          .replace(/,\s*]/g, "]"); // remove trailing commas in arrays

        const repaired = jsonrepair(courseContent);
        const parsed = JSON.parse(repaired);

        // Extra safety: ensure parsed.topics is always an array
        if (!Array.isArray(parsed.topics)) {
          parsed.topics = [];
        }

        setChapterContent(parsed);
      } catch (err) {
        console.error("Invalid JSON in courseContent:", err, courseContent);
        setChapterContent({ topics: [] }); // prevent render crash
      }
    }
  }, [courseContent]);

  const currentChapter =
    typeof selectedChapterIndex === "number" && courseJson[selectedChapterIndex]
      ? courseJson[selectedChapterIndex]
      : null;

  return (
    <div className="p-4 sm:p-7 md:px-10 overflow-x-hidden">
      {currentChapter ? (
        <div>
          <h2 className="mb-6 text-2xl sm:text-3xl md:text-4xl font-sans text-center font-bold">
            {currentChapter.chapterName}
          </h2>

          {/* Videos */}
          <h2 className="text-2xl sm:text-3xl font-sans mb-4">
            Related Videos
          </h2>
          <div className="grid grid-cols-1 border-b-2 border-b-gray md:grid-cols-2 gap-6">
            {videoData?.slice(0, 2).map((video, index) => (
              <div
                key={index}
                className="my-4 pb-5 justify-center m-auto w-full"
              >
                {/* Responsive video container */}
                <div className="relative w-full pb-[56.25%] h-0 overflow-hidden rounded-lg">
                  <YouTube
                    videoId={video?.videoId}
                    opts={{
                      playerVars: {
                        autoplay: 0,
                      },
                    }}
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
          <div>
            {chapterContent?.topics?.map((topic, i) => (
              <div key={i} className="my-6">
                <h3 className="font-semibold text-white text-xl sm:text-2xl bg-gradient-to-br from-blue-500 via-indigo-800 to-pink-700 p-5 text-center rounded-sm mb-2">
                  {topic?.topic ?? "Untitled Topic"}
                </h3>
                <div
                  className="text-base sm:text-lg md:text-xl font-sans bg-gray-50 p-5 sm:p-7 rounded-sm overflow-x-auto"
                  dangerouslySetInnerHTML={{
                    __html: topic?.content || "<p>No content available</p>",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h2 className="text-xl text-gray-500">
          Select a chapter to view content
        </h2>
      )}
    </div>
  );
}

export default ChapterContent;
