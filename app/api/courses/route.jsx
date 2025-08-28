import { db } from "@/config/db";
import { courseTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get("courseId");
  const user = await currentUser();

  if (!courseId) {
    const result = await db.select().from(courseTable)
      .where(eq(courseTable.userEmail, user.primaryEmailAddress?.emailAddress))
      .orderBy(desc(courseTable.id));

      console.log(result);

      return NextResponse.json(result);
  }else{
    const result = await db.select().from(courseTable)
      .where(eq(courseTable.cid, courseId));

      console.log(result);
      return NextResponse.json(result[0]);
  }

}
