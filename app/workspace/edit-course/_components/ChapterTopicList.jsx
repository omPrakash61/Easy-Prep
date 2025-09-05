import React, { useEffect } from "react";
import { BookOpenText, ArrowRight } from "lucide-react";

function ChapterTopicList({ course }) {
  if (!course) return <div>Loading...</div>;

  const chapters = course?.courseJson;

  useEffect(() => {
    console.log(course);
  }, [chapters]);

  return (
    <div className="bg-gray-100 my-8 p-8 sm:p-12 md:p-16 rounded-xl shadow-xl max-w-7xl mx-auto font-sans">
      <h1 className="text-3xl sm:text-4xl font-semibold text-center text-gray-900 mb-12">
        Chapters & Topics
      </h1>

      <div className="relative">
        <div
          className="hidden md:block absolute left-1/2 -translate-x-1/2 w-1 h-full"
          style={{
            background: "linear-gradient(to bottom, #3b82ff, #8b5cff)",
          }}
        ></div>

        <div className="flex flex-col gap-12">
          {chapters?.map((chapter, index) => (
            <div
              key={index}
              className={`relative flex items-center w-full  ${
                index % 2 === 0 ? "md:justify-start" : "md:justify-end"
              }`}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:translate-x-0 md:translate-y-0 z-10">
                <div className={`p-3 z-0 rounded-full shadow-lg bg-purple-600`}>
                  <BookOpenText className="w-6 h-6 text-white" />
                </div>
              </div>

              <div
                className={`w-full md:w-[45%] p-6 bg-purple-50 rounded-xl border-1 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.007] ${
                  index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                }`}
              >
                <div
                  className={`absolute hidden md:block w-0 h-0 border-t-8 border-b-8 border-t-transparent border-b-transparent ${
                    index % 2 === 0
                      ? "right-[45%] border-l-8 border-l-white"
                      : "left-[45%] border-r-8 border-r-white"
                  }`}
                ></div>
                <div className="flex flex-col ">
                  <h3 className="text-xl sm:text-xl font-bold mb-3 text-gray-900">
                    {index+1 + ". " + chapter.chapterName}
                  </h3>
                  {chapter.topics.map((elem, idx) => {
                    return (
                      <p key={idx} className="text-gray-600 mx-2 mb-3">
                        {idx+1+ ". " + elem}
                      </p>
                    );
                  })}
                  <a
                    href="#"
                    className="flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-800 transition-colors"
                  >
                    View Chapter
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChapterTopicList;
