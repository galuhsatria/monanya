import { db } from '@/db/drizzle';
import { user, questions } from '@/db/schema';
import { eq, InferSelectModel } from 'drizzle-orm';

export type NewQuestion = InferSelectModel<typeof questions>;

export const Questions = {
  async getAllQuestionByUserId(userId: string) {
    return await db.select({ id: questions.id, question: questions.question, status: questions.status, createdAt: questions.createdAt }).from(questions).where(eq(questions.userId, userId));
  },

  async getAllQuestionDone(userId: string) {
    return await db.select({ id: questions.id, question: questions.question, status: questions.status, createdAt: questions.createdAt }).from(questions).where(eq(questions.userId, userId));
  },

  async create(question: NewQuestion) {
    const result = await db.insert(questions).values(question).returning();
    return result[0];
  },

  async delete(questionId: string) {
    const question = await db.select().from(questions).where(eq(questions.id, questionId)).limit(1);
    if (question.length === 0) {
      throw new Error('Question not found');
    }

    await db.delete(questions).where(eq(questions.id, questionId));
  },
};

export const User = {
  async getUserById(userId: string) {
    return await db.select({ name: user.name, image: user.image }).from(user).where(eq(user.id, userId));
  },
};
