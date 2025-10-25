import { Questions } from "@/lib/db/queries";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { question, userId } = await request.json();

    if (!question || !userId) {
      return Response.json(
        { message: "Question and UserId are required" },
        { status: 400 },
      );
    }

    const questionData = await Questions.create({ question }, userId);

    return Response.json(
      { success: true, question: questionData },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
