import { db } from "@/db/drizzle";
import { getCurrentUser } from "@/lib/auth";
import { account } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const accountData = await db
      .select({ password: account.password })
      .from(account)
      .where(eq(account.userId, user.id))
      .limit(1);

    const hasPassword =
      accountData.length > 0 &&
      accountData[0].password !== null &&
      accountData[0].password !== "";

    return Response.json(
      {
        success: true,
        hasPassword,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Error checking password status:", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
