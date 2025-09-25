import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { user } from './auth';

export const questions = pgTable('questions', {
  id: text('id').primaryKey(),
  question: text('question').notNull(),
  status: text('status').notNull(),
  public: boolean('public')
    .$defaultFn(() => false)
    .notNull(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
});
