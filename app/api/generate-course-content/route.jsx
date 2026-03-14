import { NextResponse } from "next/server";
import { ai } from "../generate-course-layout/route";
import axios from "axios";
import { db } from "@/config/db";
import { courseTable } from "@/config/schema";
import { eq } from "drizzle-orm";

const PROMPT = `
Based on the given chapter name and topics (ignore imagePrompt & duration), generate detailed content for each topic strictly as a JSON object. The JSON should follow the provided schema, with no additional text, markdown, or code block delimiters outside the object. The "content" field for each topic must contain detailed HTML content.

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

IMPORTANT CONTEXT:
- I will parse your response as a JSON string in JavaScript/TypeScript.
- The parsed JSON will be rendered in a React application as HTML.
- Any invalid JSON or unescaped characters may break parsing or cause client-side errors such as:
  SyntaxError: Bad control character in string literal in JSON at position 1661

Therefore, follow these rules VERY STRICTLY:

GENERAL RULES:
- Return one single JSON object, nothing else.
- Do NOT wrap the JSON in markdown or code fences.
  - No \`\`\`json
  - No \`\`\`
- Do NOT add any explanatory text before or after the JSON.
  - No "Here is your JSON:".
  - No comments.
- The first character of your output must be '{'.
- The last character of your output must be '}'.
- Follow the schema exactly.
- Ensure the JSON is complete and syntactically valid. Never stop midway.
- If content is long, still close all quotes, arrays, and objects properly.

JSON STRING SAFETY:
- All strings MUST be valid JSON strings.
- Escape characters correctly:
  - Use \\" for double quotes inside JSON strings if they are needed.
  - Use \\\\ for literal backslashes.
  - Use \\n for newlines, not raw line breaks.
  - Use \\t for tabs if needed.
- Do NOT emit unescaped control characters (like raw newlines or tabs) inside strings.
- Do NOT emit stray backslashes. Every backslash must start a valid escape sequence (\\\\, \\n, \\t, \\", etc.).

HTML IN "content":
- "content" MUST be valid HTML wrapped in block-level tags, such as:
  - <h1>, <h2> for headings
  - <p> for paragraphs
  - <ul> and <li> for lists
- Do NOT include any JavaScript code in "content".
  - No <script> tags.
  - No inline event handlers like onclick="...".
- Do NOT use backticks (\`) anywhere in the HTML.
- For visible text that needs quotes:
  - Do NOT use raw double quotes (") directly.
  - INSTEAD, ALWAYS use &quot; in the HTML text.
    - Example:
      BAD: He said, "Hello".
      GOOD: He said, &quot;Hello&quot;.
- In HTML attributes, prefer single quotes to avoid conflicts:
  - GOOD: <p class='lead'>Example</p>
  - AVOID: <p class="lead">Example</p>

CONTENT STYLE:
- "chapterName" should be a clear, human-readable title.
- Each "topic" should be a focused subtopic derived from the user input.
- "content" should:
  - Explain the topic in detail.
  - Use semantic HTML structure (<h1>/<h2>, <p>, <ul>/<li>, etc.).
  - Optionally include examples, but follow the quote rules above (use &quot; instead of " in visible text).

REMEMBER:
- Output ONLY the JSON object.
- No extra text, no markdown, no comments.

User Input:
`;

export async function POST(req) {
  let courseContent = null;
  try {
    const body = await req.json();
    const { course, courseId } = body;

    if (!course) {
      return NextResponse.json(
        { error: "Missing chapters in courseJson" },
        { status: 400 }
      );
    }

    const promises = course?.map(async (chapter) => {
      const config = { responseMimeType: "text/plain" };
      const model = "gemma-3n-e2b-it";
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
        const cleanResponse = rawResponse
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();
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

