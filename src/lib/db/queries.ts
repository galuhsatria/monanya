import { db } from "@/db/drizzle";
import { account, questions, report, user } from "@/db/schema";
import { and, eq, inArray } from "drizzle-orm";

export type Question = typeof questions.$inferSelect;
export type NewQuestion = typeof questions.$inferInsert;

export const Questions = {
  async getAllQuestionByUserId(userId: string) {
    return await db
      .select({
        id: questions.id,
        question: questions.question,
        status: questions.status,
        createdAt: questions.createdAt,
      })
      .from(questions)
      .where(eq(questions.userId, userId));
  },

  async getAllQuestionByStatus(userId: string, status: "done" | "pending") {
    return await db
      .select({
        id: questions.id,
        question: questions.question,
        status: questions.status,
        createdAt: questions.createdAt,
      })
      .from(questions)
      .where(and(eq(questions.userId, userId), eq(questions.status, status)));
  },

  async create(question: Omit<NewQuestion, "userId">, userId: string) {
    const [existingUser] = await db
      .select({ id: user.id })
      .from(user)
      .where(eq(user.id, userId))
      .limit(1);

    if (!existingUser) {
      throw new Error("User not found");
    }

    const result = await db
      .insert(questions)
      .values({
        ...question,
        userId: existingUser.id,
      })
      .returning();

    return result[0];
  },

  async delete(questionId: string) {
    const question = await db
      .select()
      .from(questions)
      .where(eq(questions.id, questionId))
      .limit(1);
    if (question.length === 0) {
      throw new Error("Question not found");
    }

    await db.delete(questions).where(eq(questions.id, questionId));
  },

  async deleteMany(ids: string | string[]) {
    const idArray = Array.isArray(ids) ? ids : [ids];

    const existing = await db
      .select()
      .from(questions)
      .where(inArray(questions.id, idArray));

    if (existing.length === 0) {
      throw new Error("Question(s) not found");
    }

    await db.delete(questions).where(inArray(questions.id, idArray));
  },

  async updateStatus(questionId: string, status: "done" | "pending") {
    const [existingQuestion] = await db
      .select()
      .from(questions)
      .where(eq(questions.id, questionId))
      .limit(1);

    if (!existingQuestion) {
      throw new Error("Question not found");
    }

    const result = await db
      .update(questions)
      .set({ status })
      .where(eq(questions.id, questionId))
      .returning();

    return result[0];
  },
};

export const User = {
  async getUserById(userId: string) {
    return await db
      .select({ id: user.id, name: user.name, image: user.image })
      .from(user)
      .where(eq(user.id, userId));
  },

  async checkIsHasPassword(userId: string) {
    const result = await db
      .select({ password: account.password })
      .from(account)
      .where(eq(account.userId, userId));

    return result[0];
  },

  async getUserByUsername(username: string) {
    const result = await db
      .select({
        id: user.id,
        name: user.name,
        image: user.image,
        email: user.email,
      })
      .from(user)
      .where(eq(user.username, username));
    return result[0];
  },

  async reportUser(name: string, email: string, reason: string) {
    const result = await db
      .insert(report)
      .values({ name, email, reason })
      .returning();
    return result[0];
  },
};
