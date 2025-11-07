import { auth, getCurrentUser } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { newPassword } = (await request.json()) as { newPassword: string };

    await auth.api.setPassword({
      body: { newPassword },
      headers: await headers(),
    });

    return Response.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
