"use client"
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';
import React, { useContext } from 'react'

function ChapterContent({ courseInfo }) {
  const { selectedChapterIndex } = useContext(SelectedChapterIndexContext);

  const courseJson = courseInfo?.courses?.courseJson ?? [];
  const enrollCourse = courseInfo?.enrollCourse;

  const currentChapter = 
    typeof selectedChapterIndex === "number" && courseJson[selectedChapterIndex]
      ? courseJson[selectedChapterIndex]
      : null;

  return (
    <div className="p-10">
      {currentChapter ? (
        <h2 className="text-3xl font-semibold">
          {currentChapter.chapterName}
        </h2>
      ) : (
        <h2 className="text-xl text-gray-500">
          Select a chapter to view content
        </h2>
      )}
    </div>
  )
}

export default ChapterContent;
