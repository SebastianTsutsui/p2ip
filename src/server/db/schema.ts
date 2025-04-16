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

export const p2ip_uploads = createTable(
  "uploads",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    imageUrl: varchar("image_url", { length: 255 }).notNull(), // URL to the uploaded image
    comment: text("comment").notNull(), // Short comment
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }
);
