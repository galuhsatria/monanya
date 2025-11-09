import { User } from "@/lib/db/queries";
import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { name, email, reason } = (await request.json()) as {
      name: string;
      email: string;
      reason: string;
    };

    await User.reportUser(name, email, reason);

    return NextResponse.json({
      message: `Success report user ${name}`,
    });
  } catch (error) {
    console.error(request.url, error);
    return NextResponse.json(
      { message: "Error while report user" },
      { status: 500 },
    );
  }
}
