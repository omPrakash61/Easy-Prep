import { NextResponse } from "next/server";
import { ai } from "../generate-course-layout/route";
import axios from "axios";
import { db } from "@/config/db";
import { courseTable } from "@/config/schema";
import { eq } from "drizzle-orm";

const PROMPT = `
Based on the given chapter name and topics (ignore imagePrompt & duration), generate detailed content for each topic strictly as a JSON object. The JSON should follow the provided schema, with no additional text, markdown, or code block delimiters outside the object. The 'content' field for each topic should contain detailed HTML content.

Schema:
{
"chapterName": "<chapter_name>",
"topics": [
{
"topic": "<topic_name>",
"content": "<HTML content>"
},
...
]
}

You are an API that returns only valid JSON.

I have to parse the response which you generate into valid json formate and eventually render on react(HTML page) so do not include any javascript special character which might break the consistency make sure that the response which you will generate do not break my code while parsing or client side error such as : 
SyntaxError: Bad control character in string literal in JSON at position 1661 (line 10 column 445)
    at JSON.parse (<anonymous>)
    at ChapterContent.useEffect

rules : 
- Return one single JSON object, nothing else.
- Follow the schema exactly.
- Ensure the JSON is complete and syntactically valid. Never stop midway.
- If content is long, still close all quotes, arrays, and objects properly.

User Input:

`;

export async function POST(req) {
  let courseContent = null;
  try {
    const body = await req.json();
    console.log(
      "Incoming request body first element topics:",
      body?.course[0]?.topics[0]
    );
    const { course, courseId } = body;
    console.log(course); // it's an Array

    if (!course) {
      return NextResponse.json(
        { error: "Missing chapters in courseJson" },
        { status: 400 }
      );
    }

    const promises = course?.map(async (chapter) => {
      const config = { responseMimeType: "text/plain" };
      const model = "gemini-1.5-flash";
      const contents = [
        {
          role: "user",
          parts: [{ text: PROMPT + JSON.stringify(chapter) }],
        },
      ];

      const response = await ai.models.generateContent({
        model,
        config,
        contents,
      });

      try {
        const rawResponse = response?.candidates[0].content.parts[0].text;
        console.log("rawResponse : ", rawResponse);
        const cleanResponse = rawResponse
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

        console.log("Clean Response : ", cleanResponse);
        const youtubeData = await GetYoutubeVideo(chapter.chapterName);
        return {
          contentResponse: cleanResponse,
          youtubeVideos: youtubeData,
        };
      } catch (error) {
        console.error("Failed to parse JSON:", error);
        return null;
      }
    });
    courseContent = await Promise.all(promises);

    const dbResp = await db
      .update(courseTable)
      .set({
        courseContent,
      })
      .where(eq(courseTable.cid, courseId));
    console.log("Course Content saved in db succesfully :", dbResp);
  } catch (error) {
    console.error("Error parsing request:", error);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  return NextResponse.json(courseContent);
}

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";
const GetYoutubeVideo = async (topic) => {
  const params = {
    part: "snippet",
    q: topic,
    maxResults: 4,
    type: "video",
    key: process.env.YOUTUBE_API_KEY,
  };

  try {
    const response = await axios.get(YOUTUBE_BASE_URL, { params });
    const youtubeVideoListRes = response.data.items;
    return youtubeVideoListRes.map((item) => ({
      videoId: item?.id?.videoId,
      title: item?.snippet?.title,
    }));
  } catch (error) {
    console.error("Failed to fetch YouTube videos:", error);
    return [];
  }
};
