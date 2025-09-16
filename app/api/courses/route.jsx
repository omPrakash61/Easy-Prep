import { db } from "@/config/db";
import { courseTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { isAllCourse } = await request.json();
    console.log("request : ", isAllCourse);

    if (isAllCourse) {
      const result = await db
        .select()
        .from(courseTable)
        .orderBy(desc(courseTable.id));
      return NextResponse.json(result);
    } else {
      const result = await db
        .select()
        .from(courseTable)
        .where(eq(courseTable.userEmail, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(courseTable.id));
      return NextResponse.json(result);
    }
  } catch (error) {
    console.error("Failed to handle POST request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Keep the GET function if you need it for fetching single courses
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get("courseId");
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (courseId) {
    const result = await db
      .select()
      .from(courseTable)
      .where(eq(courseTable.cid, courseId));
    return NextResponse.json(result[0]);
  } else {
    // This case might be better handled by a POST request with specific filters
    // For now, it will return all courses, which may not be the intended behavior.
    const result = await db.select().from(courseTable).orderBy(desc(courseTable.id));
    return NextResponse.json(result);
  }
}