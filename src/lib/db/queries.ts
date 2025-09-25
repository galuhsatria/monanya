import { db } from '@/db/drizzle';
import { questions } from '@/db/schema/questions';
import { eq } from 'drizzle-orm';

export const Questions = {
  async getAllQuestionByUserId(userId: string) {
    return await db.select({ id: questions.id, question: questions.question, status: questions.status, createdAt: questions.createdAt }).from(questions).where(eq(questions.userId, userId));
  },

  async getAllQuestionDone(userId: string) {
    return await db.select({ id: questions.id, question: questions.question, status: questions.status, createdAt: questions.createdAt }).from(questions).where(eq(questions.userId, userId));
  },
};
