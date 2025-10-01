import { db } from '@/db/drizzle';
import { user, questions } from '@/db/schema';
import { and, eq, InferSelectModel } from 'drizzle-orm';

export type Question = typeof questions.$inferSelect;
export type NewQuestion = typeof questions.$inferInsert;

export const Questions = {
  async getAllQuestionByUserId(userId: string) {
    return await db.select({ id: questions.id, question: questions.question, status: questions.status, createdAt: questions.createdAt }).from(questions).where(eq(questions.userId, userId));
  },

  async getAllQuestionByStatus(userId: string, status: 'done' | 'pending') {
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

  async create(question: Omit<NewQuestion, 'userId'>, userId: string) {
    const [existingUser] = await db.select({ id: user.id }).from(user).where(eq(user.id, userId)).limit(1);

    if (!existingUser) {
      throw new Error('User not found');
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
    const question = await db.select().from(questions).where(eq(questions.id, questionId)).limit(1);
    if (question.length === 0) {
      throw new Error('Question not found');
    }

    await db.delete(questions).where(eq(questions.id, questionId));
  },

  async updateStatus(questionId: string, status: 'done' | 'pending') {
    const [existingQuestion] = await db.select().from(questions).where(eq(questions.id, questionId)).limit(1);

    if (!existingQuestion) {
      throw new Error('Question not found');
    }

    const result = await db.update(questions).set({ status }).where(eq(questions.id, questionId)).returning();

    return result[0];
  },
};

export const User = {
  async getUserById(userId: string) {
    return await db.select({ id: user.id, name: user.name, image: user.image }).from(user).where(eq(user.id, userId));
  },

  async getUserByUsername(username: string) {
    const result = await db.select({ id: user.id, name: user.name, image: user.image }).from(user).where(eq(user.username, username));
    return result[0];
  },
};
