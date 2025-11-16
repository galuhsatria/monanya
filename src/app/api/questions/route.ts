import { isBadQuestion } from "@/lib/db/ai/word-filter";
import { Questions } from "@/lib/db/queries";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { question, userId } = (await request.json()) as {
      question: string;
      userId: string;
    };

    if (!question || !userId) {
      return Response.json(
        { message: "Question and UserId are required" },
        { status: 400 },
      );
    }

    const flagged = await isBadQuestion(question);

    if (flagged) {
      return Response.json(
        {
          error:
            "Pertanyaan mengandung kata tidak pantas atau tidak diizinkan.",
        },
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
