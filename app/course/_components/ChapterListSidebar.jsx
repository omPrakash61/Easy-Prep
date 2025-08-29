import React, { useContext } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SelectedChapterIndexContext } from "@/context/SelectedChapterIndexContext";

function ChapterListSidebar({ courseInfo }) {
  const course = courseInfo?.courses;
  const enrollCourse = courseInfo?.enrollCourse;
  const courseJson = courseInfo?.courses?.courseJson;
  const { selectedChapterIndex, setSelectedChapterIndex } = useContext(SelectedChapterIndexContext);
  let res;
  if (courseJson) res = courseJson[0].chapterName;
  console.log(res);

  return (
    <div className="w-full sm:w-80 bg-secondary sm:min-h-screen p-5 shadow-md">
      <h2 className="text-2xl font-semibold mb-5 text-primary font-sans border-b-black border-b px-4 pb-5 ">
        📚 Chapters
      </h2>

      <Accordion type="single" collapsible className="space-y-3">
        {courseJson?.map((chapter, index) => (
          <AccordionItem
            value={`item-${index}`}
            key={index}
            onClick={() => setSelectedChapterIndex(index)}
            className="border rounded-lg overflow-hidden bg-white shadow-sm transition-colors data-[state=open]:border-purple-500 data-[state=open]:border-2"
          >
            <AccordionTrigger className="text-lg font-semibold hover:no-underline px-4 py-3 text-primary hover:bg-primary/12 transition-colors">
              {index + 1}. {chapter?.chapterName} <span className="text-sm">({chapter?.duration})</span>
            </AccordionTrigger>

            <AccordionContent className="px-4 pb-3">
              {chapter?.topics?.map((topic, idx) => (
                <h4
                  key={idx}
                  className="py-2 px-3 border-2 border-transparent hover:border-purple-400 
                 text-black font-semibold hover:text-primary hover:bg-primary/5 
                 rounded-md cursor-pointer transition-colors"
                >
                  {topic}
                </h4>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default ChapterListSidebar;
