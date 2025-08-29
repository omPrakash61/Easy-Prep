import { db } from "@/config/db";
import { courseTable, enrolCourseTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { eq, and, desc } from "drizzle-orm";

export async function POST(req) {
  const { courseId } = await req.json();
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const enrollCourses = await db
    .select()
    .from(enrolCourseTable)
    .where(
      and(
        eq(enrolCourseTable.userEmail, user?.primaryEmailAddress?.emailAddress),
        eq(enrolCourseTable.cid, courseId)
      )
    );

  if (enrollCourses?.length == 0) {
    const result = await db.insert(enrolCourseTable).values({
      cid: courseId,
      userEmail: user.primaryEmailAddress.emailAddress,
    });

    return NextResponse.json(result);
  }
  return NextResponse.json({ response: "Already Enrolled" });
}

export async function GET(req) {
  const user = await currentUser();

  const { searchParams } = new URL(req.url);
  const courseId = searchParams?.get("courseId");

  console.log("courseId : " + courseId);

  if (courseId) {
    const result = await db
      .select()
      .from(courseTable)
      .innerJoin(enrolCourseTable, eq(courseTable.cid, enrolCourseTable.cid))
      .where(
        and(
          eq(
            enrolCourseTable.userEmail,
            user?.primaryEmailAddress.emailAddress
          ),
          eq(enrolCourseTable.cid, courseId)
        )
      )
      .orderBy(desc(enrolCourseTable.id));

    return NextResponse.json(result[0] ?? {});
  }

  const result = await db
    .select()
    .from(courseTable)
    .innerJoin(enrolCourseTable, eq(courseTable.cid, enrolCourseTable.cid))
    .where(
      eq(enrolCourseTable.userEmail, user?.primaryEmailAddress.emailAddress)
    )
    .orderBy(desc(enrolCourseTable.id));

  return NextResponse.json(result);
}
