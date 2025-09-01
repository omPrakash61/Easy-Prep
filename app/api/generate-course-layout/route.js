import { db } from "@/config/db";
import { courseTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PROMPT = `
You are an AI learning course generator.

Using the user input below, generate a complete course strictly in **valid JSON format** (no extra text, no markdown). Follow the structure and constraints described, change enhance and make attractive name and description of the given values accordingly as well.

### Output Schema:
{
  "course": {
    "name": "string",
    "description": "string",
    "category": "string",
    "level": "string",
    "includeVideo": boolean,
    "noOfChapters": number,
    "bannerImageprompt": "string",
    "courseJson": [
      {
        "chapterName": "string",
        "duration": "string", // e.g. "15 min"
        "topics": ["string"],
      }
    ]
  }
}

### Notes:
- Each course must include an bannerImageprompt that visually represents that course and make sure it reflects the name of course and related text/chapters.
- The image prompt should describe a modern, 2D flat-style digital illustration:
  - Include UI/UX elements such as mockup screens, icons, sticky notes, creative workspace tools
  - Should feel creative, educational, and tech-savvy
  - Use a vibrant palette (blues, purples, oranges) and a clean, professional look
  - Must visually reflect the chapter’s content/topic

Output only valid JSON that matches the schema above. No markdown, no explanations, no comments.

### User Input :

`;

export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req) {
  const user = await currentUser();
  const body = await req.json();
  const { courseId, ...formData } = body;

  if (!formData) {
    console.error("formData is undefined or null");
    return NextResponse.JSON({ message: "form Data is missing" });
  }

  const config = {
    responseMimeType: "text/plain",
  };
  const model = "gemma-3n-e2b-it";
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: PROMPT + JSON.stringify(formData),
        },
      ],
    },
  ];

  const response = await ai.models.generateContent({
    model,
    config,
    contents,
  });

  let jsonResponse;
  try {
    const rawResponse = response?.candidates[0].content.parts[0].text;
    console.log("rawResponse",rawResponse);
    const rawJson = rawResponse.replace("```json", "").replace("```", "");
    console.log("rawJson",rawJson);
    jsonResponse = JSON.parse(rawJson);
    console.log("jsonResponse",jsonResponse);
    console.log("jsonResponse.course",jsonResponse.course);

  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return NextResponse.json(
      { error: "Invalid response from Gemini" },
      { status: 500 }
    );
  }

  // before inserting the data into db i will generate the banner image from Model and send the generated image to cloudinary in return i will get URL which i will save into my db

  const uploadImageToCloudinary = async (buffer, mimeType) => {
    const base64 = buffer.toString("base64");
    const dataUri = `data:${mimeType};base64,${base64}`;

    try {
      const result = await cloudinary.uploader.upload(dataUri, {
        resource_type: "image",
        folder: "easy-prep",
      });

      return result.secure_url;
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      throw error;
    }
  };

  let imageUploadedUrl = "";

  try {
    const configImage = {
      responseModalities: ["IMAGE", "TEXT"],
    };
    const modelImage = "gemini-2.0-flash-preview-image-generation";
    const contentsImage = [
      {
        role: "user",
        parts: [
          {
            text:
              "Completly avoid generating text response and generate image having " +
              jsonResponse.course.bannerImageprompt,
          },
        ],
      },
    ];
    const response = await ai.models.generateContentStream({
      model: modelImage,
      config: configImage,
      contents: contentsImage,
    });

    for await (const chunk of response) {
      const parts = chunk?.candidates?.[0]?.content?.parts;
      const inlineData = parts?.[0]?.inlineData;

      if (inlineData?.data) {
        const buffer = Buffer.from(inlineData.data, "base64");
        const mimeType = inlineData.mimeType || "image/png";

        imageUploadedUrl = await uploadImageToCloudinary(buffer, mimeType);

        if (!imageUploadedUrl) {
          throw new Error("No image data received from Gemini.");
        }

        console.log("✅ Uploaded Image URL:", imageUploadedUrl);
        break; 
      }
    }
  } catch (error) {
    console.log(error);
  }

  // save to db

  const dbResult = await db.insert(courseTable).values({
    cid: courseId,
    name: jsonResponse.course.name,
    description: jsonResponse.course.description,
    noOfChapters: jsonResponse.course.noOfChapters,
    includeVideo: jsonResponse.course.includeVideo,
    level: jsonResponse.course.level,
    category: jsonResponse.course.category,
    courseJson: jsonResponse.course.courseJson,
    userEmail: user.emailAddresses[0].emailAddress,
    bannerImageUrl: imageUploadedUrl,
  });

  console.log(dbResult);

  return NextResponse.json({ status: dbResult, courseId: courseId });
}
