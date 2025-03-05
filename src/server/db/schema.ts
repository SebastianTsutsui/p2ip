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
 * This is an example of how to use the multi-project schema feature of Drizzle ORM.
 * Use the same database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `p2ip_${name}`);

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

export const p2ip_movie_ratings = createTable(
  "movie_ratings",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    image: text("image").notNull(),
    rating: integer("rating").notNull(),
    emoji: varchar("emoji", { length: 1 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }
);
