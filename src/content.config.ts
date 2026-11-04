import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Categories are authored as JSON so a category exists independently of the
 * articles that reference it. That lets an empty category still render its own
 * page (with an empty state) instead of 404-ing until someone writes into it.
 */
const categories = defineCollection({
  loader: glob({ base: "./src/content/categories", pattern: "**/*.json" }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    /** Short mono label used in chips, e.g. "SEC". Defaults to the id. */
    abbr: z.string().optional(),
    /** Accent token from global.css: brand | tag-a | tag-b | tag-c */
    accent: z.enum(["brand", "tag-a", "tag-b", "tag-c"]).default("brand"),
    /** Sort weight for listings; lower shows first. */
    order: z.number().default(100),
  }),
});

const articles = defineCollection({
  loader: glob({ base: "./src/content/articles", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** ISO date string — drives ordering and the archive display. */
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: reference("categories"),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles, categories };
