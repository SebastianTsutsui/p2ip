import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  timestamp,
  varchar,
  text,
} from "drizzle-orm/pg-core";

/**
 * Multi-project schema using Drizzle ORM.
 * Use the same database instance for multiple tables.
 */
export const createTable = pgTableCreator((name) => `p2ip_${name}`);

// Feedback Table (Remains unchanged)
export const p2ip_feedback = createTable(
  "feedback",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (example) => ({
    contentIndex: index("content_idx").on(example.content),
  })
);

// Movies Table
export const p2ip_movies = createTable(
  "movies",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }).notNull(), // Movie Name
    url: varchar("url", { length: 1024 }).notNull(), // Uploaded File URL
    rating: integer("rating").notNull(), // Rating (1-10)
    emoji: varchar("emoji", { length: 1 }).notNull(), // Single Emoji
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  }
);
