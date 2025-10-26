import { getCurrentUser } from "@/lib/auth";
import { Questions } from "@/lib/db/queries";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ status: string }> },
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { status } = await params;

    if (!status) {
      return Response.json({ message: "Status is required" }, { status: 400 });
    }

    const questionData = await Questions.getAllQuestionByStatus(
      user.id,
      status as "done" | "pending",
    );

    return Response.json(
      { success: true, questions: questionData },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
