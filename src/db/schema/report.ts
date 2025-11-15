import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { randomUUID } from "node:crypto";

export const report = pgTable("report", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  name: text("name").notNull(),
  email: text("email").notNull(),
  reason: text("reason").notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});
