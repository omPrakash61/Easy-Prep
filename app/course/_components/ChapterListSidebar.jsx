import React, { useContext } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SelectedChapterIndexContext } from "@/context/SelectedChapterIndexContext";
import { Check } from "lucide-react";

function ChapterListSidebar({ courseInfo }) {
  const completedChapters = courseInfo?.enrollCourse?.completeChapters;
  const courseJson = courseInfo?.courses?.courseJson;
  const { selectedChapterIndex, setSelectedChapterIndex } = useContext(
    SelectedChapterIndexContext
  );
  let res;
  if (courseJson) res = courseJson[0].chapterName;
  console.log(courseInfo);

  return (
     <aside className="h-full flex flex-col">
      {/* Fixed header inside the sidebar */}
      <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl sm:text-2xl font-bold text-primary flex items-center gap-2">
          📚 <span>Chapters</span>
        </h2>
      </div>

      {/* Scrollable area (independent) */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-4 sidebar-scroll-left">
        <Accordion type="single" collapsible className="space-y-4">
          {courseJson && courseJson.map((chapter, index) => (
            <AccordionItem
              value={`item-${index}`}
              key={index}
              onClick={() => setSelectedChapterIndex(index)}
              className={`rounded-xl overflow-hidden transition-all  ${
                completedChapters[index] === 1
                  ? "bg-green-50 border-l-4 border-l-green-500  data-[state=open]:border-l-green-400"
                  : "bg-purple-50 border-l-4 border-l-purple-500  data-[state=open]:border-l-purple-400"
              }`}
            >
              <AccordionTrigger className="text-base sm:text-lg font-semibold hover:no-underline px-4 py-3 text-gray-800 dark:text-gray-200 flex justify-between items-center">
                <span>
                  {index + 1}. {chapter?.chapterName}
                </span>
                <span className="text-xs sm:text-sm text-gray-500">
                  {completedChapters[index] === 1 ? (
                    <Check className="text-green-500" />
                  ) : (
                    chapter?.duration
                  )}
                </span>
              </AccordionTrigger>

              <AccordionContent className="px-4 pb-3 space-y-2">
                {chapter?.topics?.map((topic, idx) => (
                  <h4
                    key={idx}
                    className={`py-2 px-3 border border-transparent text-sm sm:text-base text-gray-700 font-medium rounded-md cursor-pointer transition-all ${
                      completedChapters[index] === 1
                        ? "hover:bg-green-100 hover:border-green-400"
                        : "hover:bg-purple-100 hover:border-purple-400"
                    }`}
                  >
                    {topic}
                  </h4>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </aside>
  );
}

export default ChapterListSidebar;
