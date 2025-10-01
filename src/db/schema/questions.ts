import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { user } from './auth';

export const questions = pgTable('questions', {
  id: uuid('id').defaultRandom().primaryKey(),
  question: text('question').notNull(),
  status: text('status').default('pending').notNull(),
  public: boolean('public').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
});
