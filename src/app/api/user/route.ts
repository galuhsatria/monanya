import { db } from "@/db/drizzle";
import { user as userTable } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || !currentUser.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, username } = (await request.json()) as {
      name: string;
      username: string;
    };

    if (!name || !username) {
      return Response.json(
        { success: false, message: "Name and username are required" },
        { status: 400 },
      );
    }

    const existingUser = await db
      .select()
      .from(userTable)
      .where(eq(userTable.username, username))
      .limit(1);

    if (existingUser.length > 0 && existingUser[0].id !== currentUser.id) {
      return Response.json(
        { success: false, message: "Username tidak tersedia" },
        { status: 400 },
      );
    }

    await db
      .update(userTable)
      .set({
        name,
        username,
      })
      .where(eq(userTable.id, currentUser.id));

    return Response.json(
      { success: true, message: "Profile updated successfully" },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
