import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, name } = await req.json();

    if (!email || !name) {
      return NextResponse.json({ error: "Missing email or name" }, { status: 400 });
    }

    const existingUsers = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (existingUsers.length === 0) {
      await db.insert(usersTable).values({
        fullName: name, 
        email,
      });

      const createdUser = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email));

      console.log("New user created:", createdUser[0]);
      return NextResponse.json(createdUser[0], { status: 201 });
    }

    return NextResponse.json(existingUsers[0], { status: 200 });
  } catch (error) {
    console.error("User creation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
