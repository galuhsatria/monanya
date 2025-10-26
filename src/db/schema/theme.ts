import { pgTable, text } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const theme = pgTable("theme", {
  color: text("color").notNull(),
  font: text("font").notNull(),
  pattern: text("pattern").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});
