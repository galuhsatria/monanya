import { getCurrentUser } from "@/lib/auth";
import { Questions } from "@/lib/db/queries";

export async function DELETE(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { ids } = await request.json();

    if (!ids || (Array.isArray(ids) && ids.length === 0)) {
      return Response.json(
        { error: "No question ID provided" },
        { status: 400 },
      );
    }

    await Questions.deleteMany(ids);

    return Response.json(
      { success: true, message: "Question(s) deleted successfully" },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
